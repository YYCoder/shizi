/**
 * 全部排课组件
 * @author  Markey
 * @date    2017-04-21
 */
define(function (require, exports) {
	'use strict';

	var render = require('text!../../template/course/allClass.tpl');
	var ui = require('ui');
	var pager = require('../common/pager');
	var drop = require('../common/drop');
	var layer = require('layer');

	var allClass = {
		template: render,
		components: {
			'pager': pager,
			'drop': drop
		},
		data: function () {
			return {
				// 这两个参数用于传递给pager组件
				curPage: 0,
				pageNumber: 0,
				// 请求用的参数
				getParam: {
					// tid, start, end
					item: 'tid',
					// ASC, DESC
					type: 'ASC',
					// limit
					limit: 15,
					// where
					where: '',
					// 前往第几页
					page: 1
				},
				// 下拉菜单组件用的数据
				drop: {
					'classTimeName': '选择第几节上课',
					'classTime': [
						{
							value: '1',
							name: '一二节'
						},
						{
							value: '2',
							name: '三四节'
						},
						{
							value: '3',
							name: '五六节'
						},
						{
							value: '4',
							name: '七八节'
						},
						{
							value: '5',
							name: '九十节'
						}
					],
					'classWeekName': '选择周几上课',
					'classWeek': [
						{
							value: '1',
							name: '周一'
						},
						{
							value: '2',
							name: '周二'
						},
						{
							value: '3',
							name: '周三'
						},
						{
							value: '4',
							name: '周四'
						},
						{
							value: '5',
							name: '周五'
						},
						{
							value: '6',
							name: '周六'
						},
						{
							value: '7',
							name: '周日'
						},
					]
				},
				// 点击修改的数据绑定
				update: {
					id: '',
					start: '',
					end: '',
					time: '',
					week: '',
					room: ''
				},
				// 全选flag
				checkedAll: false,
				list: []
			}
		},
		created() {
			this.getData();
		},
		computed: {
			tidDesc() {
				return this.getParam['item'] === 'tid' && this.getParam['type'] === 'DESC';
			},
			startDesc() {
				return this.getParam['item'] === 'start' && this.getParam['type'] === 'DESC';
			},
			endDesc() {
				return this.getParam['item'] === 'end' && this.getParam['type'] === 'DESC';
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
			pageChange(p) {
				this.getParam['page'] = p;
				this.getData();
			},
			deleteAll() {
				var vm = this,
						ids = [];
				vm.list.forEach((elem) => {
					if (elem['checked']) {
						ids.push(elem['id']);
					}
				});
				if (ids.length === 0) {
					ui.msgError('请先选择要删除的数据');
				}
				else {
					ui.info({
						msg: '确定要删除选中的数据吗',
						yes: function () {
							$.ajax({
								url: location.origin + '/index.php/course/delete_mult',
								data: {ids: ids},
								dataType: 'json',
								type: 'post'
							})
							.done((res) => {
								if (res.code == 0) {
									vm.getData();
									ui.msgRight('删除成功');
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
			checkAll() {
				this.checkedAll = !this.checkedAll;
				this.list.forEach((elem) => {
					elem.checked = this.checkedAll;
				});
			},
			deleteItem(id) {
				var vm = this;
				ui.info({
					msg: '确定要删除吗',
					yes: function () {
						$.ajax({
							url: location.origin + '/index.php/course/delete_class',
							data: {id: id},
							dataType: 'json',
							type: 'post'
						})
						.done((res) => {
							if (res.code == 0) {
								vm.getData();
								ui.msgRight('删除成功');
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
			updateItem(id) {
				var vm = this;
				// 将现有数据显示到弹层中
				this.list.forEach((elem) => {
					if (elem.id == id) {
						this.update.id = id;
						this.update.start = elem.start;
						this.update.end = elem.end;
						this.update.room = elem.room;
					}
				});
				layer.open({
					type: 1,
					area: '420px',
					title: false,
					content: $('.update-content'),
					cancel: function () {
						vm.update.id = '';
						vm.updateReset();
					}
				});
			},
			getData() {
				ui.loading();
				$.ajax({
					url: location.origin + '/index.php/course/get_all_class',
					data: this.getParam,
					dataType: 'json',
					type: 'get'
				}).done((res) => {
					// console.log(res);
					ui.closeAll('loading');
					if (res.code == 0) {
						res.data['data'].forEach((elem) => {
							elem.checked = false;
						});
						this.list = res.data['data'];
						this.pageNumber = +res.data['page']['page_count'];
						this.curPage = +res.data['page']['current_page'];
					}
					else {
						ui.msgError('未获取到数据');
					}
				}).fail((res) => {
					ui.closeAll('loading');
					ui.msgError(res.msg);
				});
			},
			// 下拉组件点击触发的函数
			weekClick(item) {
				this.update.week = item.value;
			},
			timeClick(item) {
				this.update.time = item.value;
			},
			// 修改数据弹层点击提交或重置函数
			updateSubmit() {
				var param = {},
						update = this.update;
				ui.loading();
				// 请求用要修改的字段
				for(var k in update) {
					if (update[k] !== '') {
						param[k] = update[k];
					}
				}
				$.ajax({
					url: location.origin + '/index.php/course/update',
					data: param,
					type: 'post'
				}).done((res) => {
					if (res.code == 0) {
						ui.closeAll();
						ui.msgRight('修改成功');
						this.update.id = '';
						this.updateReset();
						// 更新页面数据
						this.getData();
					}
					else {
						ui.closeAll('loading');
						ui.msgError(res.msg);
					}
				}).fail((res) => {
					ui.closeAll('loading');
					ui.msgError(res.msg);
				});
			},
			updateReset() {
				var update = this.update;
				for(var k in update) {
					if (k != 'id') {
						update[k] = '';
					}
				}
			}
		}
	}

	return allClass;

});
