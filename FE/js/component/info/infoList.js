/**
 * 全部档案组件
 * @date    2017-04-10
 * @author  Markey
 */
define(function (require, exports) {
	'use strict';

	var render = require('text!../../template/info/infoList.tpl');

	var infoList = {
		template: render,
		components: {

		},
		data: function () {
			return {
				itemShow: false,
				typeShow: false
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

		}
	}

	return infoList;

});
