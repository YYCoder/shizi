/**
 * 应用入口脚本
 * @author  WhyCoder
 * @date    2017-02-02
 */
define('home', function (require, exports) {
    'use strict'

    var Vue = require('vue');
    var $ = require('jquery');
    var ui = require('ui');
    // 组件模板
    var topNavRender = require('text!./js/template/topNav.tpl');
    // var leftNavRender = require('text!./js/template/leftNav.tpl');

    // 全局定义顶部导航组件
    Vue.component('topNav', {
        template: topNavRender,
        props: {
            // 用户的管理权限
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
                active: 0
            }
        },
        methods: {
            'changeP': function (p) {
                console.log(p);
                this.active = p;
                this.$emit('change-page', p);
            }
        }
    });

    // 全局定义左导航组件
    // Vue.component('leftNav', {
    // 	template: leftNavRender,
    // 	props: {

    // 	},
    // 	data: function () {
    // 		return {

    // 		};
    // 	},
    // 	methods: {
    		
    // 	}
    // });

    // 定义顶级VM对象
    var topVM = new Vue({
        el: '#app',
        data: {
            user: {
                type: window.user.type,
                rights: window.user.rights,
                avatar: window.user.avatar,
                name: window.user.name
            },
            currentPage: 0
        },
        methods: {
            'changePage': function (page) {
                this.currentPage = page;
                console.log('changePage: ' + page);
            }
        }

    });


});