// 全局require配置
require.config({
    paths: {
        'vue': './node_modules/vue/vue',
        'bootstrap': './node_modules/bootstrap/dist/js/bootstrap',
        'jquery': './FE/dep/jquery-2.2.0.min',
        'layer': './FE/dep/layer/layer',
        'moment': './node_modules/moment/moment'
    },
    shim: {
        'layer': {
            deps: ['jquery'],
            exports: 'layer'
        }
    }
});
