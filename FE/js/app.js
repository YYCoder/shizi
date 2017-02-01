'use strict'
// 全局require配置
require.config({
    baseUrl: './FE',
    paths: {
        'vue': './dep/vue/dist/vue',
        'bootstrap': './dep/bootstrap/dist/js/bootstrap',
        'jquery': './dep/jquery-2.2.0.min',
        'layer': './dep/layer/layer',
        'moment': './dep/moment/moment',
        
        'util': './common/util',
        'ui': './common/ui'
    },
    shim: {
        'layer': {
            deps: ['jquery'],
            exports: 'layer'
        }
    }
});

// 应用入口模块
define(function (require, exports) {
    require('login');
});