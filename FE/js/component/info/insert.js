/**
 * 档案录入组件
 * @author  WhyCoder
 * @date    2017-02-06
 */
define(function (require, exports) {
    'use strict'
    
    var render = require('text!../../template/info/insert.tpl');
    var ui = require('ui');

    var insert = {
        template: render,
        data: function () {
        	return {
        		curPage: 1,
        		requires: {
        			'name': true
        		},
        		formData: {
        			'name': ''
        		},
	    		disables: {
	    			'personal': true,
	    			'experience': true
	    		}
        	};
        },
        methods: {
        	'submit': function () {
        		ui.msgRight('提交成功');
        	}
        }
    }

    return insert;
});