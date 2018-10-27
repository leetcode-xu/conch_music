$(function () {
    Audio = {
        audio: $('#audio')[0],
        srcs: ['../../static/music/周杰伦/青花瓷.mp3', '../../static/music/周杰伦/告白气球.mp3'],
        currentIndex: 0,
        musicName: ['青花瓷','告白气球'],
        musicSinger: ['周杰伦','周杰伦'],
    };

    const ELEMENT = {
        btnLike: $('.btn1'),
        btnAdd: $('.btn2'),
        btnDownload: $('.btn3'),
        btnDel: $('.btn4'),
        btnFlush: $('.btn5'),
        channel: $('.channel'),
        durationProgress: $('.progress'),
        currentTimeProgress : $('.progress-runaway'),
        btnProgress: $('.progress-btn'),
        iconVolume: $('.volume-btn'),
        btnVolume: $('.volume-btn-mobile'),
        volumeProgress: $('.volume-progress'),
        currentVolumeProgress: $('.volume-runaway'),
        duration: $('.progress-span2'),
        currentTime: $('.progress-span1'),
        btnPre: $('.pre'),
        btnNext: $('.next'),
        btnPlayPaused: $('.audio_play'),
        playingMusicName: $('.playing-music'),
        playingSingerName: $('.playing-singer'),

    };

    var beginProgressLocation = $(ELEMENT.btnProgress).offset().left;
    var endProgressLocation = $(ELEMENT.durationProgress).outerWidth() + beginProgressLocation;
    var beginVolumeLocation = $(ELEMENT.btnVolume).offset().left;
    var endVolumeLocation = $(ELEMENT.volumeProgress).outerWidth() + beginVolumeLocation;
    var currentVolume = Audio.audio.volume;

    function loadInitial(){
        let volumeLength = Audio.audio.volume * (endVolumeLocation- beginVolumeLocation);
        currentVolumeLocation = volumeLength + beginVolumeLocation;
        if (currentVolumeLocation >= beginVolumeLocation && currentVolumeLocation <= endVolumeLocation) {
            $(ELEMENT.btnVolume).css('left', currentVolumeLocation);
            $(ELEMENT.currentVolumeProgress).css('width', volumeLength);
        }
    }
    loadInitial();

    Audio.audio.oncanplay = function () {
        time = parseInt(Audio.audio.duration);
        minute = parseInt(time / 60);
        if (minute < 10) minute = '0' + minute;
        second = time - minute * 60;
        if (second < 10) second = '0' + second;
        $(ELEMENT.duration).html(minute + ':' + second);
        $(ELEMENT.playingMusicName).html(Audio.musicName[Audio.currentIndex]);
        $(ELEMENT.playingSingerName).html(Audio.musicSinger[Audio.currentIndex]);
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
            volume = Audio.audio.volume;
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
            return currentPlayTime
        }
    }

    var changeProgress = setInterval(playChangeProgress, 50);


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
        }
        movingProgress = false;  //拖拽结束时继续使用定时器
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
        that = Audio;
        targetIndex = that.currentIndex - 1;
        that.currentIndex = targetIndex < 0 ? that.srcs.length - 1 : targetIndex;
        that.audio.src = that.srcs[that.currentIndex];
        that.audio.play()
    });

    function nextMusic(){
        that = Audio;
        targetIndex = that.currentIndex + 1;
        that.currentIndex = targetIndex > that.srcs.length - 1 ? 0 : targetIndex;
        that.audio.src = that.srcs[that.currentIndex];
        that.audio.play()
    }

    $(ELEMENT.btnNext).click(nextMusic);
    Audio.audio.onended = nextMusic;

    $(ELEMENT.btnPlayPaused).click(function () {
        $(this).toggleClass('audio_play');
        $(this).toggleClass('audio_pause');
        if (Audio.audio.paused)
            Audio.audio.play();
        else
            Audio.audio.pause();
    });

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


});