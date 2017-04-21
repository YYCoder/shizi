/**
 * 我的课表组件
 * @author  Markey
 * @date    2017-04-19
 */
define(function (require, exports) {
	'use strict';

	var render = require('text!../../template/course/class.tpl');
	var drop = require('../common/drop');
	var ui = require('ui');

	var courseClass = {
		template: render,
		components: {
			'drop': drop
		},
		data: function () {
			return {
				// 将所有的课按time分组, class数组中一共5组, 分别代表time等于1到5的数据
				classList: [
					[],
					[],
					[],
					[],
					[]
				],
				drop: {
					items: [
						{
							name: '第一周',
							value: 1
						},
						{
							name: '第二周',
							value: 2
						},
						{
							name: '第三周',
							value: 3
						},
						{
							name: '第四周',
							value: 4
						},
						{
							name: '第五周',
							value: 5
						},
						{
							name: '第六周',
							value: 6
						},
						{
							name: '第七周',
							value: 7
						},
						{
							name: '第八周',
							value: 8
						},
						{
							name: '第九周',
							value: 9
						},
						{
							name: '第十周',
							value: 10
						},
						{
							name: '第十一周',
							value: 11
						},
						{
							name: '第十二周',
							value: 12
						},
						{
							name: '第十三周',
							value: 13
						},
						{
							name: '第十四周',
							value: 14
						},
						{
							name: '第十五周',
							value: 15
						},
						{
							name: '第十六周',
							value: 16
						},
						{
							name: '第十七周',
							value: 17
						},
						{
							name: '第十八周',
							value: 18
						},
					],
					name: '选择周数'
				}
			};
		},
		created: function () {
			$.ajax({
				url: location.origin + '/index.php/course/get_class',
				dataType: 'json',
				type: 'get'
			}).done((res) => {
				if (res.code == 0) {
					res.data.forEach((elem, index) => {
						this.classList[+elem.time - 1].push(elem);
					});
				}
			}).fail((res) => {
				ui.msgError(res.msg);
			});
		},
		methods: {
			'download': function () {
					var vm = this;
      		$.ajax({
      			url: location.origin + '/index.php/download_course',
      			type: 'post',
      			data: {data: vm.info},
      			dataType: 'json'
      		})
      		.done((res) => {
      			location.href = res.data['url'];
      		})
      		.fail((res) => {
      			ui.msgError(res.msg);
      		});
			},
			'selectWeek': function (item) {
					ui.loading();
					$.ajax({
						url: location.origin + '/index.php/course/get_class',
						dataType: 'json',
						type: 'get',
						data: {'start': item.value}
					}).done((res) => {
						ui.closeAll('loading');
						if (res.code == 0) {
							for (var i = 0; i < this.classList.length; i++) {
								this.classList[i].splice(0, this.classList[i].length);
							}
							res.data.forEach((elem, index) => {
								this.classList[+elem.time - 1].push(elem);
							});
						}
					}).fail((res) => {
						ui.closeAll('loading');
						ui.msgError(res.msg);
					});
			}
		}
	};

	return courseClass;

});
