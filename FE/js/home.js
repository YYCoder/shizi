/**
 * 应用入口脚本
 * @author  WhyCoder
 * @date    2017-02-02
 */
define('home', function (require, exports) {
    'use strict';

    var Vue = require('vue');
    var VueRouter = require('vue-router');
    var $ = require('jquery');
    var ui = require('ui');
    var cookie = require('cookie');
    // 主要组件js
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
        routes: [
            {
                path: '/home',
                components: {
                    'leftNav': leftNav,
                    'main': main
                },
                children: [
                    {
                        path: '',
                        components: {
                            'teacherList': main.components.list
                        }
                    },
                    {
                        path: 'list',
                        components: {
                            'teacherList': main.components.list
                        }
                    },
                    {
                        path: 'detail',
                        components: {
                            'teacherDetail': main.components.detail
                        }
                    }
                ]
            },
            {
                path: '/info',
                components: {
                    'leftNav': leftNav,
                    'main': main
                },
                children: [
                    {
                        path: '',
                        components: {
                            'update': main.components.update
                        }
                    },
                    {
                        path: 'update',
                        components: {
                            'update': main.components.update
                        }
                    },
                    {
                        path: 'insert',
                        components: {
                            'insert': main.components.insert
                        }
                    }
                ]
            },
            // {
            //     path: '/course',
            //     components: {
            //         'leftNav': leftNav,
            //         'main': main
            //     },
            //     children: [
            //         {
            //             path: '',
            //             components: {
            //                 'info1': main.components.info1
            //             }
            //         },
            //         {
            //             path: 'info1',
            //             components: {
            //                 'info1': main.components.info1
            //             }
            //         },
            //         {
            //             path: 'info2',
            //             components: {
            //                 'info2': main.components.info2
            //             }
            //         }
            //     ]
            // }
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
        created: function () {
            var route = this.$route;
            var height = window.innerHeight - 60;
            $('section').height(height);
            if (/^\/home/i.test(route.fullPath)) {
                this.page = 0;
            }
            else if (/^\/info/i.test(route.fullPath)) {
                this.page = 1;
            }
            else if (/^\/course/i.test(route.fullPath)) {
                this.page = 2;
            }
            else if (/^\/work/i.test(route.fullPath)) {
                this.page = 3;
            }
            else if (/^\/train/i.test(route.fullPath)) {
                this.page = 4;
            }
            else if (/^\/assessment/i.test(route.fullPath)) {
                this.page = 5;
            }
            else if (/^\/comment/i.test(route.fullPath)) {
                this.page = 6;
            }
            else if (/^\/user/i.test(route.fullPath)) {
                this.page = 7;
            }
            // 为了开发,先写死档案管理权限
            this.user.rights['info'] = 1;
        },
        router: router,
        data: {
            user: {
                type: window.user.type,
                rights: window.user.rights,
                avatar: window.user.avatar,
                name: window.user.name
            },
            page: 0
        },
        methods: {

        }

    });

});
