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

	var infoList = {
		template: render,
		components: {
			'pager': pager
		},
		data: function () {
			return {
				itemShow: false,
				typeShow: false,
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
					page: 0
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
			'getData': function () {
				var vm = this;
				$.ajax({
					url: location.origin + '/index.php/info/get_all_info',
					data: vm.getParam,
					dataType: 'json',
					type: 'get'
				}).done(function (res) {
					console.log(res);
					if (res.code == 0) {
						vm.list = res.data['data'];
					}
					else {

					}
				}).fail(function (res) {
					ui.msgError(res.msg);
				});
			}
		}
	}

	return infoList;

});
