from django.shortcuts import render

# Create your views here.


def member(request):
    return render(request, 'member/member.html', {'user': request.session})