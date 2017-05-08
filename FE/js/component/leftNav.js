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
            // 用户类型, type为2是超级管理员
            type: 0,
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
                if (vm.page === 1) {
                    vm.rights['info'] == 1 ? vm.isManager = true
                                           : vm.isManager = false;
                }
                else if (vm.page === 2) {
                    vm.rights['course'] == 1 ? vm.isManager = true
                                             : vm.isManager = false;
                }
                else if (vm.page === 3) {
                    vm.rights['work'] == 1 ? vm.isManager = true
                                           : vm.isManager = false;
                }
                else if (vm.page === 4) {
                    vm.rights['train'] == 1 ? vm.isManager = true
                                            : vm.isManager = false;
                }
                else if (vm.page === 5) {
                    vm.rights['assessment'] == 1 ? vm.isManager = true
                                                 : vm.isManager = false;
                }
                else if (vm.page === 6) {
                    vm.rights['comment'] == 1 ? vm.isManager = true
                                              : vm.isManager = false;
                }
                else if (vm.page === 7) {
                    vm.type == 2 ? vm.isManager = true
                                 : vm.isManager = false;
                }
            });
        },
        data: function () {
            return {
                isManager: false
            };
        }
    };

    return leftNav;
});


