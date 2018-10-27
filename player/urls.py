from django.conf.urls import url, include
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^(?P<list_id>\d*)', views.player, name='player')
]
