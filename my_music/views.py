from django.shortcuts import render
from django.http import  HttpResponse
# Create your views here.
from .models import *



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
    user_id = request.session.get('user_id', None)
    fan_list = Friend.objects.filter(user_id = user_id)
    # if fan_list:
    return render(request, 'my_music/focus.html', {'list': fan_list,'user':request.session})

    # return render(request, 'my_music/focus.html', {})


def fans(request):
    user_id = request.session.get('user_id', None)
    fan_list = Friend.objects.filter(user_id=user_id)
    return render(request, 'my_music/fans.html', {'list': fan_list,'user':request.session})

def focus_user(request):
    user_id = request.session.get('user_id', None)
    fan_list = Friend.objects.filter(user_id=user_id)
    return render(request, 'my_music/focus_user.html', {'list': fan_list,'user':request.session})
def my_song_menu(request):
    user_id = request.session.get('user_id', None)
    fan_list = Friend.objects.filter(user_id=user_id)
    return render(request, 'my_music/my_song_menu.html', {'list': fan_list,'user':request.session})