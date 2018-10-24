from django.shortcuts import render
from django.http import  HttpResponse
# Create your views here.
from discover.models import *



def my_music(request):
    # music_list
    if request.session.get('user_id',False):
        user_id = request.session['user_id']
        favourite = MusicFavourite.objects.filter(user_id=user_id)
        music_list = []
        for f in range(len(favourite)):
            music_list.append(MusicList.objects.get(list_id=favourite[f].Fmusic_id))
        return render(request, 'my_music/my_music.html', {'user': request.session, 'music_list': music_list})
    else:
        return  render(request, 'my_music/my_music.html', {'user': request.session})



def attention(request):
    # user_id = request.session.get('user_id', None)
    # fan_list = Fan.objects.filter(fan_id = user_id)
    # if fan_list:
    #     return render(request, 'my_music/focus.html', {'list': fan_list})

    return render(request, 'my_music/focus.html', {})


def sheet(request):
    user_id = request.session['user_id']
    sheet = UserSheet.objects.filter(user_id=user_id)
    return render(request, 'my_music/sheet.html', {'sheet':sheet, 'user':request.session})