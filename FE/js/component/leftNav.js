/**
 * 左导组件
 * @author  WhyCoder
 * @date    2017-02-06
 */
define(function (require, exports) {
    'use strict';

    var leftNavRender = require('text!../template/leftNav.tpl');
    var cookie = require('cookie');
    var leftNav = {
        template: leftNavRender,
        props: {
            // 用户的权限
            rights: {
                type: Object,
                default: function () {
                    return {
                        'info': '0',
                        'course': '0',
                        'work': '0',
                        'train': '0',
                        'assessment': '0',
                        'comment': '0'
                    }
                }
            },
            // 当前所在定导选项
            page: {
                type: Number,
                default: 0
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (/^\/home/i.test(to.fullPath)) {
                    vm.p = 0;
                }
                else if (/^\/info/i.test(to.fullPath)) {
                    vm.p = 1;
                    vm.rights['info'] == 1 ? vm.isManager = true
                                           : vm.isManager = false;
                }
                else if (/^\/course/i.test(to.fullPath)) {
                    vm.p = 2;
                    vm.rights['course'] == 1 ? vm.isManager = true
                                           : vm.isManager = false;
                }
                else if (/^\/work/i.test(to.fullPath)) {
                    vm.p = 3;
                    vm.rights['work'] == 1 ? vm.isManager = true
                                           : vm.isManager = false;
                }
                else if (/^\/train/i.test(to.fullPath)) {
                    vm.p = 4;
                    vm.rights['train'] == 1 ? vm.isManager = true
                                           : vm.isManager = false;
                }
                else if (/^\/assessment/i.test(to.fullPath)) {
                    vm.p = 5;
                    vm.rights['assessment'] == 1 ? vm.isManager = true
                                               : vm.isManager = false;
                }
                else if (/^\/comment/i.test(to.fullPath)) {
                    vm.p = 6;
                    vm.rights['comment'] == 1 ? vm.isManager = true
                                           : vm.isManager = false;
                }
                else if (/^\/user/i.test(to.fullPath)) {
                    vm.p = 7;
                    vm.rights['user'] == 1 ? vm.isManager = true
                                           : vm.isManager = false;
                }
            });
        },
        data: function () {
            return {
                p: this.page,
                isManager: false
            };
        }
    };

    return leftNav;
});


