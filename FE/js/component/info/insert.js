/**
 * 档案录入组件
 * @author  WhyCoder
 * @date    2017-02-06
 */
define(function (require, exports) {
    'use strict';

    var render = require('text!../../template/info/insert.tpl');
    var ui = require('ui');
    var util = require('util');

    var insert = {
        template: render,
        data: function () {
            return {
                curPage: 1,
                requires: {
                    'name': true,
                    'birthday': false,
                    'self': false,
                    'avatar': true,
                    'sex': true,
                    'major': true,
                    'nationality': false,
                    'title': true,
                    'direction': false,
                    'graduation': true,
                    'direction': false,
                    'postcode': false,
                    'teachYear': false,
                    'marriage': false,
                    'mobile': true,
                    'address': false,
                    'salary': true,
                    'idCode': true,
                    'entry': true
                },
                disables: {
                    'personal': true,
                    'experience': true
                },
                majors: []
            };
        },
        props: {
            formData: {
                type: Object,
                default: function () {
                    return {
                        'name': '',
                        'self': '',
                        'birthday': '',
                        'avatar': 'http://www.yyteacher.com/FE/img/user.png',
                        'sex': '0',
                        'major': '',
                        'nationality': '中国',
                        'title': '',
                        'graduation': '',
                        'direction': '无',
                        'postcode': 0,
                        'teachYear': 0,
                        'marriage': 0,
                        'mobile': '',
                        'address': '',
                        'salary': 0.00,
                        'idCode': '',
                        'entry': '',
                        'exps': [
                            {
                                'expCollege': '',
                                'expStart': '',
                                'expEnd': '',
                                'expDescp': ''
                            }
                        ]
                    }
                }
            }
        },
        created: function () {
            this.getMajors();
        },
        methods: {
            'submit': function () {
                var data = util['deepClone'](this.formData);
                if (this.validatePage1() && this.validatePage2() && this.validatePage3()) {
                    data['exps'].forEach((exp, index) => {
                        var timespan = Math.floor((Date.parse(exp['expEnd']) - Date.parse(exp['expStart'])) / (1000 * 60 * 60 * 24 * 365));
                        data['expCollege' + (index + 1)] = exp['expCollege'];
                        data['expDescp' + (index + 1)] = exp['expDescp'];
                        data['expTime' + (index + 1)] = timespan;
                    });
                    data['sex'] = parseInt(data['sex']);
                    delete data['exps'];
                    ui.loading();
                    $.ajax({
                        url: location.origin + '/index.php/info/add_teacher',
                        data: data,
                        dataType: 'json',
                        type: 'post'
                    }).done(function (res) {
                        ui.closeAll('loading');
                        if (res.code == 0) {
                            ui.msgRight(res.msg);
                        }
                        else {
                            ui.msgError(res.msg);
                        }
                    }).fail(function (res) {
                        ui.closeAll('loading');
                        ui.msgError(res.msg);
                    });
                    // console.log(data);
                }
            },
            'notValid': function (opt) {
                this.curPage !== opt.page && (this.curPage = opt.page);
                setTimeout(function () {
                    ui.tips({msg: opt.msg, follow: opt.sel});
                }, 0);
            },
            'validatePage1': function () {
                var isValied = false,
                    idReg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
                if (this.formData['name'].length === 0) {
                    this.notValid({
                        page: 1,
                        msg: '请输入姓名',
                        sel: 'input[name="name"]'
                    });
                }
                else if (this.formData['idCode'].length === 0) {
                    this.notValid({
                        page: 1,
                        msg: '请输入身份证号',
                        sel: 'input[name="idCode"]'
                    });
                }
                else if (!idReg.test(this.formData['idCode'])) {
                    this.notValid({
                        page: 1,
                        msg: '请输入正确的身份证号',
                        sel: 'input[name="idCode"]'
                    });
                }
                else if (this.formData['avatar'].length === 0) {
                    this.notValid({
                        page: 1,
                        msg: '请上传头像',
                        sel: 'label[for="avatar"]'
                    });
                }
                else if (this.formData['sex'] === '0') {
                    this.notValid({
                        page: 1,
                        msg: '请选择性别',
                        sel: 'input[name="sex"]'
                    });
                }
                else if (this.formData['major'].length === 0) {
                    this.notValid({
                        page: 1,
                        msg: '请选择所属的专业',
                        sel: 'input[name="major"]'
                    });
                }
                else if (this.formData['title'].length === 0) {
                    this.notValid({
                        page: 1,
                        msg: '请输入职称',
                        sel: 'input[name="title"]'
                    });
                }
                else if (this.formData['graduation'].length === 0) {
                    this.notValid({
                        page: 1,
                        msg: '请输入毕业院校',
                        sel: 'input[name="graduation"]'
                    });
                }
                else {
                    isValied = true;
                }
                return isValied;
            },
            'validatePage2': function () {
                var isValied = false;
                if (this.formData['birthday'].length > 0 && Date.parse(this.formData['birthday']) > Date.UTC('1995', '1')) {
                    this.notValid({
                        page: 2,
                        msg: '年龄太小啦',
                        sel: 'input[name="birthday"]'
                    });
                }
                else if (this.formData['birthday'].length > 0 && Date.parse(this.formData['birthday']) < Date.UTC('1962', '1')) {
                    this.notValid({
                        page: 2,
                        msg: '年龄太大啦',
                        sel: 'input[name="birthday"]'
                    });
                }
                else if (this.formData['mobile'].length === 0) {
                    this.notValid({
                        page: 2,
                        msg: '请输入手机号',
                        sel: 'input[name="mobile"]'
                    });
                }
                else if (!/^1[13578]{1}\d{9}$/.test(this.formData['mobile'])) {
                    this.notValid({
                        page: 2,
                        msg: '请输入正确的手机号',
                        sel: 'input[name="mobile"]'
                    });
                }
                else if (this.formData['salary'] === 0) {
                    this.notValid({
                        page: 2,
                        msg: '请输入薪资',
                        sel: 'input[name="salary"]'
                    });
                }
                else if (this.formData['entry'].length === 0) {
                    this.notValid({
                        page: 2,
                        msg: '请输入入职时间',
                        sel: 'input[name="entry"]'
                    });
                }
                else {
                    isValied = true;
                }
                return isValied;
            },
            'validatePage3': function () {
                var isValied = false,
                    exps = this.formData.exps;
                for (var i = 0; i < exps.length; i++) {
                    if (exps[i]['expCollege'].length === 0) {
                        ui.tips({msg: '任教学校不能为空', follow: $('input[name=expCollege]').get(i)});
                        return isValied;
                    }
                    else if (exps[i]['expStart'].length === 0) {
                        ui.tips({msg: '任教开始时间不能为空', follow: $('input[name=expStart]').get(i)});
                        return isValied;
                    }
                    else if (exps[i]['expEnd'].length === 0) {
                        ui.tips({msg: '任教结束时间不能为空', follow: $('input[name=expEnd]').get(i)});
                        return isValied;
                    }
                    else if (Date.parse(exps[i]['expStart']) > Date.parse(exps[i]['expEnd'])) {
                        ui.tips({msg: '结束时间不能早于开始时间', follow: $('input[name=expStart]').get(i)});
                        return isValied;
                    }
                }
                isValied = true;
                return isValied;
            },
            'changePage': function (curPage) {
                if (curPage === 1) {
                    if (this.validatePage1()) {
                        this.disables['personal'] = false;
                        this.curPage = 2;
                    }
                    this.formData['major'] = this.formData['major'].replace(/^[0]+/g, '');
                }
                else if (curPage === 2) {
                    if (this.validatePage2()) {
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
                var vm = this;
                if (file.size > 2097152) {
                    target.value = '';
                    ui.msgError('图片大小不能超过2MB');
                }
                else {
                    formData = new FormData();
                    formData.append('avatar', file);
                    ui.loading();
                    $.ajax({
                        url: location.origin + '/index.php/upload_avatar',
                        data: formData,
                        dataType: 'json',
                        type: 'post',
                        contentType: false,
                        processData: false,
                        success: function (res) {
                            ui.closeAll('loading');
                            if (res.code === 0) {
                                vm.formData['avatar'] = res.data['avatar'];
                            }
                            else {
                                ui.msgError('上传头像失败');
                            }
                        }
                    });
                }
            },
            'getMajors': function () {
                var vm = this;
                $.ajax({
                    url: location.origin + '/index.php/get_majors',
                    dataType: 'json',
                    type: 'get',
                    success: function (res) {
                        vm.majors = res.data.majors;
                    }
                });
            },
            'addExp': function () {
                var exps = this.formData.exps;
                if (exps.length < 3) {
                    exps.push({
                        'expNumber': exps.length,
                        'expCollege': '',
                        'expStart': '',
                        'expEnd': '',
                        'expDescp': ''
                    });
                }
            },
            'afterAdd': function () {
                // console.log('triggered');
                var exps = this.formData.exps;
                if (exps.length >= 3) {
                    $('.add').css('display', 'none');
                }
                else {
                    $('.add').css('display', '');
                }
            }
        }
    }

    return insert;
});
