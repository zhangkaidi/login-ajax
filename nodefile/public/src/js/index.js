$(function () {
    $('.submit').click(function () {
        var $personIdVal = $('.person-id').val();
        var $personPwdVal = $('.person-pwd').val();

        var personData = {
            id: $personIdVal,
            pwd: $personPwdVal
        };
        $.ajax({
            url: $('.node-file').data('url'),
            type: "get",
            data: personData,
            success: function (result) {
                if (result.result) {
                    alert('success')
                } else {
                    alert('fail')
                }
            }
        })
    })
   
})