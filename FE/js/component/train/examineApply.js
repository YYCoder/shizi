/**
 * 审核申请组件
 * @author  Markey
 * @date    2017-04-25
 */
define(function (require, exports) {
	'use strict';
	let render = require('text!../../template/train/examineApply.tpl');
	let ui = require('ui');
	let pager = require('../common/pager');
	let drop = require('../common/drop');

	let examineApply = {
		template: render,
		components: {
			'pager': pager,
			'drop': drop
		},
		data() {
			return {
				// 这两个参数用于传递给pager组件
				curPage: 0,
				pageNumber: 0,
				// 请求用参数对象
				getParam: {
					// begin_time, price
					item: 'begin_time',
					// ASC, DESC
					type: 'ASC',
					// limit
					limit: 15,
					// where可以是老师姓名,审核状态
					where: {
						state: '',
						name: ''
					},
					// 前往第几页
					page: 1
				},
				// 所有申请数据
				list: [],
				checkedAll: false,
				// 下拉菜单用数据
				drop: {
					name: '审核状态',
					items: [
						{
							name: '无',
							value: ''
						},
						{
							name: '未审核',
							value: 0
						},
						{
							name: '审核通过',
							value: 1
						},
						{
							name: '审核未通过',
							value: 2
						},
						{
							name: '用户撤销',
							value: 3
						},
						{
							name: '超过有效时长',
							value: 4
						},
					]
				}
			};
		},
		created() {
			this.getData();
		},
		computed: {
			// 排序用flag
			timeDesc() {
				return this.getParam['item'] === 'begin_time' && this.getParam['type'] === 'DESC';
			},
			priceDesc() {
				return this.getParam['item'] === 'price' && this.getParam['type'] === 'DESC';
			}
		},
		methods: {
			dropClick(item) {
				this.getParam.where.state = item.value;
				this.getData();
			},
			sort(item) {
				if (item === this.getParam['item']) {
					this.getParam['type'] === 'ASC' ? this.getParam['type'] = 'DESC' : this.getParam['type'] = 'ASC';
				}
				else {
					this.getParam['item'] = item;
					this.getParam['type'] = 'ASC';
				}
				this.getData();
			},
			checkAll() {
				this.checkedAll = !this.checkedAll;
				this.list.forEach((elem) => {
					elem.checked = this.checkedAll;
				});
			},
			agreeAll() {
				var vm = this,
						items = [];
				vm.list.forEach((elem) => {
					if (elem['checked']) {
						items.push({
							id: elem.id,
							state: 1
						});
					}
				});
				if (items.length === 0) {
					ui.msgError('请先选择要通过的申请');
				}
				else {
					ui.info({
						msg: '确定要通过所有选中的申请吗',
						yes: function () {
							$.ajax({
								url: location.origin + '/index.php/train/update_items',
								data: {data: items},
								dataType: 'json',
								type: 'post'
							})
							.done((res) => {
								if (res.code == 0) {
									vm.getData();
									ui.msgRight('全部通过成功');
								}
								else {
									ui.msgError(res.msg);
								}
							})
							.fail((res) => {
								ui.msgError(res.msg);
							});
						}
					});
				}
			},
			denyItem(id) {
				var vm = this,
				    param = {};
				param['id'] = id;
				param['state'] = 2;
				ui.info({
					msg: '确定要驳回吗',
					yes() {
						$.ajax({
							url: location.origin + '/index.php/train/update_item',
							data: param,
							dataType: 'json',
							type: 'post'
						})
						.done((res) => {
							if (res.code == 0) {
								vm.getData();
								ui.msgRight('驳回成功');
							}
							else {
								ui.msgError(res.msg);
							}
						})
						.fail((res) => {
							ui.msgError(res.msg);
						});
					}
				});
			},
			agreeItem(id) {
				var vm = this,
				    param = {};
				param['id'] = id;
				param['state'] = 1;
				ui.info({
					msg: '确定要通过吗',
					yes() {
						$.ajax({
							url: location.origin + '/index.php/train/update_item',
							data: param,
							dataType: 'json',
							type: 'post'
						})
						.done((res) => {
							if (res.code == 0) {
								vm.getData();
								ui.msgRight('通过成功');
							}
							else {
								ui.msgError(res.msg);
							}
						})
						.fail((res) => {
							ui.msgError(res.msg);
						});
					}
				});
			},
			denyAll() {
				var vm = this,
				    items = [];
				vm.list.forEach((elem) => {
					if (elem['checked']) {
						items.push({
							id: elem.id,
							state: 2
						});
					}
				});
				if (items.length === 0) {
					ui.msgError('请先选择要驳回的数据');
				}
				else {
					ui.info({
						msg: '确定要驳回所有选中的申请吗',
						yes: function () {
							$.ajax({
								url: location.origin + '/index.php/train/update_items',
								data: {data: items},
								dataType: 'json',
								type: 'post'
							})
							.done((res) => {
								if (res.code == 0) {
									vm.getData();
									ui.msgRight('全部驳回成功');
								}
								else {
									ui.msgError(res.msg);
								}
							})
							.fail((res) => {
								ui.msgError(res.msg);
							});
						}
					});
				}
			},
			getData() {
				ui.loading();
				$.ajax({
					url: location.origin + '/index.php/train/get_all_demand',
					data: this.getParam,
					dataType: 'json',
					type: 'get'
				}).done((res) => {
					ui.closeAll('loading');
					if (res.code == 0) {
						res.data['data'].forEach((el) => {
							el.checked = false;
						});
						this.list = res.data['data'];
						this.curPage = +res.data['page']['current_page'];
						this.pageNumber = +res.data['page']['page_count'];
					}
					else {
						ui.msgError(res.msg);
					}
				}).fail((res) => {
					ui.closeAll('loading');
					ui.msgError(res.msg);
				});
			},
			pageChange(p) {
				this.getParam['page'] = p;
				this.getData();
			}
		}
	};

	return examineApply;

});
