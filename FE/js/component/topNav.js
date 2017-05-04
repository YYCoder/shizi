/**
 * 顶导组件
 * @author  WhyCoder
 * @date    2017-02-06
 */
define(function (require, exports) {
    'use strict';

    var topNavRender = require('text!../template/topNav.tpl');

    var topNav = {
        template: topNavRender,
        props: {
            // 用户类型
            userType: {
                type: String,
                default: '0'
            },
            // 用户姓名
            userName: {
                type: String,
                default: ''
            },
            // 用户头像
            userAvatar: {
                type: String,
                default: ''
            },
            page: {
                type: Number,
                default: 0
            }
        },
        data: function () {
            return {
                width: 0,
                left: 0
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (/^\/home/i.test(to.fullPath)) {
                    vm.$root.page = 0;
                }
                else if (/^\/info/i.test(to.fullPath)) {
                    vm.$root.page = 1;
                }
                else if (/^\/course/i.test(to.fullPath)) {
                    vm.$root.page = 2;
                }
                else if (/^\/work/i.test(to.fullPath)) {
                    vm.$root.page = 3;
                }
                else if (/^\/train/i.test(to.fullPath)) {
                    vm.$root.page = 4;
                }
                else if (/^\/assessment/i.test(to.fullPath)) {
                    vm.$root.page = 5;
                }
                else if (/^\/comment/i.test(to.fullPath)) {
                    vm.$root.page = 6;
                }
                else if (/^\/user/i.test(to.fullPath)) {
                    vm.$root.page = 7;
                }
                vm.width = $('.item.active')[0].offsetWidth;
                vm.left = $('.item.active')[0].offsetLeft;
            });
        }
    };

    return topNav;
});


