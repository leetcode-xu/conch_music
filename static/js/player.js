$(function () {
    Audio = {
        audio: $('#audio')[0],
        srcs: [],
        currentIndex: 0,
        musicName: [],
        musicSinger: [],
        musicPicture: [],
        backImage: [],
        rowsId : [],
    };

    const ELEMENT = {
        btnLike: '.btn1',
        btnAdd: '.btn2',
        btnDownload: '.btn3',
        btnDel: '.btn4',
        btnFlush: '.btn5',
        channel: '.channel',
        durationProgress: '.progress',
        currentTimeProgress : '.progress-runaway',
        btnProgress: '.progress-btn',
        iconVolume: '.volume-btn',
        btnVolume: '.volume-btn-mobile',
        volumeProgress: '.volume-progress',
        currentVolumeProgress: '.volume-runaway',
        duration: '.progress-span2',
        currentTime: '.progress-span1',
        btnPre: '.pre',
        btnNext: '.next',
        btnPlay: '.audio_play',
        btnPause: '.audio_pause',
        playingMusicName: '.playing-music',
        playingSingerName: '.playing-singer',
        serialNumber: '.serial-number',
        musicList: '.music_list',
        musicName: '.music_name',
        singerMsgPic: '.singer_msg_picture',
        musicMsgName: '.music_msg_name',
        singerMsgName: '.singer_msg_name',
        albumMsgName: '.album_msg_name',
        pictureBackground: '#pic_bg',
        singerDownloadId: '#single-download',
        divLike: '.div_like',
        divWhile: '.div_while',
        window: '.windows',
        allCheck: '.all_check',
        singerCheck: '.singer-check',

    };

    var beginProgressLocation = $(ELEMENT.btnProgress).offset().left;
    var endProgressLocation = $(ELEMENT.durationProgress).outerWidth() + beginProgressLocation;
    var beginVolumeLocation = $(ELEMENT.btnVolume).offset().left;
    var endVolumeLocation = $(ELEMENT.volumeProgress).outerWidth() + beginVolumeLocation;
    var currentVolume = Audio.audio.volume;
    var isWhile = 0;

    // 改变界面背景和歌曲信息
    function changeHtmlPlayMessage(preId, currentId) {
        $(preId).find('a').css('color', '#c9c9c9');
        $(preId).find('label').css('color', '#c9c9c9');
        $(currentId).find('a').css('color', 'white');
        $(currentId).find('label').css('color', 'white');
        $(ELEMENT.playingMusicName).html(Audio.musicName[Audio.currentIndex]);
        $(ELEMENT.playingSingerName).html(Audio.musicSinger[Audio.currentIndex]);
        $(ELEMENT.singerMsgPic).attr('src',Audio.musicPicture[Audio.currentIndex]);
        $(ELEMENT.singerMsgName).find('a').html(Audio.musicSinger[Audio.currentIndex]);
        $(ELEMENT.musicMsgName).find('a').html(Audio.musicName[Audio.currentIndex]);
        $(ELEMENT.albumMsgName).find('a').html(Audio.musicName[Audio.currentIndex]);
        $(ELEMENT.pictureBackground).css('background-image', 'url('+Audio.backImage[Audio.currentIndex]+')');
        $(ELEMENT.singerDownloadId).attr('download', Audio.musicName[Audio.currentIndex] + '.mp4');
        $(ELEMENT.singerDownloadId).attr('href', Audio.srcs[Audio.currentIndex]);
        let musicId = currentId.substr(1);
        $.cookie('music_id', musicId) ;
    }
    function loadInitial(){
        let volumeLength = Audio.audio.volume * (endVolumeLocation- beginVolumeLocation);
        currentVolumeLocation = volumeLength + beginVolumeLocation;
        if (currentVolumeLocation >= beginVolumeLocation && currentVolumeLocation <= endVolumeLocation) {
            $(ELEMENT.btnVolume).css('left', currentVolumeLocation);
            $(ELEMENT.currentVolumeProgress).css('width', volumeLength);
        }
        $(ELEMENT.musicName).each(function () {
            Audio.musicSinger.push($(this).data('singer'));
            Audio.musicName.push($(this).text());
            Audio.srcs.push($(this).data('music_path'));
            Audio.musicPicture.push($(this).data('picture'));
            Audio.backImage.push($(this).data('back'));
            Audio.rowsId.push($(this).data('id'));
        });
        let currentId = $(ELEMENT.musicList).data('play_id');
        Audio.currentIndex = $(currentId).find(ELEMENT.serialNumber).html() -1;
        Audio.audio.src=Audio.srcs[Audio.currentIndex];
        changeHtmlPlayMessage(preId='#0', currentId);
        // while (!Audio.audio.readyState){}  判断数据是否就绪,但是似乎没有作用
        let btnPlay = $(ELEMENT.btnPlay);
        btnPlay.toggleClass('audio_pause');
        btnPlay.toggleClass('audio_play');

        if (Audio.audio.paused)
            Audio.audio.play();
        else
            Audio.audio.pause();
    }
    loadInitial();

    // 设置全选
    $(ELEMENT.allCheck).click(function () {
        if($(this).is(':checked')){
            $(ELEMENT.singerCheck).prop('checked',true);
        }
        else $(ELEMENT.singerCheck).prop('checked',false);
    });


    // 以下内容为五个按钮所对应的事件

    //添加按钮事件
    $(ELEMENT.btnAdd).mouseover(function () {
        $(this).find('i').css('background-image','url("/static/images/add_icon_2.png")');
        $(this).find('span').css('color','white');
    });
    $(ELEMENT.btnAdd).mouseout(function () {
        $(this).find('i').css('background-image','url("/static/images/add_icon_1.png")');
        $(this).find('span').css('color','#c9c9c9');
    });

    // 收藏按钮事件
    $(ELEMENT.btnLike).mouseover(function () {
        $(this).find('i').css('background-image','url("/static/images/collect_1.png")');
        $(this).find('span').css('color','white');
    });
    $(ELEMENT.btnLike).mouseout(function () {
        $(this).find('i').css('background-image','url("/static/images/collect.png")');
        $(this).find('span').css('color','#c9c9c9');
    });
    // 点击收藏按钮所执行的函数
    function addToLike(){
        let selectedMusicId = [];
        $(ELEMENT.singerCheck).each(function () {
            if($(this).is(':checked')){
                selectedMusicId.push($(this).attr('value'));
            }
        });

        $.ajax({
             type: "POST",
             url: "/player/like_selected/",
             traditional:true,
             data: {'list': selectedMusicId},
             success: function(response) {
                 let myWindow = $(ELEMENT.window)
                 myWindow.find('span').html(response);
                 myWindow.css('display', 'block');
                 setTimeout(function () {
                     myWindow.css('display', 'none');
                 }, 1000);
             },
        });
    }
    $(ELEMENT.btnLike).click(addToLike);


    //下载按钮
    $(ELEMENT.btnDownload).mouseover(function () {
        $(this).find('i').css('background-image','url("/static/images/download_icon_2.png")');
        $(this).find('span').css('color','white');
    });
    $(ELEMENT.btnDownload).mouseout(function () {
        $(this).find('i').css('background-image','url("/static/images/download_icon_1.png")');
        $(this).find('span').css('color','#c9c9c9');
    });

    // 清空按钮对应事件
    $(ELEMENT.btnFlush).mouseover(function () {
        $(this).find('i').css('background-image','url("/static/images/flush_2.png")');
        $(this).find('span').css('color','white');
    });
    $(ELEMENT.btnFlush).mouseout(function () {
        $(this).find('i').css('background-image','url("/static/images/flush_1.png")');
        $(this).find('span').css('color','#c9c9c9');
    });

    // $(ELEMENT.btnFlush).click(function () {
    //     $.ajax({
    //          type: "get",
    //          url: "/player/flush/",
    //          success: function (response) {
    //              if(response === 'ok'){
    //                  $('.music_list').load(location.href + " .music_list")
    //              }
    //          }
    //     });
    // })

    // 删除按钮对应事件
    $(ELEMENT.btnDel).mouseover(function () {
        $(this).find('i').css('background-image','url("/static/images/del_2.png")');
        $(this).find('span').css('color','white');
    });
    $(ELEMENT.btnDel).mouseout(function () {
        $(this).find('i').css('background-image','url("/static/images/del_1.png")');
        $(this).find('span').css('color','#c9c9c9');
    });




    // 点击播放暂停按钮
    $(ELEMENT.btnPlay).click(function () {
            let btn = $(this);
            btn.toggleClass('audio_pause');
            btn.toggleClass('audio_play');
            if (Audio.audio.paused)
                Audio.audio.play();
            else
                Audio.audio.pause();
        }
    );
    $(ELEMENT.btnPause).click(function () {
            let btn = $(this);
            btn.toggleClass('audio_pause');
            btn.toggleClass('audio_play');
            if (Audio.audio.paused)
                Audio.audio.play();
            else
                Audio.audio.pause();
        }
    );
    loadInitial();
    Audio.audio.oncanplay = function () {
        time = parseInt(Audio.audio.duration);
        minute = parseInt(time / 60);
        if (minute < 10) minute = '0' + minute;
        second = time - minute * 60;
        if (second < 10) second = '0' + second;
        $(ELEMENT.duration).html(minute + ':' + second);
        // $(ELEMENT.playingMusicName).html(Audio.musicName[Audio.currentIndex]);
        // $(ELEMENT.playingSingerName).html(Audio.musicSinger[Audio.currentIndex]);
    };

    // 音量键点击时静音
    $(ELEMENT.iconVolume).click(function () {
        $(this).toggleClass('volume-btn');
        $(this).toggleClass('volume-btn-mute');
        Audio.audio.volume = Audio.audio.volume ? 0 : currentVolume;
    });

    $(ELEMENT.currentVolumeProgress).click(function (e) {
        let currentVolumeLocation = e.pageX;
        let volumeLength = currentVolumeLocation - beginVolumeLocation;
        if (currentVolumeLocation >= beginVolumeLocation && currentVolumeLocation <= endVolumeLocation) {
            $(ELEMENT.btnVolume).css('left', currentVolumeLocation);
            $(this).css('width', volumeLength);
            // let currentRunWidth = $('.volume-runaway').outerWidth();
            Audio.audio.volume = volumeLength / $(ELEMENT.volumeProgress).outerWidth();
            currentVolume = Audio.audio.volume;
        }
    });

    // 点击音量进度条增加音量
    $(ELEMENT.volumeProgress).click(function (e) {
        let currentVolumeLocation = e.pageX;
        let volumeLength = currentVolumeLocation - beginVolumeLocation;
        if (currentVolumeLocation >= beginVolumeLocation && currentVolumeLocation <= endVolumeLocation) {
            $(ELEMENT.btnVolume).css('left', currentVolumeLocation);
            $(ELEMENT.currentVolumeProgress).css('width', volumeLength);
            // let currentRunWidth = $('.volume-runaway').outerWidth();
            Audio.audio.volume = volumeLength / $(this).outerWidth();
            currentVolume = Audio.audio.volume;
            volume = Audio.audio.volume;
        }
    });

    var movingProgress =false;  //判断播放进度条是否正在移动

    // 进度条跟随播放进度
    function playChangeProgress() {
        if(!movingProgress) {
            let currentPlayTime = Audio.audio.currentTime;
            let duration = Audio.audio.duration;
            let progressLength = $(ELEMENT.durationProgress).outerWidth();
            let runawayLength = currentPlayTime / duration * progressLength;
            $(ELEMENT.currentTimeProgress).css('width', runawayLength);
            // $('.progress-span2').html(beginLeft + runawayLength);
            $(ELEMENT.btnProgress).css('left', beginProgressLocation + runawayLength);
        }
    }

    setInterval(playChangeProgress, 50);


    var isMove = false;  //当为true 是  移动事件被监听
    var isWho = false;  // 当为false时  执行音量函数   当为true时,执行进度条函数.

    $(ELEMENT.btnProgress).mousedown(function () {
        isMove = true;
        isWho = true

    });

    $(ELEMENT.btnVolume).mousedown(function () {
        isMove = true;
        isWho = false;
    });


    $(document).mousemove(function (e) {
        if (isMove) {
            if (isWho) {
                movingProgress = true;
                let currentProgressLocation = e.pageX;
                let progressLength = currentProgressLocation - beginProgressLocation;  // - ;
                if (currentProgressLocation >= beginProgressLocation && currentProgressLocation <= endProgressLocation) {
                    $(ELEMENT.btnProgress).css('left', currentProgressLocation);
                    $(ELEMENT.currentTimeProgress).css('width', progressLength);
                    Audio.audio.currentTime = progressLength /
                        (endProgressLocation - beginVolumeLocation) * Audio.audio.duration
                }
            }
            else {
                currentVolumeLocation = e.pageX;
                let volumeLength = currentVolumeLocation - beginVolumeLocation;
                if (currentVolumeLocation >= beginVolumeLocation && currentVolumeLocation <= endVolumeLocation) {
                    $(ELEMENT.btnVolume).css('left', currentVolumeLocation);
                    $(ELEMENT.currentVolumeProgress).css('width', volumeLength);
                    Audio.audio.volume = volumeLength / (endVolumeLocation - currentVolumeLocation);
                    volume = Audio.audio.volume;
                }
            }

        }
    }).mouseup(function () {
        if (isMove) {
            let currentRunWidth = $(ELEMENT.currentTimeProgress).outerWidth();
            Audio.audio.currentTime = currentRunWidth / $(ELEMENT.durationProgress).outerWidth() * Audio.audio.duration;
            movingProgress = false;  //拖拽结束时继续使用定时器
        }
        isMove = false;
    });

    // 点击进度条跳转到对应播放时间
    $(ELEMENT.durationProgress).click(function (e) {
        let currentProgressLocation = e.pageX;
        let progressLength = currentProgressLocation - beginProgressLocation;  // - ;
        if (currentProgressLocation >= beginProgressLocation && currentProgressLocation <= endProgressLocation) {
            $(ELEMENT.btnProgress).css('left', currentProgressLocation);
            $(ELEMENT.currentTimeProgress).css('width', progressLength);
            Audio.audio.currentTime = $(ELEMENT.currentTimeProgress).outerWidth() /
                $(ELEMENT.durationProgress).outerWidth() * Audio.audio.duration;
        }
    });
    $(ELEMENT.currentTimeProgress).click(function (e) {
        let currentProgressLocation = e.pageX;
        let progressLength = currentProgressLocation - beginProgressLocation;  // - ;
        if (currentProgressLocation >= beginProgressLocation && currentProgressLocation <= endProgressLocation) {
            $(ELEMENT.btnProgress).css('left', currentProgressLocation);
            $(this).css('width', progressLength);
            Audio.audio.currentTime = $(ELEMENT.currentTimeProgress).outerWidth()
                / $(ELEMENT.durationProgress).outerWidth() * Audio.audio.duration;
        }
    });

    $(ELEMENT.btnPre).click(function () {
        let preId = Audio.rowsId[Audio.currentIndex];
        let targetIndex = Audio.currentIndex - 1;
        if(isWhile === 0){}
        else if(isWhile === 1){
            targetIndex = Audio.currentIndex;
        }else{
            targetIndex = Math.floor(Math.random()*Audio.srcs.length);
        }
        Audio.currentIndex = targetIndex < 0 ? Audio.srcs.length - 1 : targetIndex;
        Audio.audio.src = Audio.srcs[Audio.currentIndex];
        let currentId = Audio.rowsId[Audio.currentIndex];
        changeHtmlPlayMessage(preId, currentId);
        Audio.audio.play()
    });

    function nextMusic(){
        let preId = Audio.rowsId[Audio.currentIndex];
        let targetIndex = Audio.currentIndex + 1;
        if(isWhile === 0){}
        else if(isWhile === 1){
            targetIndex = Audio.currentIndex;
        }else{
            targetIndex = Math.floor(Math.random()*Audio.srcs.length);
        }
        Audio.currentIndex = targetIndex > Audio.srcs.length - 1 ? 0 : targetIndex;
        Audio.audio.src = Audio.srcs[Audio.currentIndex];
        let currentId = Audio.rowsId[Audio.currentIndex];
        changeHtmlPlayMessage(preId,currentId);
        Audio.audio.play()
    }

    $(ELEMENT.btnNext).click(nextMusic);
    Audio.audio.onended = nextMusic;

    function displayCurrentTime() {
        span = $(ELEMENT.currentTime);
        time = parseInt(Audio.audio.currentTime);
        minute = parseInt(time / 60);
        if (minute < 10) minute = '0' + minute;
        second = time - minute * 60;
        if (second < 10) second = '0' + second;
        span.html(minute + ':' + second);
    }

    var timer = setInterval(displayCurrentTime, 100);

    //双击音乐名字播放音乐
    $(ELEMENT.musicName).dblclick(function (e) {
        let preId = Audio.rowsId[Audio.currentIndex];
        let currentId = $(this).data('id');
        let targetIndex = $(currentId).find(ELEMENT.serialNumber).html() - 1;
        Audio.currentIndex = targetIndex >= 0 && targetIndex <= Audio.srcs.length -1 ? targetIndex : 0;
        Audio.audio.src = Audio.srcs[Audio.currentIndex];
        changeHtmlPlayMessage(preId,currentId);
        Audio.audio.play();
    })

    var isLike = false;
    //点击收藏按钮收藏音乐
    $(ELEMENT.divLike).click(function () {
        let musicId = $.cookie('music_id');
        $(this).toggleClass('div_like_click');
        $(this).toggleClass('div_like');
        if(isLike) isLike = false;
        else isLike = true;
        $.post("/player/like/",{"music_id": musicId, 'is_like': isLike },function(response,status,xhr){
            let myWindow = $(ELEMENT.window)
            myWindow.find('span').html(response);
            myWindow.css('display', 'block');
            setTimeout(function () {
                myWindow.css('display', 'none');
            },1000)
        });
        // $(this).css('background-image', 'url("/static/images/like_icon_5.png")');
    });

    // 设置循环播放模式
    $(ELEMENT.divWhile).click(function () {
        isWhile = (isWhile + 1) % 3;
        if(isWhile === 0){
            $(this).css('background-image', 'url("/static/images/while_play.png")')
        }else if(isWhile === 1){
            $(this).css('background-image', 'url("/static/images/singer_play.png")')
        }else{
            $(this).css('background-image', 'url("/static/images/random_play.png")')
        }
    });

});