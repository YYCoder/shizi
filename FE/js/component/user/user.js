/**
 * 用户管理组件
 * @author  Markey
 * @date    2017-05-08
 */
define(function (require, exports) {
	'use strict';
	const render = require('text!../../template/user/user.tpl');
	const ui = require('ui');
	const pager = require('../common/pager');
	const drop = require('../common/drop');

	const user = {
		template: render,
		components: {
			pager,
			drop
		},
		data() {
			return {
				getParam: {
					where: '',
					page: 0,
					limit: 10
				},
				page: {
					pageNumber: 0,
					curPage: 0
				},
				drop: {
					dropName: '用户类型',
					items: [
						{
							name: '教师',
							value: 0
						},
						{
							name: '管理员',
							value: 1
						},
						{
							name: '超级管理员',
							value: 2
						}
					]
				},
				regDesc: false
			}
		},
		methods: {
			getData() {

			},
			pageChange(p) {
				this.getParam.page = p;
				this.getData();
			},
			dropClick(item) {
				console.log(item);
			}
		}
	}

	return user;

});
