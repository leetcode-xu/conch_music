from django.shortcuts import render, redirect, render_to_response
from django.core.urlresolvers import reverse
from . import forms
# django的重量级体现，登录注销直接提供封装好的类
from django.http import HttpResponseRedirect, HttpResponse
# Create your views here.
from .models import *
import random

def do_login(request):
    if request.method == 'POST':
        login_form = forms.LoginForm(request.POST)
        if login_form.is_valid():
            user_phone = login_form.cleaned_data['user_phone']
            pwd = login_form.cleaned_data['pwd']
            # user = authenticate(user_phone=username, pwd=password)
            # if user is not None:
            #     return redirect(reverse('user', args=[user.user_id]))
            # else:
            #     return HttpResponse('登录失败')
            user = User.objects.filter(user_phone=user_phone, pwd=pwd)
            if user:
                request.session['user_id'] = user[0].user_id
                request.session['user_nickname'] = user[0].user_nickname
                request.session['image'] = user[0].image
                return redirect(request.session.get('previous_page','/'))
            else:
                return render(request, 'discover/login.html', {'login_form':login_form, 'error': '用户名密码不一致'})
        else:
            error_message = login_form.errors
            return render(request, 'discover/login.html', {'login_form': login_form, 'error': error_message})
    else:
        form = forms.LoginForm()
        request.session['previous_page'] = request.META.get('HTTP_REFERER', '/')
        return render(request, 'discover/login.html', {'login_form': form})


def index(request):
    # return redirect(reverse('discover:index'))
        search = forms.SearchForm()
        recommend_list = random.sample(list(SingerInfo.objects.all()), 8)
        return render_to_response('discover/index.html', {'user': request.session, 'search_form': search,
                                                          'recommend_list': recommend_list})


def do_register(request):
    if request.method == 'POST':
        register = forms.RegisterForm(request.POST)
        if register.is_valid():
            user_phone = register.cleaned_data['user_phone']
            password = register.cleaned_data['pwd']
            re_password = register.cleaned_data['re_pwd']
            if password != re_password:
                error = '两次输入密码不一致'
                login_form = forms.LoginForm()
                return render(request, 'discover/register.html', {'register_form': register , 'error':error})
            # user = authenticate(user_phone=username, pwd=password)
            else:
                User.objects.create(user_phone=user_phone, pwd=password, user_nickname=user_phone)
                return redirect(reverse('login'))
        else:
            return render(request, 'discover/register.html', {'register_form': register})
    else:
        register = forms.RegisterForm()
        return render_to_response('discover/register.html', {'register_form': register})

def do_logout(request):
    # del request.session['user_nickname']
    request.session.flush()
    return redirect('/')

def search(request):
    search = request.GET.get('search', None)
    search_type = request.GET.get('type', None)
    if search:
        # 搜索歌手
        if search_type == 'singer':
            singer_list = SingerInfo.objects.filter(singer_name=search)
            if singer_list:
                music_list = MusicList.objects.filter(singer=search)
                return render_to_response('discover/singer_details.html',
                                              {'user': request.session, 'singer': singer_list[0],'search':search , 'music_list':music_list})
            else:
                return HttpResponse('歌手不存在')
        # 搜索用户
        elif search_type == 'user':
            user_list = User.objects.filter(user_nickname=search)
            if user_list:
                return render_to_response('discover/search_result.html',
                                          {'type': search_type, 'search': search, 'user': request.session, 'list': user_list})
            else:
                return render_to_response('discover/search_result.html',
                                          {'type': search_type, 'search': search,
                                           'user': request.session, 'list': None})
        # 搜索其他
        elif search_type == 'MV' or search_type == 'album' or search_type == 'lyrics' or search_type == 'sheet':
            return render_to_response('discover/search_result.html', {'type': search_type, 'search': search, 'user': request.session, 'list':None})
        # 搜索歌曲
        else:
            music_list = MusicList.objects.filter(music_name=search)
            if music_list:
                return render_to_response('discover/search_result.html',
                                          {'type': 'music', 'search': search,
                                           'user': request.session, 'music_list': music_list})
            else:
                return render_to_response('discover/search_result.html',
                                          {'type': 'music', 'search': search, 'user': request.session, 'music_list': None})
    else:
        return HttpResponse('搜索错误')


def singer(request, singer_name):
    
    music_list = MusicList.objects.filter(singer=singer_name)
    if music_list:
        singer = SingerInfo.objects.filter(singer_name=singer_name)[0]
        # try:
        #
        # except:
        #     return HttpResponse('歌手不存在')
        return render_to_response('discover/singer_details.html', {'user':request.session,
                                                                   'singer':singer, 'music_list':music_list})
    else:
        return HttpResponse('歌手不存在')


def play(request):
    pass


def profile(request):
    pass


def user(request):
    pass


