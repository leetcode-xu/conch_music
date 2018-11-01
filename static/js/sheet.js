$(function () {
    $('.new-sheet').click(function () {
        let sheetName = prompt();
        $.post('/my_music/new_sheet/', {'sheet_name':sheetName} ,function(response,status,xhr) {
            $('.sheet-list').html(response);
        })
    })
})