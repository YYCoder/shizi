/**
 * 查看考核组件
 * @author  Markey
 * @date    2017-04-26
 */
define(function (require, exports) {
	'use strict';
	const render = require('text!../../template/assess/check.tpl');
	const ui = require('ui');
	const util = require('util');
	const drop = require('../common/drop');

	const check = {
		template: render,
		data() {
			return {
				data: {},
				user: window.user
			}
		},
		created() {
			this.getData();
		},
		methods: {
			getData() {
				ui.loading();
				$.ajax({
					url: `${location.origin}/index.php/assessment/get_own_data`,
					type: 'get'
				}).done(res => {
					ui.closeAll('loading');
					if (res.code == 0) {
						this.data = res.data;
					}
					else {
						ui.msgError(res.msg);
					}
				}).fail(res => {
					ui.closeAll('loading');
					ui.msgError(res.msg);
				});
			},
			download() {
				ui.loading();
				$.ajax({
					url: `${location.origin}/index.php/assessment/download`,
					type: 'get'
				}).done(res => {
					ui.closeAll('loading');
					location.href = res.data.url;
				}).fail(res => {
					ui.closeAll('loading');
					ui.msgError(res.msg);
				});
			}
		}
	};

	return check;

});
