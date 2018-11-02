"""conch_music URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from discover import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^login/$', views.do_login, name='login'),
    url(r'^register/$', views.do_register, name='register'),
    url(r'^logout/$', views.do_logout, name='logout'),
    url(r'^search/$', views.search, name='search'),
    url(r'^add_to_sheet/', views.add_to_sheet),
    # url(r'^user/(?P<user_id>\d+)/$', views.user, name='user'),
    url(r'^discover/', include('discover.urls', namespace='discover')),
    url(r'^client/', include('client.urls', namespace='client')),
    url(r'^member/', include('member.urls',namespace='member')),
    url(r'^my_music/', include('my_music.urls', namespace='my_music')),
    url(r'^player/', include('player.urls', namespace='player')),
    url(r'^admin/', admin.site.urls)
]
