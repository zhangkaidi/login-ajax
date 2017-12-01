(function () {
    var person = (function () {
        var $personId = $('.person-id');//用户名
        var $personPwd = $('.person-pwd');//用户密码
        var $personDelete = '.btn-delete';//删除按钮
        var $personEdite = '.btn-edite';//编辑按钮
        var $personSave = '.btn-save';//保存按钮
        var $peronListMessage = $('.person-list-message');//用户信息显示div
        var BODY = "body";
        return {
            //登录
            login: function (submit) {
                $('.' + submit).click(function () {
                    var $personIdVal = $personId.val();
                    var $personPwdVal = $personPwd.val();
                    if ($personIdVal == "" || $personPwdVal == "") {
                        alert('请输入用户名和密码');
                        return;
                    }
                    var personData = {
                        name: $personIdVal,
                        password: $personPwdVal
                    };
                    $.ajax({
                        url: $('.login-users').data('url'),
                        type: "get",
                        data: personData,
                        success: function (result) {
                            if (result.success) {
                                $('#personId').val('');
                                $('#personPwd').val('');
                                alert('登录成功')
                            } else {
                                $('#personId').val('');
                                $('#personPwd').val('');
                                alert('用户名或密码错误')
                            }
                        }
                    })
                })
            },
            //新增
            add: function (add) {
                $('.' + add).click(function () {
                    var $this = $(this);
                    var $newPersonId = $("#newPersonId").val();
                    var $newPersonPwd = $("#newPersonPwd").val();
                    if ($newPersonId == "" || $newPersonPwd == "") {
                        alert('请输入用户名和密码');
                        return;
                    }
                    var newPersonData = {
                        name: $newPersonId,
                        password: $newPersonPwd
                    };
                    $.ajax({
                        url: $('.register-person').data('addurl'),
                        type: 'get',
                        data: newPersonData,
                        success: function (result) {
                            if (result.success) {
                                var newTrTd = "<tr><td class='person-id'>" + $newPersonId + "</td><td class='person-pwd'><input type='password' value=" + $newPersonPwd + " readonly='readonly'/></td>"
                                newTrTd += '<td class="operate-btn"><span class="btn btn-delete">删除</span><span class="btn btn-edite">修改</span><span class="btn btn-save">保存</span></td><tr>'
                                $('.person-list-message tr').last().after(newTrTd);
                                $('#newPersonId').val('');
                                $('#newPersonPwd').val('');
                            } else {
                                alert('用户名重复');
                                $('#newPersonId').val('');
                                $('#newPersonPwd').val('');
                            }
                        }
                    });
                })
            },
            //删除
            del: function () {
                $peronListMessage.on('click', $personDelete, function () {
                    var delPersonId = $(this).parent().prevAll('.person-id').text();
                    var $this = $(this);
                    var personId = {
                        name: delPersonId
                    };
                    $.ajax({
                        url: $('.person-list').data('delurl'),
                        post: 'get',
                        data: personId,
                        success: function (result) {
                            if (!result.success) {
                                $this.parent().parent().remove();
                            } else {
                                alert('删除失败')
                            }
                        }
                    })
                })
            },
            //修改
            edite: function () {
                $peronListMessage.on('click', $personEdite, function (e) {
                    $(this).parent().prev().find('input').prop('readonly', false).focus();
                    $(this).parent().parent().siblings().find('input').prop('readonly', true);
                    e.stopPropagation();
                })
            },
            //保存
            save: function () {
                $peronListMessage.on('click', $personSave, function () {
                    var $this = $(this);
                    var personId = $(this).parent().siblings('.person-id').text();
                    var personPwd = $(this).parent().siblings('.person-pwd').find('input').val();
                    var person = {
                        name: personId,
                        password: personPwd
                    };
                    $.ajax({
                        url: $('.person-list').data('edite'),
                        type: 'get',
                        data: person,
                        success: function (result) {
                            if (result.success) {
                                alert('修改成功');
                                $this.parent().prev().find('input').prop('readonly', true);
                            }
                        }
                    })
                })
            },
            //阻止冒泡
            eStop: function () {
                $(BODY).click(function () {
                    $peronListMessage.find('.list-pwd').prop('readonly', true);
                })
            }
        }
    })()
    person.login('submit');
    person.add('add-person-btn');
    person.del();
    person.edite();
    person.save();
    person.eStop();
})()