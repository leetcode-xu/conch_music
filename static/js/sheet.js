$(function () {
    $('.new-sheet').click(function () {
        let sheetName = prompt();
        if(sheetName && sheetName.replace(' ', '')){
            userId = $(this).data('user_id');
            alert(userId);
            $.post('/my_music/new_sheet/', {'sheet_name':sheetName, 'user':userId} ,function(response,status,xhr) {
                $('.sheet-list').html(response);
            })
        }
    });
})

// $(function () {
//
// })