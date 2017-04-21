/**
 * 录入排课组件
 * @author  Markey
 * @date    2017-04-19
 */
define(function (require, exports) {
	'use strict';

	var render = require('text!../../template/course/insert.tpl');
	var drop = require('../common/drop');
	var ui = require('ui');
	var util = require('util');

	var insertClass = {
		template: render,
		components: {
			'drop': drop
		},
		data: function () {
			return {
				// 是否添加了排课
				hasAddClass: false,
				requires: {
					'teacher': true,
					'class': true,
					'start': true,
					'end': true,
					'course': true,
					'time_1': true,
					'time_2': false,
					'week_1': true,
					'week_2': false,
					'room_1': true,
					'room_2': false
				},
				formData: {
					'teacher': '',
					'class': '',
					'start': '',
					'end': '',
					'course': '',
					'time_1': '',
					'time_2': '',
					'week_1': '',
					'week_2': '',
					'room_1': '',
					'room_2': ''
				},
				teachers: [],
				courses: [],
				// 下拉组件用的数据
				drop: {
					'classTimeName': '选择第几节上课',
					'classTime': [
						{
							value: '1',
							name: '一二节'
						},
						{
							value: '2',
							name: '三四节'
						},
						{
							value: '3',
							name: '五六节'
						},
						{
							value: '4',
							name: '七八节'
						},
						{
							value: '5',
							name: '九十节'
						}
					],
					'classWeekName': '选择周几上课',
					'classWeek': [
						{
							value: '1',
							name: '周一'
						},
						{
							value: '2',
							name: '周二'
						},
						{
							value: '3',
							name: '周三'
						},
						{
							value: '4',
							name: '周四'
						},
						{
							value: '5',
							name: '周五'
						},
						{
							value: '6',
							name: '周六'
						},
						{
							value: '7',
							name: '周日'
						},
					]
				}
			}
		},
		created: function () {
			// 获取老师数据
			$.ajax({
				url: location.origin + '/index.php/course/get_teachers',
				dataType: 'json',
				type: 'get'
			}).done((res) => {
				if (res.code == 0) {
					this.teachers = res.data;
				}
			}).fail((res) => {
				ui.msgError(res.msg);
			});
			// 获取课程数据
			$.ajax({
				url: location.origin + '/index.php/course/get_courses',
				dataType: 'json',
				type: 'get'
			}).done((res) => {
				if (res.code == 0) {
					this.courses = res.data;
				}
			}).fail((res) => {
				ui.msgError(res.msg);
			});
		},
		methods: {
			'dropClickTime1': function (item) {
				this.formData['time_1'] = item.value;
			},
			'dropClickWeek1': function (item) {
				this.formData['week_1'] = item.value;
			},
			'dropClickTime2': function (item) {
				this.formData['time_2'] = item.value;
			},
			'dropClickWeek2': function (item) {
				this.formData['week_2'] = item.value;
			},
			'deleteAddClass': function () {
				this.hasAddClass = false;
				this.formData['time_2'] = '';
				this.formData['week_2'] = '';
				this.formData['room_2'] = '';
			},
			'submit': function () {
        var formData = util['deepClone'](this.formData),
            hasEmptyValue = util['hasEmpty'](formData);
        if (!hasEmptyValue) {
        	var data1 = {
        		time: formData['time_1'],
        		week: formData['week_1'],
        		room: formData['room_1']
        	}, data2 = {
						time: formData['time_2'],
        		week: formData['week_2'],
        		room: formData['room_2']
    			};
	        delete formData['time_1'];
	        delete formData['time_2'];
	        delete formData['week_1'];
	        delete formData['week_2'];
	        delete formData['room_1'];
	        delete formData['room_2'];
    			data1 = $.extend(true, data1, formData);
    			data2 = $.extend(true, data2, formData);
        	ui.loading();
					$.ajax({
        		url: location.origin + '/index.php/course/insert_data',
        		data: {data: [data1, data2]},
        		dataType: 'json',
        		type: 'post'
        	}).done((res) => {
        		if (res.code == 0) {
        			ui.closeAll('loading');
        			ui.msgRight('录入排课成功');
        		}
        	}).fail((res) => {
        			ui.closeAll('loading');
        			ui.msgError(res.msg);
        	});
        }
        else if(hasEmptyValue === 'teacher') {
        	ui.tips({
        		msg: '教师不能为空',
        		follow: 'input[name="teacher"]'
        	});
        }
        else if(hasEmptyValue === 'class') {
        	ui.tips({
        		msg: '授课班级不能为空',
        		follow: 'input[name="class"]'
        	});
        }
        else if(hasEmptyValue === 'start') {
        	ui.tips({
        		msg: '请选择开始时间',
        		follow: 'input[name="start"]'
        	});
        }
        else if(hasEmptyValue === 'end') {
        	ui.tips({
        		msg: '请选择结束时间',
        		follow: 'input[name="end"]'
        	});
        }
        else if(hasEmptyValue === 'course') {
        	ui.tips({
        		msg: '请选择要排课程',
        		follow: 'input[name="course"]'
        	});
        }
        else if(hasEmptyValue === 'time_1') {
        	ui.tips({
        		msg: '请选择上课时间',
        		follow: 'div.time_1'
        	});
        }
        else if(hasEmptyValue === 'week_1') {
        	ui.tips({
        		msg: '请选择上课日期',
        		follow: 'div.week_1'
        	});
        }
				else if(hasEmptyValue === 'room_1') {
        	ui.tips({
        		msg: '请填写授课教室',
        		follow: 'input[name="room_1"]'
        	});
        }
        else if(hasEmptyValue === 'time_2' || hasEmptyValue === 'week_2' || hasEmptyValue === 'room_2') {
        	// 懒得验证time_2这组了, 如果有一个为空, 则这组都不要了
        	ui.loading();
        	formData['time'] = formData['time_1'];
        	formData['week'] = formData['week_1'];
        	formData['room'] = formData['room_1'];
        	delete formData['time_1'];
        	delete formData['week_1'];
        	delete formData['room_1'];
        	delete formData['time_2'];
        	delete formData['week_2'];
        	delete formData['room_2'];
        	$.ajax({
        		url: location.origin + '/index.php/course/insert_data',
        		data: {data: formData},
        		dataType: 'json',
        		type: 'post'
        	}).done((res) => {
        		if (res.code == 0) {
        			ui.closeAll('loading');
        			ui.msgRight('录入排课成功');
        		}
        	}).fail((res) => {
        			ui.closeAll('loading');
        			ui.msgError(res.msg);
        	});
        }
			}
		}
	};

	return insertClass;

});
