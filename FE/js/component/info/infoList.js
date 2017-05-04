/**
 * 全部档案组件
 * @date    2017-04-10
 * @author  Markey
 */
define(function (require, exports) {
	'use strict';

	var render = require('text!../../template/info/infoList.tpl');
	var pager = require('../common/pager');
	var lazyLoadImage = require('../../../common/lazyLoadImage');
	var ui = require('ui');

	var infoList = {
		template: render,
		components: {
			'pager': pager
		},
		data: function () {
			return {
				itemShow: false,
				typeShow: false,
				// 这两个参数用于传递给pager组件
				curPage: 0,
				pageNumber: 0,
				// 查询参数对象
				getParam: {
					// code, age, entry
					sortItem: 'code',
					// ASC, DESC
					sortType: 'ASC',
					// limit
					limit: 10,
					// where
					where: '',
					// 前往第几页
					page: 1
				},
				// 全选flag
				checkedAll: false,
				// 重新加载数据绑定并更新DOM flag
				ready: true,
				list: []
			}
		},
		props: {
			'isHome': {
				type: Boolean,
				default: false
			}
		},
		created: function () {
			this.getParam.page = 1;
			this.getData();
		},
		updated: function () {
			if (this.ready) {
				lazyLoadImage.init();
				lazyLoadImage.reload();
				this.ready = false;
			}
		},
		methods: {
			'pageChange': function (p) {
				this.getParam.page = p;
				this.getData();
			},
			'changeSortType': function (type) {
				var resType;
				if (type === 'ASC') {
					this.getParam.sortItem === 'age' ? resType = 'DESC' : resType = 'ASC';
				}
				else {
					this.getParam.sortItem === 'age' ? resType = 'ASC' : resType = 'DESC';
				}
				this.getParam.sortType = resType;
				this.getParam.page = 1;
				this.getData();
			},
			'changeSortItem': function (item) {
				this.getParam.sortItem = item;
				this.changeSortType('ASC');
			},
			'getData': function () {
				var vm = this;
				ui.loading();
				$.ajax({
					url: location.origin + '/index.php/info/get_all_info',
					data: vm.getParam,
					dataType: 'json',
					type: 'get'
				})
				.done(function (res) {
					ui.closeAll('loading');
					vm.itemShow = false;
					vm.typeShow = false;
					if (res.code == 0 && res.data['data'].length > 0) {
						// 处理所有数据,添上checked字段,用于批量删除操作
						res.data['data'].forEach((elem) => {
							elem['checked'] = false;
						});
						vm.list = res.data['data'];
						vm.curPage = parseInt(res.data['page']['current_page']);
						vm.pageNumber = parseInt(res.data['page']['page_count']);
						vm.ready = true;
					}
					else {
						ui.msgError('未获取到数据');
					}
				})
				.fail(function (res) {
					ui.closeAll('loading');
					ui.msgError(res.msg);
				});
			},
			'deleteItem': function (id) {
				var vm = this;
				ui.info({
					msg: '确定要删除吗',
					yes: function () {
						$.ajax({
							url: location.origin + '/index.php/info/delete_info',
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
			'deleteAll': function () {
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
								url: location.origin + '/index.php/info/delete_mult',
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
			'checkAll': function () {
				this.checkedAll = !this.checkedAll;
				var checkedAll = this.checkedAll;
				if (checkedAll) {
					this.list.forEach((elem) => {
						elem['checked'] = true;
					});
				}
				else {
					this.list.forEach((elem) => {
						elem['checked'] = false;
					});
				}
			},
			// 只在教师列表组件中用到,触发事件跳转到教师详情组件
			'toDetail': function (id) {
				this.$router.push('/home/detail/'+id);
			},
			checkImg(item) {
				layer.photos({
			    photos: {
			    	title: `${item.name}的头像`,
			    	id: Math.random()*10,
			    	start: 0,
			    	data: [{
			    		// 头一次尝试ES6模板字符串哈 ~
			    		alt: `${item.name}的头像`,
			    		pid: Math.random()*10,
			    		src: item.avatar
			    	}]
			    },
			    anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
			  });
			}
		}
	}

	return infoList;

});
