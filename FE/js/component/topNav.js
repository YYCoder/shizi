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
            }
        },
        data: function () {
            return {
            }
        },
        methods: {

        }
    };

    return topNav;
});


