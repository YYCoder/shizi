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
                        },
                        children: [
                            {
                                path: ':id'
                            }
                        ]
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
                    },
                    {
                        path: 'infoList',
                        components: {
                            'infoList': main.components.infoList
                        }
                    }
                ]
            },
            {
                path: '/course',
                components: {
                    'leftNav': leftNav,
                    'main': main
                },
                children: [
                    {
                        path: '',
                        components: {
                            'class': main.components.class
                        }
                    },
                    {
                        path: 'class',
                        components: {
                            'class': main.components.class
                        }
                    },
                    {
                        path: 'insert',
                        components: {
                            'insertClass': main.components.insertClass
                        }
                    },
                    {
                        path: 'allClass',
                        components: {
                            'allClass': main.components.allClass
                        }
                    },
                    {
                        path: 'demand',
                        components: {
                            'courseDemand': main.components.courseDemand
                        }
                    },
                    {
                        path: 'examine',
                        components: {
                            'courseExamine': main.components.courseExamine
                        }
                    }
                ]
            },
            {
                path: '/train',
                components: {
                    'leftNav': leftNav,
                    'main': main
                },
                children: [
                    {
                        path: '',
                        components: {
                            'trainDemand': main.components.trainDemand
                        }
                    },
                    {
                        path: 'demand',
                        components: {
                            'trainDemand': main.components.trainDemand
                        }
                    },
                    {
                        path: 'apply',
                        components: {
                            'trainApply': main.components.trainApply
                        }
                    }
                ]
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
            // 为了开发,先写死课程管理权限
            this.user.rights['course'] = 1;
            this.checkInfo();
        },
        router: router,
        data: {
            user: {
                type: window.user.type,
                rights: window.user.rights,
                avatar: window.user.avatar,
                name: window.user.name,
                id: window.user.id
            },
            page: 0
        },
        methods: {
            // 检查用户的档案是否完整, 不完整提示前往档案管理完善
            'checkInfo': function () {
                $.ajax({
                    url: location.origin + '/index.php/check_info',
                    dataType: 'json',
                    type: 'get'
                }).done(function (res) {
                    if (res.data.status == 0) {
                        ui.info({
                            title : '嘿 !',
                            msg: '您的档案不完整',
                            btn: ['前往完善', '下次再说'],
                            yes: function () {
                                console.log('点击确定');
                                router.push('/info/update');
                            }
                        });
                    }
                }).fail(function (res) {
                    ui.msgError(res.msg);
                });
            }
        }

    });

});
