/**
 * 考核录入组件
 * @author  Markey
 * @date    2017-04-26
 */
define(function (require, exports) {
	'use strict';
	let render = require('text!../../template/assess/insert.tpl');
	let ui = require('ui');
	let util = require('util');
	let drop = require('../common/drop');

	let insert = {
		template: render,
		components: {
			'drop': drop
		},
		data() {
			return {
				// 全部教师信息
				teacherList: [],
				// 全部专业信息
				majorList: [],
				// 选中的专业id, 用于查询教师
				mid: '',
				// 选中的教师信息
				teacher: {
					name: '',
					age: '',
					major: '',
					self: ''
				},
				// 是否已选择专业flag, 用于判断是否发送请求查询教师
				hasSelectMajor: false,
				// 是否已选择教师flag, 用于判断是否显示教师信息
				hasSelectTeacher: false,
				// 用于验证
				requires: {
					tid: true,
					mid: true
				},
				formData: {
					tid: ''
				}
			};
		},
		created() {
			ui.loading();
			$.ajax({
				url: location.origin + '/index.php/get_majors',
				type: 'get',
			}).then(res => {
				ui.closeAll('loading');
				if (res.code == 0) {
					this.majorList = res.data['majors'];
				}
			}, res => {
				ui.closeAll('loading');
				ui.msgError(res.msg);
			});
		},
		methods: {
			selectMajor() {
				console.log(this.mid);
			},
			selectTeacher() {

			}
		}
	};

	return insert;

});
