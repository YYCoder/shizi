/**
 * 申请调课组件
 * @author  Markey
 * @date    2017-04-22
 */
define(function (require, exports) {
	'use strict';
	var render = require('text!../../template/course/demand.tpl');
	var drop = require('../common/drop');
	var ui = require('ui');

	var demand = {
		template: render,
		components: {
			'drop': drop
		},
		data: function () {
			return {
				demand: {
					id: '',
					time: '',
					week: '',
					room: ''
				},
				// 下拉菜单组件所需数据
				drop: {
					'timeDrop': '选择第几节上课',
					'timeDropList': [
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
					'weekDrop': '选择周几上课',
					'weekDropList': [
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
				},
				// 该老师所有的排课数据
				courses: []
			};
		},
		created() {
			this.getCourses();
		},
		computed: {
			time() {
				var time = '';
				var demandTime = this.demand.time;
				if (demandTime !== '') {
					this.drop.timeDropList.forEach((ele) => {
						if (ele.value == demandTime) {
							time = ele.name;
						}
					});
				}
				return time;
			},
			week() {
				var week = '';
				var demandWeek = this.demand.week;
				if (demandWeek !== '') {
					this.drop.weekDropList.forEach((ele) => {
						if (ele.value == demandWeek) {
							week = ele.name;
						}
					});
				}
				return week;
			}
		},
		methods: {
			getCourses() {
				ui.loading();
				$.ajax({
					url: location.origin + '/index.php/course/get_own_class',
					dataType: 'json',
					type: 'get'
				}).done((res) => {
					ui.closeAll('loading');
					if (res.code == 0 && res.data.length > 0) {
						this.courses = res.data;
					}
					else if (res.code == 0 && res.data.length == 0) {
						ui.msgError('您还没有任何排课喔');
					}
					else {
						ui.msgError('获取课程失败');
					}
				}).fail((res) => {
					ui.closeAll('loading');
					ui.msgError(res.msg);
				});
			},
			submitDemand() {
				var demand = this.demand,
						param = {},
						// 是否和原本的数据完全相同
						hasSameValue = false,
						selectedCourse;

				if (!this.courses.some((ele) => ele.id == demand.id)) {
					ui.tips({
						msg: '请选择您的正确的课程',
						follow: $('input[type="list"]')
					});
				}
				else if (demand.room === '') {
					ui.tips({
						msg: '请填写授课教室',
						follow: $('input[name="room"]')
					});
				}
				else if (demand.time === '') {
					ui.tips({
						msg: '请选择上课时间',
						follow: $('.drop.time')
					});
				}
				else if (demand.week === '') {
					ui.tips({
						msg: '请选择上课日期',
						follow: $('.drop.week')
					});
				}
				else {
					// 验证信息是否没变
					selectedCourse = this.courses.filter((el) => el.id == demand.id)[0];
					hasSameValue = (selectedCourse['time'] == demand['time'])
											&& (selectedCourse['week'] == demand['week'])
											&& (selectedCourse['room'] == demand['room']);
					if (hasSameValue) {
						ui.msgError('您的信息跟原本的一样喔');
					}
					else if (selectedCourse.is_demand == 1) {
						ui.msgRight('您已经提交过该课程的申请, 请等待管理员处理');
					}
					else {
						ui.loading();
						// 处理要请求的字段
						param['is_demand'] = 1;
						param['id'] = demand.id;
						param['new_time'] = demand['time'];
						param['new_week'] = demand['week'];
						param['new_room'] = demand['room'];
						param['demand_time'] = parseInt(Date.now()/1000);
						$.ajax({
							url: location.origin + '/index.php/course/demand_course',
							data: param,
							type: 'post'
						}).done((res) => {
							ui.closeAll('loading');
							if (res.code == 0) {
								ui.msgRight('提交申请成功');
								this.getCourses();
							}
							else {
								ui.msgError(res.msg);
							}
						}).fail((res) => {
							ui.closeAll('loading');
							ui.msgError(res.msg);
						});
					}
				}
			},
			resetDemand() {
				var demand = this.demand;
				for(var k in demand) {
					demand[k] = '';
				}
			},
			// 下拉菜单点击事件
			timeDropClick(item) {
				this.demand.time = item.value;
			},
			weekDropClick(item) {
				this.demand.week = item.value;
			},
			changeCourse() {
				var demand = this.demand,
						course;
				course = this.courses.filter((ele) => ele.id == demand.id);
				if (course.length > 0) {
					demand.time = course[0]['time'];
					demand.week = course[0]['week'];
					demand.room = course[0]['room'];
				}
				else {
					demand.time = '';
					demand.week = '';
					demand.room = '';
				}
			}
		}



	};


	return demand;

});
