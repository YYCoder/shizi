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
					self: '',
					avatar: ''
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
				for(let major of this.majorList) {
					if (this.mid == major.id) {
						ui.loading();
						$.ajax({
							url: `${location.origin}/index.php/get_teachers`,
							data: {
								where: {
									item: 'mid',
									value: this.mid
								}
							},
							type: 'get'
						}).done(res => {
							if (res.code == 0) {
								this.hasSelectMajor = true;
								ui.closeAll('loading');
								if (res.data.length > 0) {
									this.teacherList = res.data;
								}
								else {
									ui.tips({
										msg: '暂无该专业的老师',
										follow: $('input[list="major"]')
									});
									this.hasSelectMajor = false;
								}
							}
						}).fail(res => {
							ui.closeAll('loading');
							ui.msgError(res.msg);
						});
						return;
					}
				}
			},
			selectTeacher() {
				let teacher = this.teacher;
				for(let t of this.teacherList) {
					if (this.formData.tid == t.id) {
						teacher.name = t.name;
						teacher.age = t.age;
						teacher.major = t.major;
						teacher.self = t.self;
						teacher.avatar = t.avatar;
						this.formData.tid = t.id;
						this.hasSelectTeacher = true;
						$('img.avatar').attr('src', teacher.avatar);
						return;
					}
					else {
						this.hasSelectTeacher = false;
						this.formData.tid = '';
						for(let k in teacher) {
							teacher[k] = '';
						}
					}
				}
			}
		}
	};

	return insert;

});
