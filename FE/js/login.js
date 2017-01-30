/**
 * 注册登录页脚本
 * @author  WhyCoder
 * @date    2017-01-28
 */
define('login', function (require, exports) {
    'use strict'
    var Vue = require('vue');
    var $ = require('jquery');
    var ui = require('ui');

    var vmLogin = new Vue({
        el: '#wrap',
        data: {
            'show': true,
            'height': '647px',
            'logData': {
                'user': '',
                'pw': ''
            },
            'regData': {
                'mobile': '',
                'name': '',
                'pw': '',
                'confirmPw': '',
                'email': ''
            }
        },
        methods: {
            'focused': function (e) {
                $(e.target).parent('.form-label').css({
                    'border': '1px solid #e0e0e0',
                    'box-shadow': '0 0 4px #eee',
                    'color': '#e0e0e0'
                });
            },
            'blured': function (e) {
                $(e.target).parent('.form-label')[0].style = '';
            },
            'toggle': function () {
                var show = this['show'];
                show = !show;
                this['show'] = show;
                this['height'] = show ? '647px' : '900px';
            },
            'login': function (e) {
                var form = document.forms['login'];
                var user = this.logData.user;
                var pw = this.logData.pw;
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
                        url: 'index.php/login',
                        type: 'post',
                        data: this.logData,
                        timeout: 10000,
                        success: function (res) {
                            if (res.code === 0) {
                                // location.href = 
                                console.log('登录成功');
                            }
                            else {
                                console.log(res);
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
                // 先单独验证邮箱
                if (email.length !== 0) {
                    if (!patternE.test(email)) {
                        ui.tips({
                            'msg': '邮箱格式不正确',
                            'follow': form.elements['email'].parentElement
                        });
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
                        url: 'index.php/register',
                        type: 'post',
                        data: param,
                        timeout: 10000,
                        success: function (res) {
                            if (res.code === 0) {
                                // location.href = 
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
            }
        }
    });

    

});