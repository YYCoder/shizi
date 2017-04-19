/**
 * 分页组件
 * @author  Markey
 * @date    2017-04-11
 *
 * 用法介绍:
 * 1.首次加载,向该组件传入共有多少页,即pageNumber属性值,还有curPage,即当前所在页number
 * 2.点击上一页,下一页,页码标签,点击跳转按钮都会触发自定义事件page-change,事件处理函数中会接收到跳转到的页数number
 * 3.父组件接收到page-change后,要修改curPage属性,从而通知pager组件修改它的curPage
 *
 */
define(function (require, exports) {
	'use strict';

	var render = require('text!../../template/common/pager.tpl');

	var pager = {
		template: render,
		data: function () {
			return {
				goPage: ''
			}
		},
		props: {
			pageNumber: {
				type: Number,
				default: 1
			},
			curPage: {
				type: Number,
				default: 1
			}
		},
		methods: {
			'go': function (n) {
				if (n <= this.pageNumber && n > 0) {
					this.$emit('page-change', n);
				}
			},
			'prev': function (e) {
				if (!e.target.classList.contains('disabled')) {
					this.$emit('page-change', this.curPage - 1);
				}
			},
			'next': function (e) {
				if (!e.target.classList.contains('disabled')) {
					this.$emit('page-change', this.curPage + 1);
				}
			}
		}
	}

	return pager;

});
