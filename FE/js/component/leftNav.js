/**
 * 左导组件
 * @author  WhyCoder
 * @date    2017-02-06
 */
define(function (require, exports) {
    'use strict';

    var leftNavRender = require('text!../template/leftNav.tpl');

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
        watch: {
            '$route': function (to, from) {
                if (/^\/home/i.test(to.fullPath)) {
                    this.p = 0;
                }
                else if (/^\/info/i.test(to.fullPath)) {
                    this.p = 1;
                    this.rights['info'] == 1 ? this.isManager = true
                                             : this.isManager = false;
                }
                else if (/^\/course/i.test(to.fullPath)) {
                    this.p = 2;
                    this.rights['course'] == 1 ? this.isManager = true
                                               : this.isManager = false;                }
                else if (/^\/work/i.test(to.fullPath)) {
                    this.p = 3;
                    this.rights['work'] == 1 ? this.isManager = true
                                             : this.isManager = false;
                }
                else if (/^\/train/i.test(to.fullPath)) {
                    this.p = 4;
                    this.rights['train'] == 1 ? this.isManager = true
                                              : this.isManager = false;
                }
                else if (/^\/assessment/i.test(to.fullPath)) {
                    this.p = 5;
                    this.rights['assessment'] == 1 ? this.isManager = true
                                                   : this.isManager = false;
                }
                else if (/^\/comment/i.test(to.fullPath)) {
                    this.p = 6;
                    this.rights['comment'] == 1 ? this.isManager = true
                                                : this.isManager = false;
                }
                else if (/^\/user/i.test(to.fullPath)) {
                    this.p = 7;
                    this.rights['user'] == 1 ? this.isManager = true
                                             : this.isManager = false;
                }
                console.log(to);
                console.log(this.p);
            }
        },
        created: function () {
        },
        data: function () {
            return {
                p: this.page,
                isManager: false
            };
        },
        methods: {

        }
    };

    return leftNav;
});


