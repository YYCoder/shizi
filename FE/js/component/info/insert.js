/**
 * 档案录入组件
 * @author  WhyCoder
 * @date    2017-02-06
 */
define(function (require, exports) {
    'use strict';

    var render = require('text!../../template/info/insert.tpl');
    var ui = require('ui');

    var insert = {
        template: render,
        data: function () {
            return {
                curPage: 1,
                requires: {
                    'name': true,
                    'age': false,
                    'self': true,
                    'avatar': true,
                    'sex': true,
                    'major': true,
                    'nationality': false,
                    'title': true,
                    'direction': false,
                    'graduation': true,
                    'direction': false,
                    'postcode': true,
                    'teachYear': false,
                    'marriage': false,
                    'mobile': true,
                    'address': false,
                    'salary': true,
                    'idCode': true
                },
                formData: {
                    'name': '',
                    'self': '',
                    'age': 0,
                    'avatar': '',
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
                    'exps': [
                        {
                            'expNumber': 0,
                            'expCollege': '',
                            'expStart': '',
                            'expEnd': '',
                            'expDescp': ''
                        }
                    ]
                },
                disables: {
                    'personal': false,
                    'experience': false
                },
                majors: []
            };
        },
        created: function () {
            this.getMajors();
        },
        methods: {
            'submit': function () {
                console.log(this.validatePage3());
            },
            'validatePage1': function () {
                var isValied = false,
                    idReg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
                if (this.formData['name'].length === 0) {
                    ui.tips({msg: '请输入您的姓名', follow: 'input[name="name"]'});
                }
                else if (this.formData['idCode'].length === 0) {
                    ui.tips({msg: '请输入您的身份证号', follow: 'input[name="idCode"]'});
                }
                else if (!idReg.test(this.formData['idCode'])) {
                    ui.tips({msg: '请输入正确的身份证号', follow: 'input[name="idCode"]'});
                }
                else if (this.formData['avatar'].length === 0) {
                    ui.tips({msg: '请输上传您的头像', follow: 'label[for="avatar"]'});
                }
                else if (this.formData['sex'] === '0') {
                    ui.tips({msg: '请选择您的性别', follow: 'input[name="sex"]'});
                }
                else if (this.formData['major'].length === 0) {
                    ui.tips({msg: '请选择您所属的专业', follow: 'input[name="major"]'});
                }
                else if (this.formData['title'].length === 0) {
                    ui.tips({msg: '请输入您的职称', follow: 'input[name="title"]'});
                }
                else if (this.formData['graduation'].length === 0) {
                    ui.tips({msg: '请输入您的毕业院校', follow: 'input[name="graduation"]'});
                }
                else {
                    isValied = true;
                }
                return isValied;
            },
            'validatePage2': function () {
                var isValied = false;
                if (this.formData['age'] <= 20) {
                    ui.tips({msg: '您的年龄太小啦', follow: 'input[name="age"]'});
                }
                else if (this.formData['mobile'].length === 0) {
                    ui.tips({msg: '请输入您的手机号', follow: 'input[name="mobile"]'});
                }
                else if (!/^1[13578]{1}\d{9}$/.test(this.formData['mobile'])) {
                    ui.tips({msg: '请输入正确的手机号', follow: 'input[name="mobile"]'});
                }
                else if (this.formData['self'].length === 0) {
                    ui.tips({msg: '请输入您的自我描述', follow: 'textarea[name="self"]'});
                }
                else if (this.formData['salary'] === 0) {
                    ui.tips({msg: '请输入您的薪资', follow: 'input[name="salary"]'});
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
                    $.ajax({
                        url: location.origin + '/index.php/upload_avatar',
                        data: formData,
                        dataType: 'json',
                        type: 'post',
                        contentType: false,
                        processData: false,
                        success: function (res) {
                            if (res.code === 0) {
                                vm.formData['avatar'] = res.data['avatar'];
                                img.src = res.data['avatar'];
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
