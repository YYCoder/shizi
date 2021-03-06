/**
 * 注册登录页脚本
 * @author  WhyCoder
 * @date    2017-01-28
 */
define('login', function (require, exports) {
    'use strict';
    var Vue = require('vue');
    var $ = require('jquery');
    var ui = require('ui');
    var util = require('util');
    var flashat = require('flashat');

    var vmLogin = new Vue({
        el: '#canvas-container',
        data: {
            'show': true,
            'height': document.documentElement.clientHeight - 50 + 'px',
            'regForm': document.forms['register'],
            'logData': {
                'user': '',
                'pw': ''
            },
            'regData': {
                'mobile': '',
                'name': '',
                'pw': '',
                'confirmPw': '',
                'email': '',
                'avatar': ''
            },
            'regURL': location.origin + '/index.php/register',
            'logURL': location.origin + '/index.php/login',
            'homeURL': location.origin + '/index.php/home',
            'avatarURL': location.origin + '/index.php/change_avatar'
        },
        mounted() {
            flashat();
        },
        methods: {
            'focused': function (e) {
                $(e.target).parent('.form-label').css({
                    'border': '1px solid #e0e0e0',
                    'box-shadow': '0 0 5px 1px #eee',
                    'color': '#e0e0e0'
                });
            },
            'blured': function (e) {
                $(e.target).parent('.form-label')[0].style = '';
            },
            'error': function () {
                ui.msgError('暂不支持该功能,敬请期待');
            },
            'toggle': function () {
                var show = this['show'];
                show = !show;
                this['show'] = show;
                this['height'] = show ? '647px' : '1025px';
                ui.closeAll();
            },
            'login': function (e) {
                var form = document.forms['login'];
                var user = this.logData.user;
                var pw = this.logData.pw;
                var vSelf = this;
                if (user.length === 0) {
                    ui.tips({
                        'msg': '请输入手机号或邮箱',
                        'follow': form.elements['user'].parentElement
                    });
                }
                else if (pw.length === 0) {
                    ui.tips({
                        'msg': '请输入密码',
                        'follow': form.elements['pw'].parentElement
                    });
                }
                else {
                    ui.loading();
                    $.ajax({
                        url: vSelf.logURL,
                        type: 'post',
                        data: this.logData,
                        timeout: 10000,
                        success: function (res) {
                            if (res.code === 0) {
                                location.href = vSelf.homeURL;
                                console.log('登录成功');
                            }
                            else {
                                ui.msgError(res.msg);
                            }
                            ui.closeAll('loading');
                        },
                        error: function (res) {
                            ui.closeAll('loading');
                            ui.msgError();
                        }
                    });
                }
            },
            'register': function (e) {
                var form = document.forms['register'];
                var mobile = this.regData.mobile;
                var name = this.regData.name;
                var confirmPw = this.regData.confirmPw;
                var pw = this.regData.pw;
                var email = this.regData.email;
                var patternE = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                var patternM = /^1[13578]{1}\d{9}$/;
                var param = {
                    name: name,
                    pw: pw,
                    confirmPw: confirmPw,
                    mobile: mobile
                };
                var vSelf = this;
                // 先单独验证邮箱
                if (email.length !== 0) {
                    if (!patternE.test(email)) {
                        ui.tips({
                            'msg': '邮箱格式不正确',
                            'follow': form.elements['email'].parentElement
                        });
                        return;
                    }
                    else {
                        param['email'] = email;
                    }
                }

                if (mobile.length === 0) {
                    ui.tips({
                        'msg': '请输入手机号',
                        'follow': form.elements['mobile'].parentElement
                    });
                }
                else if (!patternM.test(mobile)) {
                    ui.tips({
                        'msg': '手机号格式不正确',
                        'follow': form.elements['mobile'].parentElement
                    });
                }
                else if (name.length === 0) {
                    ui.tips({
                        'msg': '请输入您的姓名',
                        'follow': form.elements['name'].parentElement
                    });
                }
                else if (name.length > 15) {
                    ui.tips({
                        'msg': '昵称太长啦',
                        'follow': form.elements['name'].parentElement
                    });
                }
                else if (pw.length === 0) {
                    ui.tips({
                        'msg': '请输入密码',
                        'follow': form.elements['pw'].parentElement
                    });
                }
                else if (pw !== confirmPw) {
                    ui.tips({
                        'msg': '两次密码输入不一致',
                        'follow': form.elements['confirm-pw'].parentElement
                    });
                }
                else {
                    ui.loading();
                    $.ajax({
                        url: vSelf.regURL,
                        type: 'post',
                        data: param,
                        timeout: 10000,
                        success: function (res) {
                            if (res.code === 0) {
                                // 若选择了图片则更换头像
                                var file = $('#avatar')[0].files,
                                    teacherData;
                                if (file.length !== 0) {
                                    vSelf.upload(res.data['id']);
                                }
                                else {
                                    // 默认用户为教师身份, 向教师表添加记录
                                    vSelf.addTeacher(res.data['id']);
                                }
                            }
                            else {
                                ui.msgError(res.msg);
                                ui.closeAll('loading');
                            }
                        },
                        error: function (res) {
                            ui.closeAll('loading');
                            ui.msgError();
                        }
                    });
                }
            },
            'avatarChange': function (e) {
                var target = e.target;
                var file = target.files[0];
                var img = $('.avatar')[0];
                if (file.size > 2097152) {
                    target.value = '';
                    ui.msgError('图片大小不能超过2MB');
                }
                else {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function (e) {
                        img.src = e.target.result;
                    }
                    reader.onerror = function (e) {
                        ui.msgError('读取图片失败');
                    }
                }

            },
            'upload': function (id) {
                var formData = new FormData();
                var file = $('#avatar')[0].files[0];
                formData.append('avatar', file);
                formData.append('id', id);
                var vSelf = this;
                $.ajax({
                    url: vSelf.avatarURL,
                    type: 'post',
                    data: formData,
                    // jq使用FormData上传文件时一定要加上这两项
                    contentType: false,
                    processData: false,
                    timeout: 10000,
                    success: function (res) {
                        if (res.code === 0) {
                            // 上传了头像, 则修改avatar为头像的地址
                            vSelf.regData['avatar'] = res.data['avatar'];
                            // 默认用户为教师身份, 向教师表添加记录
                            vSelf.addTeacher(id);
                        }
                        else {
                            ui.msgError(res.msg);
                        }
                    },
                    error: function (res) {
                        ui.closeAll('loading');
                        ui.msgError();
                    }
                });
            },
            'addTeacher': function (id) {
                var teacherData = util['deepClone'](this.regData),
                    self = this;
                delete teacherData['pw'];
                delete teacherData['email'];
                delete teacherData['confirmPw'];
                if (teacherData['avatar'].length === 0) {
                    delete teacherData['avatar'];
                }
                teacherData['uid'] = id;
                $.ajax({
                    url: location.origin + '/index.php/add_teacher',
                    data: teacherData,
                    dataType: 'json',
                    type: 'post'
                }).done(function (res) {
                    ui.closeAll('loading');
                    ui.msgRight({
                        'msg': res.msg,
                        'fun': function () {
                            location.href = self.homeURL;
                        }
                    });
                }).fail(function (res) {
                    ui.closeAll('loading');
                    ui.msgError(res.msg);
                });
            }
        }
    });



});
