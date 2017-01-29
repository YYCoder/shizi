/**
 * 注册登录页脚本
 * @author  WhyCoder
 * @date    2017-01-28
 */
define('login', function (require, exports) {
    var v = require('vue');
    window.Vue = v;
    var l = require('layer');
    var $ = require('jquery');

    var vmLogin = new Vue({
        el: '#wrap',
        data: {
            'show': true,
            'height': '647px'
        },
        methods: {
            'focused': function (e) {
                $(e.target).parent('.form-label').css({
                    'border': '1px solid #e0e0e0',
                    'box-shadow': '0 0 4px #eee',
                    'color': '#e0e0e0'
                });
            },
            'blured': function (e) {
                $(e.target).parent('.form-label')[0].style = '';
            },
            'toggle': function (e) {
            	var show = this['show'];
            	show = !show;
            	this['show'] = show;
            	this['height'] = show ? '647px' : '900px';
            }
        }
    });

    

});