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
                    'self': true
                },
                formData: {
                    'name': '',
                    'self': '',
                    'age': 0
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
            }
        }
    }

    return insert;
});