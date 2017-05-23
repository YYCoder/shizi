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
        }
    };

    return leftNav;
});


