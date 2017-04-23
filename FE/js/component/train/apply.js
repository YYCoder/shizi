/**
 * 我的申请组件
 * @author  Markey
 * @date    2017-04-23
 */
define(function (require, exports) {
	'use strict';
	var render = require('text!../../template/train/apply.tpl');
	var ui = require('ui');

	var myApply = {
		template: render,
		data() {
			return {
				list: []
			}
		},
		computed: {
			timeDesc() {
				return false;
			}
		},
		created() {
			this.getData();
		},
		methods: {
			getData() {
				ui.loading();
				$.ajax({
					url: location.origin + '/index.php/train/get_my_apply',
					type: 'get'
				}).done((res) => {
					ui.closeAll('loading');
					if (res.code == 0) {
						this.list = res.data['data'];
					}
					else {
						ui.msgError('获取数据失败');
					}
				}).fail((res) => {
					ui.closeAll('loading');
					ui.msgError(res.msg);
				});
			}
		}
	};

	return myApply;

});




