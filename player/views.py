from django.shortcuts import render
from discover.models import *

# Create your views here.

def player(request, list_id):
    music = MusicList.objects.filter(list_id=list_id)
    return render(request, 'player/player.html', {'user':request.session, 'music_list':music})