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
    var util = require('util');

    var update = {
      template: render,
      components: {
      	'insert': insert
      },
      data: function () {
      	return {
      		info: {},
      		tid: ''
      	}
      },
      created: function () {
      	this.getInfo();
      },
      methods: {
      	// 获取用户的档案, 修改info, 同时响应到insert组件中
      	'getInfo': function () {
      		var vm = this;
      		ui.loading();
      		$.ajax({
      			url: location.origin + '/index.php/info/get_info',
      			dataType: 'json',
      			type: 'get'
      		}).then(function (res) {
      			// console.log(res.data['data']);
      			// 处理数据, 将它们变成insert组件的格式
      			var info = res.data['data'];
      			for (var k in info) {
      				if (k === 'postcode' || k === 'marriage') {
      					info[k] = parseInt(info[k]);
      				}
      				else if (k === 'teach_year' || k === 'id_code') {
      					info[util.toCamel(k)] = (k === 'teach_year' ? parseInt(info[k])
      																											: info[k] === '0' ? '' : info[k]);
      					delete info[k];
      				}
      				else if (k === 'self_descp') {
      					info['self'] = info[k];
      					delete info[k];
      				}
      				else if (k === 'salary') {
      					info[k] = parseFloat(info[k]);
      				}
      				else if (k === 'mid') {
      					info['major'] = info[k] === '0' ? '' : info[k];
      					delete info[k];
      				}
      				else if (k === 'entry_time') {
      					info['entry'] = info[k];
      					delete info[k];
      				}
      				else if (k === 'birthday') {
      					info[k] = info[k] === '0' ? '' : info[k];
      				}
      				else if (/^exp.+/g.test(k)) {
      					delete info[k];
      				}
      			}
      			// 懒得再处理exp了, 转来转去太麻烦, 干脆不要了....
      			info['exps'] = [
      				{
                'expCollege': '',
                'expStart': '',
                'expEnd': '',
                'expDescp': ''
              }
      			]
      			delete info['is_gag'];
      			vm.info = res.data['data'];
      			vm.tid = res.data['data']['id'];
      			delete info['id'];
      			ui.closeAll('loading');
      		}, function (res) {
      			ui.closeAll('loading');
      			ui.msgError(res.msg);
      		});
      	}
      }
    }

    return update;
});
