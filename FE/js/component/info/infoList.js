/**
 * 全部档案组件
 * @date    2017-04-10
 * @author  Markey
 */
define(function (require, exports) {
	'use strict';

	var render = require('text!../../template/info/infoList.tpl');
	var pager = require('../common/pager');

	var infoList = {
		template: render,
		components: {
			'pager': pager
		},
		data: function () {
			return {
				itemShow: false,
				typeShow: false,
				curPage: 1,
				pageNumber: 4,
				// code, age, entry
				sortItem: 'code',
				// asc, desc
				sortType: 'asc',
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

		},
		methods: {
			'pageChange': function (p) {
				this.curPage = p;
			}
		}
	}

	return infoList;

});
