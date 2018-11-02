$(function () {
    $('.new-sheet').click(function () {
        let sheetName = prompt();
        if(sheetName && sheetName.replace(' ', '')){
            userId = $(this).data('user_id');
            $.post('/my_music/new_sheet/', {'sheet_name':sheetName, 'user':userId} ,function(response,status,xhr) {
                $('.sheet-list').html(response);
            })
        }
    });

    $('.playlist').mouseover(function () {
        $(this).find('.del-list-icon').css('display', 'block')
    });

    $('.playlist').mouseout(function () {
        $(this).find('.del-list-icon').css('display', 'none')
    });

    $('.del-list-icon').click(function () {
        let sheet_id = $(this).data('sheet_id');
        let this_user = $(this).data('this_user')
        let that_user = $(this).
        let signal = window.confirm('确定删除?');
        if(signal){
            $.post('/my_music/del_sheet/', {'sheet_id': sheet_id}, function (response, status, xhr) {
                alert(response);
                $('.sheet-list').html(response);
            })
        }

    })

});



// $(function () {
//
// })