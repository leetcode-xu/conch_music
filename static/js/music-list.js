$(function () {
    const ELEMENT = {
        rows: '.rows',
        linkDownload: '.download_a',
        linkAdd: '.add_a',
        linkPlay: '.play_a',
    }

    $(ELEMENT.rows).mouseover(function (e) {
        $(this).find(ELEMENT.linkDownload).css('display', 'block');
        $(this).find(ELEMENT.linkAdd).css('display', 'block');
        $(this).find(ELEMENT.linkPlay).css('display', 'block');
    });

    $(ELEMENT.rows).mouseout(function (e) {
        $(this).find(ELEMENT.linkDownload).css('display', 'none');
        $(this).find(ELEMENT.linkAdd).css('display', 'none');
        $(this).find(ELEMENT.linkPlay).css('display', 'none');
    });
    // $('.navMenu').click(function() {
    //      // 当前对象
    //     $(this).children('ul').show() ;
    // }) ;
    // $('.navMenu').mouseout(function() {
    //     // 当前对象
    //     $(this).children('ul').hide() ;
    // }) ;
});