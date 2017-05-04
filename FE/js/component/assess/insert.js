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
					mid: true,
					science: true,
					teach: true,
					public: true,
					course_quality: true,
					course_discipline: true,
					appearance: true
				},
				formData: {
					tid: '',
					college: {
						science: '',
						teach: '',
						public: ''
					},
					student: {
						course_quality: '',
						course_discipline: '',
						appearance: ''
					}
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
			},
			submit() {
				let formData = this.formData;
				let circle = (obj, fun) => {
					for(let k in obj) {
						if (typeof obj[k] === 'object') {
							let res = fun(obj[k]);
							if (res !== undefined) {
								return res;
							}
						}
						else {
							if (typeof(obj[k]) === 'string' && obj[k].length === 0) {
								return k;
							}
						}
					}
				};
				let vaildate = circle(this.formData, util.hasEmpty);
				if (vaildate) {
					let item = vaildate;
					switch (item) {
						case 'tid': ui.msgError(`请选择教师`);
						break;
						case 'science': ui.msgError(`科研考核成绩不能为空`);
						break;
						case 'teach': ui.msgError(`教学考核成绩不能为空`);
						break;
						case 'public': ui.msgError(`公益活动考核成绩不能为空`);
						break;
						case 'course_quality': ui.msgError(`教学质量考核成绩不能为空`);
						break;
						case 'course_discipline': ui.msgError(`课堂纪律考核成绩不能为空`);
						break;
						case 'appearance': ui.msgError(`教师仪表考核成绩不能为空`);
						break;
					}
				}
				else {
					ui.loading();
					$.ajax({
						url: `${location.origin}/index.php/assessment/insert_assess`,
						data: formData,
						type: 'post'
					}).done(res => {
						ui.closeAll('loading');
						if (res.code == 0) {
							ui.msgRight('录入成功');
						}
						else {
							ui.msgError(res.msg);
						}
					}).fail(res => {
						ui.closeAll('loading');
						ui.msgError(res.msg);
					});
				}
			},
			reset() {
				let formData = this.formData;
				// 将formData和teacher清空
				this.empty(formData);
				this.empty(this.teacher);
				this.hasSelectMajor = false;
				this.hasSelectTeacher = false;
				this.mid = '';
			},
			// 遍历对象属性, 递归将所有字段设置为''
			empty(obj) {
				for(let k in obj) {
					if (typeof obj[k] === 'object') {
						this.empty(obj[k]);
					}
					else {
						obj[k] = '';
					}
				}
			}
		}
	};

	return insert;

});
