$(function () {
    $('.submit').click(function () {
        var $personIdVal = $('.person-id').val();
        var $personPwdVal = $('.person-pwd').val();
        if ($personIdVal == "" || $personPwdVal == "") {
            alert('请输入用户名或者密码');
            return;
        }
        var personData = {
            id: $personIdVal,
            pwd: $personPwdVal
        };
        $.ajax({
            url: $('.login-users').data('url'),
            type: "get",
            data: personData,
            success: function (result) {
                if (result.result) {
                    alert('登录成功')
                } else {
                    alert('登录失败')
                }
            }
        })
    })
   
})