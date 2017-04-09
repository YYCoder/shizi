/**
 * 完善信息组件(复用档案录入组件)
 * @author  Markey
 * @date    2017-04-08
 */
define(function (require, exports) {
    'use strict';

    var render = require('text!../../template/info/update.tpl');
    var ui = require('ui');
    var insert = require('./insert');

    var update = {
        template: render,
        components: {
        	'insert': insert
        },
        data: function () {
        	return {
        		info: {}
        	}
        },
        created: function () {
        	this.getInfo();
        },
        methods: {
        	// 获取用户的档案, 修改info, 同时响应到insert组件中
        	'getInfo': function () {
        		var vm = this;
        		$.ajax({
        			url: location.origin + '/index.php/info/get_info',
        			dataType: 'json',
        			type: 'get'
        		}).then(function (res) {
        			console.log(res.data['data']);
        			vm.info = res.data['data'];
        		}, function (res) {
        			ui.msgError(res.msg);
        		});
        	}
        }
    }

    return update;
});
