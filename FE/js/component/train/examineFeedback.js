/**
 * 审核反馈组件
 * @author  Markey
 * @date    2017-04-25
 */
define(function (require, exports) {
	'use strict';
	let render = require('text!../../template/train/examineFeedback.tpl');
	let ui = require('ui');
	let drop = require('../common/drop');
	let pager = require('../common/pager');
	let lazyloadImage = require('lazyLoadImage');

	let examineFeedback = {
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
					item: 'end_time',
					// ASC, DESC
					type: 'ASC',
					// limit
					limit: 15,
					// where可以是老师姓名(like),培训名称(like),审核状态,培训类型
					where: {
						state: '',
						like: '',
						type: ''
					},
					// 前往第几页
					page: 1
				},
				// 懒加载flag, 防止每次更新都懒加载
				hasLazyLoaded: false,
				// 所有反馈数据
				list: [],
				checkedAll: false,
				// 下拉菜单用数据
				drop: {
					stateName: '审核状态',
					stateItems: [
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
					],
					typeName: '培训类型',
					typeItems: [
						{
							name: '无',
							value: ''
						},
						{
							name: '岗前培训',
							value: 0
						},
						{
							name: '教育技术培训',
							value: 1
						},
						{
							name: '教学发展基地研修',
							value: 2
						},
						{
							name: '青年教师教学能力培训',
							value: 3
						},
						{
							name: '外语培训',
							value: 4
						},
						{
							name: '科研能力与师德培训',
							value: 5
						},
						{
							name: '管理干部培训',
							value: 6
						}
					]
				}
			};
		},
		created() {
			this.getData();
		},
		updated() {
			lazyloadImage.init();
			lazyloadImage.reload();
		},
		computed: {
			// 排序用flag
			timeDesc() {
				return this.getParam['item'] === 'end_time' && this.getParam['type'] === 'DESC';
			},
			priceDesc() {
				return this.getParam['item'] === 'price' && this.getParam['type'] === 'DESC';
			}
		},
		methods: {
			stateClick(item) {
				this.getParam.where.state = item.value;
				this.getData();
			},
			typeClick(item) {
				this.getParam.where.type = item.value;
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
					ui.msgError('请先选择要通过的反馈');
				}
				else {
					ui.info({
						msg: '确定要通过所有选中的反馈吗',
						yes: function () {
							$.ajax({
								url: location.origin + '/index.php/train/update_feedback_items',
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
							url: location.origin + '/index.php/train/update_feedback_item',
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
							url: location.origin + '/index.php/train/update_feedback_item',
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
					ui.msgError('请先选择要驳回的反馈');
				}
				else {
					ui.info({
						msg: '确定要驳回所有选中的反馈吗',
						yes: function () {
							$.ajax({
								url: location.origin + '/index.php/train/update_feedback_items',
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
					url: location.origin + '/index.php/train/get_all_feedback',
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
			},
			// 查看大图, url(图片url), type(1证书, 2发票), teacher(老师名)
			checkImg(url, type, teacher) {
				layer.photos({
			    photos: {
			    	title: type == 1 ? '毕业/结业证书' : '发票证明',
			    	id: Math.random()*10,
			    	start: 0,
			    	data: [{
			    		// 头一次尝试ES6模板字符串哈 ~
			    		alt: type == 1 ? `${teacher}的毕业/结业证书` : `${teacher}的发票证明`,
			    		pid: Math.random()*10,
			    		src: url
			    	}]
			    },
			    anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
			  });
			}
		}
	};

	return examineFeedback;

});
