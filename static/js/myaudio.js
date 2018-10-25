// audio = $("#audio");
// audio.srcs = ['../../static/music/周杰伦/青花瓷.mp3'];
// audio.currentIndex = 0;
// audio.setAttribute('src', audio.srcs[audio.currentIndex]);


$(function () {
    Audio = {
        audio: $('#audio')[0],
        srcs: ['../../static/music/周杰伦/青花瓷.mp3', '../../static/music/周杰伦/告白气球.mp3'],
        currentIndex: 0,

    };

    var volume = Audio.audio.volume;

    // 音量键点击时静音
    $('.volume-btn').click(function () {
        $(this).toggleClass('volume-btn');
        $(this).toggleClass('volume-btn-mute');
        Audio.audio.volume = Audio.audio.volume ^ volume
    });


    var beginProgressLocation = $('.progress-btn').offset().left - $('.channel').offset().left;
    var endProgressLocation = $('.progress').outerWidth() + beginProgressLocation;
    var beginVolumeLocation = $('.volume-btn-mobile').offset().left - $('.channel').offset().left;
    var endVolumeLocation = $('.volume-progress').outerWidth() + beginVolumeLocation;

    Audio.audio.oncanplay = function () {
        time = parseInt(Audio.audio.duration);
        minute = parseInt(time / 60);
        if (minute < 10) minute = '0' + minute;
        second = time - minute * 60;
        if (second < 10) second = '0' + second;
        $('.progress-span2').html(minute + ':' + second);
        let volumeLength = Audio.audio.volume * (endVolumeLocation- beginVolumeLocation);
        currentVolumeLocation = volumeLength + beginVolumeLocation;
        if (currentVolumeLocation >= beginVolumeLocation && currentVolumeLocation <= endVolumeLocation) {
            $('.volume-btn-mobile').css('left', currentVolumeLocation)
            $('.volume-runaway').css('width', volumeLength);
        }
    };



    function nextMusic(){
        that = Audio;
        targetIndex = that.currentIndex + 1
        that.currentIndex = targetIndex > that.srcs.length - 1 ? 0 : targetIndex;
        that.audio.src = that.srcs[that.currentIndex];
        that.audio.play()
    }

    $('.next').click(nextMusic);
    Audio.audio.onended = nextMusic;

    $('.pre').click(function () {
        that = Audio;
        targetIndex = that.currentIndex - 1;
        that.currentIndex = targetIndex < 0 ? 0 : targetIndex;
        that.audio.src = that.srcs[that.currentIndex]
        that.audio.play()
    });

    timer = setInterval(function () {
        span = $('.progress-span1');
        time = parseInt(Audio.audio.currentTime);
        minute = parseInt(time / 60);
        if (minute < 10) minute = '0' + minute;
        second = time - minute * 60;
        if (second < 10) second = '0' + second;
        span.html(minute + ':' + second);
    }, 100);

    // 点击进度条跳转到对应播放时间
    $('.progress').click(function (e) {
        let channelProgressWidth = $('.channel').offset().left;
        let currentProgressLocation = e.pageX - channelProgressWidth;
        let progressLength = currentProgressLocation - beginProgressLocation;  // - ;
        if (currentProgressLocation >= beginProgressLocation && currentProgressLocation <= endProgressLocation) {
            $('.progress-btn').css('left', currentProgressLocation);
            $('.progress-runaway').css('width', progressLength);
            let currentRunWidth = $('.progress-runaway').outerWidth();
            Audio.audio.currentTime = currentRunWidth / $('.progress').outerWidth() * Audio.audio.duration;
        }
    });
    $('.progress-runaway').click(function (e) {
        let channelProgressWidth = $('.channel').offset().left;
        let currentProgressLocation = e.pageX - channelProgressWidth;
        let progressLength = currentProgressLocation - beginProgressLocation;  // - ;
        if (currentProgressLocation >= beginProgressLocation && currentProgressLocation <= endProgressLocation) {
            $('.progress-btn').css('left', currentProgressLocation);
            $(this).css('width', progressLength);
            let currentRunWidth = $('.progress-runaway').outerWidth();
            Audio.audio.currentTime = currentRunWidth / $('.progress').outerWidth() * Audio.audio.duration;
        }
    });


    $('.rows').mouseover(function (e) {
        $(this).find('.download_a').css('display', 'block');
        $(this).find('.add_a').css('display', 'block');
        $(this).find('.play_a').css('display', 'block');
    });

    $('.rows').mouseout(function (e) {
        $(this).find('.download_a').css('display', 'none');
        $(this).find('.add_a').css('display', 'none');
        $(this).find('.play_a').css('display', 'none');
    });

    $('.audio_play').click(function () {
        $(this).toggleClass('audio_play');
        $(this).toggleClass('audio_pause');
        if (Audio.audio.paused)
            Audio.audio.play();
        else
            Audio.audio.pause();
    });
    isMove = false;  //当为true 是  移动事件被监听
    isWho = false;  // 当为false时  执行音量函数   当为true时,执行进度条函数.

    function playChangeProgress() {
        let currentPlayTime = Audio.audio.currentTime;
        let audioTime = Audio.audio.duration;
        let progressLength = $('.progress').outerWidth();
        let runawayLength = currentPlayTime / audioTime * progressLength;
        $('.progress-runaway').css('width', runawayLength);
        // $('.progress-span2').html(beginLeft + runawayLength);
        $('.progress-btn').css('left', beginProgressLocation + runawayLength);
        return currentPlayTime
    }

    var changeProgress = setInterval(playChangeProgress, 50);


    $('.progress-btn').mousedown(function () {
        clearInterval(changeProgress);
        isMove = true
        isWho = true

    });

    $('.volume-btn-mobile').mousedown(function () {
        isMove = true
        isWho = false
    });

    $(document).mousemove(function (e) {
        if (isMove) {
            if (isWho) {  //&& beginLocation <= e.pageX - div_x && endLocation > e.pageX - div_x
                // var obj = $('.progress-btn');
                // currentLocation = $(moveDiv).offset().left - channelWidth;
                // $('.progress-runaway').css('width', currentLocation - beginLocation);
                // obj.css({"left": e.pageX - div_x});
                // $('.progress-span2').html(e.pageX)
                let channelProgressWidth = $('.channel').offset().left;
                let currentProgressLocation = e.pageX - channelProgressWidth;
                let progressLength = currentProgressLocation - beginProgressLocation;  // - ;
                if (currentProgressLocation >= beginProgressLocation && currentProgressLocation <= endProgressLocation) {
                    $('.progress-btn').css('left', currentProgressLocation);
                    $('.progress-runaway').css('width', progressLength);
                }
            }
            else {
                channelVolumeWidth = $('.channel').offset().left;
                currentVolumeLocation = e.pageX - channelVolumeWidth;
                let volumeLength = currentVolumeLocation - beginVolumeLocation;
                if (currentVolumeLocation >= beginVolumeLocation && currentVolumeLocation <= endVolumeLocation) {
                    $('.volume-btn-mobile').css('left', currentVolumeLocation)
                    $('.volume-runaway').css('width', volumeLength);
                    Audio.audio.volume = volumeLength / (endVolumeLocation - currentVolumeLocation)
                }
            }

        }
    }).mouseup(function () {
        if (isMove) {
            let currentRunWidth = $('.progress-runaway').outerWidth();
            Audio.audio.currentTime = currentRunWidth / $('.progress').outerWidth() * Audio.audio.duration;
        }
        isMove = false
        changeProgress = setInterval(playChangeProgress, 50);
    });



    //  以下模块为正常网页点击事件 如播放,添加,下载;

    //网页播放标签点击时播放这首歌
    $('.play').click(function () {
        musicPath= '../../static/' + $(this).data('music_path')
        Audio.srcs.unshift(musicPath);
        Audio.audio.currentIndex = 0;
        Audio.audio.src = Audio.srcs[Audio.currentIndex];
        Audio.audio.play();
    })
});

