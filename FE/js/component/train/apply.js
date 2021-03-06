/**
 * 我的申请组件
 * @author  Markey
 * @date    2017-04-23
 */
define(function (require, exports) {
	'use strict';
	var render = require('text!../../template/train/apply.tpl');
	var ui = require('ui');
	var pager = require('../common/pager');

	var myApply = {
		template: render,
		components: {
			'pager': pager
		},
		data() {
			return {
				list: [],
				// 分页用的数据
				pageNumber: 0,
				curPage: 0,
				getParam: {
					type: 'ASC',
					item: 'begin_time',
					page: 1,
					limit: 15
				}
			}
		},
		computed: {
			timeDesc() {
				return this.getParam['item'] === 'begin_time' && this.getParam['type'] === 'DESC';
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
					data: this.getParam,
					type: 'get'
				}).done((res) => {
					ui.closeAll('loading');
					if (res.code == 0) {
						this.list = res.data['data'];
						this.pageNumber = +res.data['page']['page_count'];
						this.curPage = +res.data['page']['current_page'];
					}
					else {
						ui.msgError('获取数据失败');
					}
				}).fail((res) => {
					ui.closeAll('loading');
					ui.msgError(res.msg);
				});
			},
			pageChange(p) {
				this.getParam.page = p;
				this.getData();
			},
			sort(item) {
				// 首次尝试ES6的let声明哈 ~
				let type = this.getParam.type,
						param = this.getParam;
				param.item = item;
				type === 'ASC' ? param.type = 'DESC' : param.type = 'ASC';
				this.getData();
			},
			cancel(id) {
				let vm = this;
				for(var v of vm.list) {
					if (v.id == id && v.state == '用户撤销') {
						ui.msgError('您已经撤销过啦');
						return;
					}
				}
				ui.info({
					msg: '确定要撤销申请吗',
					yes() {
						ui.loading();
						$.ajax({
							url: location.origin + '/index.php/train/update_item',
							data: {
								// ES6新语法, 变量名可以直接用到对象字面量中
								id,
								state: 3
							},
							type: 'post'
						}).then((res) => {
							ui.closeAll('loading');
							if (res.code == 0) {
								ui.msgRight('撤销成功');
								vm.getData();
							}
							else {
								ui.msgError(res.msg);
							}
						}, (res) => {
							ui.closeAll('loading');
							ui.msgError(res.msg);
						});
					}
				});
			}
		}
	};

	return myApply;

});




