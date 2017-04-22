/**
 * 审核申请组件
 * @author  Markey
 * @date    2017-04-22
 */
define(function (require, exports) {
	'use strict';
	var render = require('text!../../template/course/examine.tpl');
	var ui = require('ui');
	var pager = require('../common/pager');
	var util = require('util');

	var examine = {
		template: render,
		components: {
			'pager': pager
		},
		data() {
			return {
				// 这两个参数用于传递给pager组件
				curPage: 0,
				pageNumber: 0,
				// 请求用参数对象
				getParam: {
					// demand_time, time, new_time, week, new_week
					item: 'demand_time',
					// ASC, DESC
					type: 'ASC',
					// limit
					limit: 15,
					// where
					where: '',
					// 前往第几页
					page: 1
				},
				// 所有申请数据
				demandList: [],
				checkedAll: false,
				// 请求用的数据
				updateItems: {
					is_demand: 0,
					demand_time: 0,
					new_time: 0,
					new_week: 0,
					new_room: 0,
					uid: 0
				}
			};
		},
		created() {
			this.getData();
		},
		computed: {
			// 排序用flag
			demandDesc() {
				return this.getParam['item'] === 'demand_time' && this.getParam['type'] === 'DESC';
			},
			timeDesc() {
				return this.getParam['item'] === 'time' && this.getParam['type'] === 'DESC';
			},
			newTimeDesc() {
				return this.getParam['item'] === 'new_time' && this.getParam['type'] === 'DESC';
			},
			weekDesc() {
				return this.getParam['item'] === 'week' && this.getParam['type'] === 'DESC';
			},
			newWeekDesc() {
				return this.getParam['item'] === 'new_week' && this.getParam['type'] === 'DESC';
			}
		},
		methods: {
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
			// 把time或new_time转为1,2...
			encode_time(str) {
				var timeObj = {
					'第一二节': 1,
					'第三四节': 2,
					'第五六节': 3,
					'第七八节': 4,
					'第九十节': 5
				};
				return timeObj[str];
			},
			// 把week或new_week转为1,2...
			encode_week(str) {
				var weekObj = {
					'周一': 1,
					'周二': 2,
					'周三': 3,
					'周四': 4,
					'周五': 5,
					'周六': 6,
					'周日': 7
				};
				return weekObj[str];
			},
			checkAll() {
				this.checkedAll = !this.checkedAll;
				this.demandList.forEach((elem) => {
					elem.checked = this.checkedAll;
				});
			},
			agreeAll() {
				var vm = this,
						items = [];
				vm.demandList.forEach((elem) => {
					if (elem['checked']) {
						items.push($.extend({
							id: elem.id,
							time: vm.encode_time(elem['new_time']),
							week: vm.encode_week(elem['new_week']),
							room: elem['new_room']
						}, vm.updateItems));
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
								url: location.origin + '/index.php/course/agree_items',
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
				    param = util['deepClone'](vm.updateItems);
				param['id'] = id;
				ui.info({
					msg: '确定要驳回吗',
					yes: function () {
						$.ajax({
							url: location.origin + '/index.php/course/update',
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
				    param = util['deepClone'](vm.updateItems),
				    demands = vm.demandList.filter((el) => el.id == id);
				param['id'] = demands[0]['id'];
				param['time'] = vm.encode_time(demands[0]['new_time']);
				param['week'] = vm.encode_week(demands[0]['new_week']);
				param['room'] = demands[0]['new_room'];
				ui.info({
					msg: '确定要通过吗',
					yes: function () {
						$.ajax({
							url: location.origin + '/index.php/course/update',
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
				vm.demandList.forEach((elem) => {
					if (elem['checked']) {
						items.push($.extend({id: elem.id}, vm.updateItems));
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
								url: location.origin + '/index.php/course/deny_items',
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
					url: location.origin + '/index.php/course/get_all_demand',
					data: this.getParam,
					dataType: 'json',
					type: 'get'
				}).done((res) => {
					ui.closeAll('loading');
					if (res.code == 0) {
						res.data['data'].forEach((el) => {
							el.checked = false;
						});
						this.demandList = res.data['data'];
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

	return examine;

});
