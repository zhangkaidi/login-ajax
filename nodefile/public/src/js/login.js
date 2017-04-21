(function () {
    var person = (function () {
        var $personId = $('.person-id');
        var $personPwd = $('.person-pwd');
        return {
            //登录
            login: function (submit) {
                $('.' + submit).click(function () {
                    var $personIdVal = $personId.val();
                    var $personPwdVal = $personPwd.val();
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
                                alert('用户名或密码错误')
                            }
                        }
                    })
                })
            },
            //新增
            add: function (add) {
                $('.' + add).click(function () {
                   var newPersonId  =  $(this).prevAll('.person-id').val();
                   var newPersonPwd = $(this).prevAll('.person-pwd').val();
                   var newTrTd = "<tr><td>" + newPersonId + "</td><td>" + newPersonPwd + "</td>"
                   newTrTd +='<td class="operate-btn"><span class="btn btn-delete ">删除</span><span class="btn btn-edite">修改</span><span class="btn btn-save">保存</span></td><tr>'
                   $('.person-list-message tr').last().after(newTrTd);
                })
            }
        }
    })()
    person.login('submit');
    person.add('add-person-btn');
})()