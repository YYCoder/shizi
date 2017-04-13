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
						vm.list = res.data['data'];
						vm.curPage = parseInt(res.data['page']['current_page']);
						vm.pageNumber = parseInt(res.data['page']['page_count']);
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
			'deleteItem': function () {

			}
		}
	}

	return infoList;

});
