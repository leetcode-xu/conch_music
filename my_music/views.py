from django.shortcuts import render
from django.http import  HttpResponse
# Create your views here.
from discover.models import *

def my_music(request):
    # music_list
    user_id = request.GET.get('user', False)
    user = None
    if user_id:
        user = User.objects.filter(user_id=user_id)[0]
    elif request.session.get('user_id',False):
        user_id = request.session['user_id']
        user = User.objects.filter(user_id=user_id)[0]
    else:
        return render(request, 'my_music/my_music.html', {'user': request.session})
    sheet_id = request.GET.get('sheet',None)
    if not sheet_id:
        favourite = MusicFavourite.objects.filter(user_id=user_id)
        music_list = []
        for f in range(len(favourite)):
            music_list.append(MusicList.objects.get(list_id=favourite[f].Fmusic_id))
        return render(request, 'my_music/my_music.html', {'user': user,
                                                          'sheet_name': '我喜欢' ,
                                                          'music_list': music_list})
    else:
        music_id_list = MusicSheet.objects.filter(sheet_id=sheet_id)
        music_list = []
        if music_id_list:
            for music_id in music_id_list:
                music_list.append(MusicList.objects.filter(music_id=music_id))
        sheet_name = UserSheet.objects.filter(sheet_id=sheet_id)[0].sheet_name
        return render(request, 'my_music/my_music.html', {'user': user,
                                                          'sheet_name': sheet_name ,
                                                          'music_list': music_list})


def attention(request, singer_id=None):
    user_id = request.GET.get('user', False)
    if not user_id:
        user_id = request.session.get('user_id', None)
    user = User.objects.filter(user_id=user_id)[0]
    singer_id_list = Friend.objects.filter(user_id = user_id, follow_id__lt=1000000)
    singer_list = []
    for singer_id in singer_id_list:
        singer_list.append(SingerInfo.objects.filter(singer_id=singer_id.follow_id)[0])
    return render(request, 'my_music/focus.html', {'singer_list': singer_list, 'user':user})


def focus_user(request):
    user_id = request.GET.get('user', False)
    if not user_id:
        user_id = request.session.get('user_id', None)
    user = User.objects.filter(user_id=user_id)[0]
    user_id_list = Friend.objects.filter(user_id = user_id, follow_id__gt=1000000)
    user_list = []
    for use_id in user_id_list:
        user_list.append(User.objects.filter(user_id = use_id.follow_id)[0])
    return render(request, 'my_music/focus_user.html', {'user_list':user_list,'user':user})


def fans(request):
    user_id = request.GET.get('user', False)
    if not user_id:
        user_id = request.session.get('user_id', None)
    user = User.objects.filter(user_id=user_id)[0]
    fan_list = Friend.objects.filter(user_id=user_id)
    return render(request, 'my_music/fans.html', {'list': fan_list,'user':user})



def my_song_menu(request):
    user_id = request.GET.get('user', False)
    if not user_id:
        user_id = request.session.get('user_id', None)
    user = User.objects.filter(user_id=user_id)[0]
    sheet_list = UserSheet.objects.filter(user_id=user_id)
    like_count = MusicFavourite.objects.all().count()
    return render(request, 'my_music/my_song_menu.html', {'like_count':like_count,
                                                          'sheet_list': sheet_list,
                                                          'user':user})


def new_sheet(request):
    user_id = request.POST.get('user', False)
    if not user_id:
        user_id = request.session.get('user_id', None)
    sheet_name = request.POST.get('sheet_name', None)
    if sheet_name or sheet_name!='null':
        UserSheet.objects.create(sheet_name=sheet_name, user_id=user_id)
    user_list = UserSheet.objects.filter(user_id=user_id)
    return render(request, 'my_music/sheet_list.html', {'sheet_list': user_list})