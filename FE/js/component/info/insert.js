/**
 * 档案录入组件
 * @author  WhyCoder
 * @date    2017-02-06
 */
define(function (require, exports) {
    'use strict'
    
    var render = require('text!../../template/info/insert.tpl');
    var ui = require('ui');

    var insert = {
        template: render,
        data: function () {
            return {
                curPage: 1,
                requires: {
                    'name': true,
                    'age': true,
                    'self': true,
                    'avatar': true,
                    'sex': true,
                    'major': true
                },
                formData: {
                    'name': '',
                    'self': '',
                    'age': 0,
                    'avatar': '',
                    'sex': '0'
                },
                disables: {
                    'personal': true,
                    'experience': true
                }
            };
        },
        methods: {
            'submit': function () {
                ui.msgRight('提交成功');
            },
            'changePage': function (curPage) {
                if (curPage === 1) {
                    if (this.formData['name'].length === 0) {
                        ui.tips({msg: '请输入您的姓名', follow: 'input[name="name"]'});
                    }
                    else if (this.formData['avatar'].length === 0) {
                        ui.tips({msg: '请输上传您的头像', follow: 'label[for="avatar"]'});
                    }
                    else {
                        this.disables['personal'] = false;
                        this.curPage = 2;
                    }
                }
                else if (curPage === 2) {
                    if (this.formData['age'] <= 20) {
                        ui.tips({msg: '您的年龄太小啦', follow: 'input[name="age"]'});
                    }
                    else if (this.formData['self'].length === 0) {
                        ui.tips({msg: '请输入您的自我描述', follow: 'textarea[name="self"]'});
                    }
                    else {
                        this.disables['experience'] = false;
                        this.curPage = 3;
                    }
                }
            },
            'changeAvatar': function (e) {
                var target = e.target;
                var file = target.files[0];
                var img = document.querySelector('.avatar');
                var formData;
                if (file.size > 2097152) {
                    target.value = '';
                    ui.msgError('图片大小不能超过2MB');
                }
                else {
                    formData = new FormData();
                    formData.append('avatar', file);
                    $.ajax({
                        url: location.origin + '/index.php/upload_avatar',
                        data: formData,
                        dataType: 'json',
                        type: 'post',
                        contentType: false,
                        processData: false,
                        success: function (res) {
                            console.log(res);
                            if (res.code === 0) {
                                img.src = res.data['avatar'];
                            }
                            else {
                                ui.msgError('上传头像失败');
                            }
                        }
                    });
                }
            }
        }
    }

    return insert;
});