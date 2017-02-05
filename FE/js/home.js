/**
 * 应用入口脚本
 * @author  WhyCoder
 * @date    2017-02-02
 */
define('home', function (require, exports) {
    'use strict'

    var Vue = require('vue');
    var VueRouter = require('vue-router');
    var $ = require('jquery');
    var ui = require('ui');
    // 组件js
    var topNav = require('./js/component/topNav');
    var leftNav = require('./js/component/leftNav');
    var main = require('./js/component/main');

    // 开启路由
    Vue.use(VueRouter);
    // 定义vue路由
    var router = new VueRouter({
        // 配置根路径
        base: '/index.php/',
        // <router-link>组件激活时的class
        linkActiveClass: 'active',
        // 使用H5 history API模式
        mode: 'history',
        routers: [
            {
                path: '/home',
                name: 'home',
                components: {
                    'leftNav': leftNav,
                    'main': main
                }
            },
            {
                path: '/info',
                name: 'info',
                components: {
                    'leftNav': leftNav,
                    'main': main
                }
                
            },
            {
                path: '/course',
                name: 'course',
                components: {
                    'leftNav': leftNav,
                    'main': main
                }
                
            },
            {
                path: '/work',
                name: 'work',
                components: {
                    'leftNav': leftNav,
                    'main': main
                }
                
            }
        ]
    });


    // 定义顶级VM对象
    var topVM = new Vue({
        el: '#app',
        components: {
            'leftNav': leftNav,
            'topNav': topNav,
            'mainContent': main
        },
        router: router,
        data: {
            user: {
                type: window.user.type,
                rights: window.user.rights,
                avatar: window.user.avatar,
                name: window.user.name
            },
            currentPage: 0,
            isManager: false
        },
        methods: {
            'changePage': function (page) {
                var rights = this.user.rights;
                this.currentPage = page;
                console.log('changePage: ' + page);
                switch (this.currentPage) {
                    case 1: this.isManager = rights['info'] === '1'
                                           ? true : false;
                    break;
                    case 2: this.isManager = rights['course'] === '1'
                                           ? true : false;
                    break;
                    case 3: this.isManager = rights['work'] === '1'
                                           ? true : false;
                    break;
                    case 4: this.isManager = rights['train'] === '1'
                                           ? true : false;
                    break;
                    case 5: this.isManager = rights['assessment'] === '1'
                                           ? true : false;
                    break;
                    case 6: this.isManager = rights['comment'] === '1'
                                           ? true : false;
                    break;
                    case 7: this.isManager = this.user.type === '2'
                                           ? true : false;
                    break;
                }
            }
        }

    });


});