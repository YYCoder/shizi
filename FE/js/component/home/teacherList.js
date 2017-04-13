/**
 * 老师列表组件
 * @author  Markey
 * @date    2017-04-13
 */
define(function (require, exports) {
    'use strict';

    var render = require('text!../../template/home/teacherList.tpl');
    var infoList = require('../info/infoList');

    var teacherList = {
        template: render,
        components: {
        	'infoList': infoList
        },
        data: function () {
        	return {
        		isHome: true
        	}
        },
        methods: {

        }
    }

    return teacherList;
});
