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

    Audio.audio.oncanplay = function () {
        time = parseInt(Audio.audio.duration);
        minute = parseInt(time / 60);
        if(minute<10) minute = '0' + minute;
        second = time - minute * 60;
        if(second<10) second = '0' + second;
        $('.progress-span2').html(minute+ ':' + second)
    };


    $('.next').click(function () {
        that = Audio
        targetIndex = that.currentIndex + 1
        that.currentIndex = targetIndex > that.srcs.length -1 ? 0 : targetIndex;
        that.audio.src = that.srcs[targetIndex]
        that.audio.play()
    });
    
    $('.pre').click(function () {
        that = Audio
        targetIndex = that.currentIndex - 1
        that.currentIndex = targetIndex < 0 ? 0 : targetIndex;
        that.audio.src = that.srcs[targetIndex]
        that.audio.play()
    })

    setInterval(function () {
        span = $('.progress-span1');
        time = parseInt(Audio.audio.currentTime);
        minute = parseInt(time / 60);
        if(minute<10) minute = '0' + minute;
        second = time - minute * 60;
        if(second<10) second = '0' + second;
        span.html(minute+ ':' + second);
    }, 1000);

    $('.progress-span2')

    $('.rows').mouseover(function (e) {
        $(this).find('.download_a').css('display','block');
        $(this).find('.add_a').css('display','block');
        $(this).find('.play_a').css('display','block');
    });

    $('.rows').mouseout(function (e) {
        $(this).find('.download_a').css('display','none');
        $(this).find('.add_a').css('display','none');
        $(this).find('.play_a').css('display','none');
    });

    // $('.rows .play_a').click(function () {
    //     path = $(this).data('music_path');
    //     path = "{% static  '"+ path +"'   %}";
    //     audio.
    //
    // });



    $('.audio_play').click(function () {
        $(this).toggleClass('audio_play');
        $(this).toggleClass('audio_pause');
        audio = $('#audio')[0]
        if(audio.paused)
            audio.play();
        else
            audio.pause();
    });
    // $('.audio_pause').click(function () {
    //     $(this).toggleClass('audio_play');
    //     $(this).toggleClass('audio_pause');
    //     $('#audio')[0].play();
    //
    // });
    isMove = false;  //当为true 是  移动事件被监听
    isWho = false;  // 当为false时  执行音量函数   当为true时,执行进度条函数.

    $('.progress-btn').mousedown(function () {
        isMove = true
        isWho = true

    });

    // $('.progress-btn').mouseup(function () {
    //     isMove = false
    // });


    $('.volume-btn-mobile').mousedown(function () {
        isMove = true
        isWho = false
    });
    //
    // $('.volume-btn-mobile').mouseup(function () {
    //     isMove = false
    // })
     var beginProgressLocation = $('.progress-btn').offset().left - $('.channel').offset().left;
     var endProgressLocation = $('.progress').outerWidth() + beginLocation;
     var beginVolumeLocation = $('.volume-btn-mobile').offset().left - $('.channel').offset().left;
     $(document).mousemove(function (e) {
        if (isMove){
            if (isWho) {  //&& beginLocation <= e.pageX - div_x && endLocation > e.pageX - div_x
                // var obj = $('.progress-btn');
                // currentLocation = $(moveDiv).offset().left - channelWidth;
                // $('.progress-runaway').css('width', currentLocation - beginLocation);
                // obj.css({"left": e.pageX - div_x});
                // $('.progress-span2').html(e.pageX)
                channelWidth = $('.channel').offset().left;
                currentLocation = e.pageX- channelWidth;
                var len = currentLocation - beginLocation;  // - ;
                if (currentLocation > beginLocation && currentLocation < endLocation) {
                    $('.progress-btn').css('left', currentLocation);
                    $('.progress-runaway').css('width', len);
                }
            }
            //if (!isWho && )
            else{

            }

        }
    }).mouseup(function () {
         isMove = false
     })

    // dragProgressMove(".progress-btn", ".progress-btn", '.progress', 0);


    // function dragProgressMove(downDiv, moveDiv, progress, flag) {
    //     beginLocation = $(moveDiv).offset().left - $('.channel').offset().left;
    //     endLocation = $(progress).outerWidth() + beginLocation;
    //     $(downDiv).mousedown(function (e) {
    //         channelWidth = $('.channel').offset().left;
    //         currentLocation = $(moveDiv).offset().left - channelWidth;
    //         //bug  开始结束位置应该固定不应该每次改变
    //         var isMove = true;
    //         // alert($(moveDiv).css('left'));
    //         // alert($(moveDiv).offset().left);
    //         var div_x = e.pageX - currentLocation;
    //         // alert(div_x);
    //         $(document).mousemove(function (e) {
    //             if (!flag){
    //                 if (isMove && beginLocation <= e.pageX - div_x && endLocation > e.pageX - div_x) {
    //                     var obj = $('.progress-btn');
    //                     currentLocation = $(moveDiv).offset().left - channelWidth;
    //                     $('.progress-runaway').css('width', currentLocation - beginLocation);
    //                     obj.css({"left": e.pageX - div_x});
    //                     $('.progress-span2').html(e.pageX - div_x)
    //                  }
    //             }
    //         }).mouseup(
    //             function () {
    //                 isMove = false;
    //             });
    //     });
    // }




    // dragVolumeMove('.volume-btn-mobile', '.volume-btn-mobile', '.volume-progress');

    // function dragVolumeMove(downDiv, moveDiv, progress) {
    //     beginLocation = $(moveDiv).offset().left - $('.channel').offset().left;
    //     endLocation = $(progress).outerWidth() + beginLocation;
    //     $(downDiv).mousedown(function (e) {
    //         channelWidth = $('.channel').offset().left;
    //         currentLocation = $(moveDiv).offset().left - channelWidth;
    //         //bug  开始结束位置应该固定不应该每次改变
    //         var isMove = true;
    //         // alert($(moveDiv).css('left'));
    //         // alert($(moveDiv).offset().left);
    //         var div_x = e.pageX - currentLocation;
    //         // alert(div_x);
    //         $('body').mousemove(function (e) {
    //             if (isMove && beginLocation <= e.pageX - div_x && endLocation > e.pageX - div_x) {
    //                 var obj = $('.volume-progress');
    //                 // currentLocation = $(moveDiv).offset().left - channelWidth;
    //                 // $('.progress-runaway').css('width', currentLocation - beginLocation);
    //                 obj.css({"left": e.pageX - div_x});
    //                 $('.progress-span1').html(e.pageX - div_x)
    //             }
    //         }).mouseup(
    //             function () {
    //                 isMove = false;
    //             });
    //     });
    // }
});

// (function($,document){
//     //定义初始化变量、方法构造函数
//     var InitVariables = function(){
//         this.barWidth = null;                    //进度条宽度
//         this.barTime = null;                     //进度条展示时间
//         this.onOff    = false;                   //记录进度条是否进行播放
//         this.timer = null;                       //记录播放定时器
//         this.curTime = 0;                        //记录当前播放时间
//         this.curWidth = 0;                       //记录当前播放时间对应的宽度
//         this.ballEl = null;
//         this.timeBeginEl = null;
//         this.timeEndEl = null;
//         this.bgEl = null;
//         this.curTimeEl = null;
//     };
//     InitVariables.prototype = {
//         'setWidth':function(w){                    //设置进度条宽度
//             this.barWidth = w;
//             this.bgEl.width(w);
//         },
//         'setTime':function(t){                     //设置进度条时间
//             this.barTime = t;
//         },
//         'setBGColor':function(color){              //设置进度条背景色
//             this.bgEl.css('background-color',color);
//         },
//         'setProgressColor':function(color){        //设置进度条颜色
//             this.curTimeEl.css('background-color',color);
//         },
//         'setBallColor':function(color){            //设置拖动小球颜色
//             this.ballEl.css('background-color',color);
//         },
//         'setBeginColor':function(color){           //设置起始时间
//             this.timeBeginEl.css('color',color);
//         },
//         'setFinishColor':function(color){          //设置结束时间
//             this.timeEndEl.css('color',color);
//         },
//         'timeToString':function(time){             //时间转00:00:00样式
//             if(time>24*3600){
//                 console.log("Error In 'timeToString'：输入时间超过允许值，已默认修改为24*3600-1");
//                 time = 24*3600-1;
//             }
//             var strHour = parseInt(time/3600)>0 ? ((parseInt(time/3600)>9 ? '' : '0') + parseInt(time/3600)) : false;
//             var strMinute = (parseInt(time/60%60)>9 ? '' : '0') + parseInt(time/60%60);
//             var strSecond = (parseInt(time%60)>9 ? '' : '0') + parseInt(time%60);
//             return strHour ? strHour+':'+strMinute+':'+strSecond: strMinute+':'+strSecond;
//         },
//         'beginPlay':function(){                    //开始运动指令
//             var that = this;
//             this.onOff = !this.onOff;
//             this.timer=setInterval(that.changeBar.bind(this),1000);
//         },
//         'stopPlay':function(){                     //停止运动指令
//             this.onOff = !this.onOff;
//             clearInterval(this.timer);
//         },
//         'resetPlay':function(){                    //重置指令
//             this.curTime = 0;
//             this.curWidth = 0;
//             this.curTimeEl.css("width",this.curWidth);
//             this.ballEl.css("left",this.curWidth-this.ballEl.width()/2);
//             this.timeBeginEl.html(this.timeToString(this.curTime));
//             this.timeEndEl.html(this.timeToString(this.barTime));
//         },
//         'changeBar':function(){                    //动态改变函数
//             this.curTime++;
//             this.curWidth = this.curTime*this.barWidth/this.barTime;
//             if (this.curWidth>=this.barWidth){this.stopPlay();this.resetPlay();}
//             this.curTimeEl.css("width",this.curWidth);
//             this.ballEl.css("left",this.curWidth-this.ballEl.width()/2);
//             this.timeBeginEl.html(this.timeToString(this.curTime));
//         },
//         'moveEvent':function(ballEl,curTimeEl,contentEl){        //拖动函数
//             var that = this;
//             ballEl.on('mousedown',function(ev){
//                 var e=ev||document.event;
//                 var disX=event.clientX;
//                 e.preventDefault();
//                 e.stopPropagation();
//                 if (that.onOff){ clearInterval(that.timer);}
//                 $(document).on('mousemove',function(ev){
//                     var e=ev||document.event;
//                     e.preventDefault();
//                     var newX=event.clientX;
//                     var lefts=e.clientX-contentEl.offset().left;
//                     if (lefts>that.barWidth){
//                         lefts=that.barWidth;
//                     }else if(lefts<0){
//                         lefts=0;
//                     }
//                     that.curWidth = lefts;
//                     that.curTime = parseInt(that.curWidth/that.barWidth*that.barTime);
//                     that.curTimeEl.css("width",that.curWidth);
//                     that.ballEl.css("left",that.curWidth-that.ballEl.width()/2);
//                     that.timeBeginEl.html(that.timeToString(that.curTime));
//                 });
//                 $(document).on('mouseup',function(){
//                     if (that.onOff){ that.timer=setInterval(that.changeBar.bind(that),1000);}
//                     $(document).off('mousemove mouseup');
//                 });
//             })
//         }
//     };
//     //初始化变量对象
//     var init = new InitVariables();
//     $.playBar={
//         //初始化进度条
//         'addBar':function(option,inTime){
//             if (arguments.length<2){return false;}
//             init.setTime(inTime);
//             option.empty();
//             //获取DOM元素
//             init.ballEl = $('.progress-btn');
//             init.timeBeginEl = $('.progress_span1');
//             init.timeEndEl = $('.progress-span2');
//             init.bgEl = $('.progress');
//             init.curTimeEl = $('.progress-runaway');
//             //初始化进度条宽度
//             init.barWidth = init.bgEl.width();
//             //绑定滑动事件
//             init.moveEvent(init.ballEl,init.curTimeEl,init.bgEl);
//         },
//         'beginPlay':function(){
//             init.beginPlay();
//         },
//         'endPlay':function(){
//             init.stopPlay();
//         },
//         'resetPlay':function(time){
//             init.setTime(time);
//             init.resetPlay();
//         },
//         'setDefault':function(obj){
//             if(obj.width){init.setWidth(obj.width);}
//             if(obj.bgColor){init.setBGColor(obj.bgColor);}
//             if(obj.progressColor){init.setProgressColor(obj.progressColor);}
//             if(obj.ballColor){init.setBallColor(obj.ballColor);}
//             if(obj.beginColor){init.setBeginColor(obj.beginColor);}
//             if(obj.finishColor){init.setFinishColor(obj.finishColor);}
//         },
//         'getCurTime':function(){
//             return init.curTime;
//         },
//         'getCurWidth':function(){
//             return init.curWidth;
//         }
//     }
// })(jQuery,document);
