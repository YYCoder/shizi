/**
 * 下拉菜单公共组件
 * @author  Markey
 * @date    2017-04-20
 *
 * 使用方法:
 * 1.items属性为一个数组, 该数组中的每个元素即为下来列表的元素值, 其中name属性为每条选项显示的文案, 还应有value属性表示该选项的值
 * 2.当点击选项后, 会触发drop-click事件, 并传递点击的选项对象
 * 3.dropName属性代表该下拉列表的显示文案
 */
define(function (require, exports) {
	'use strict';

	var render = require('text!../../template/common/drop.tpl');

	var drop = {
		template: render,
		data: function () {
			return {
				itemShow: false,
			}
		},
		props: {
			items: {
				default: function () {
					return [];
				},
				type: Array
			},
			dropName: {
				default: '字段名',
				type: String
			}
		},
		methods: {
			'clickItem': function (item) {
				this.itemShow = !this.itemShow;
				this.$emit('drop-click', item);
			}
		}

	};

	return drop;

});
