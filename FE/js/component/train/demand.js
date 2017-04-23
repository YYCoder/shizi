/**
 * 培训申请组件
 * @author  Markey
 * @date    2017-04-23
 */
define(function (require, exports) {
	'use strict';
	var render = require('text!../../template/train/demand.tpl');
	var drop = require('../common/drop');
	var ui = require('ui');

	var demand = {
		template: render,
		components: {
			'drop': drop
		},
		data() {
			return {
				drop: {
					dropType: '培训类型',
					types: [
						{
							value: 0,
							name: '岗前培训'
						},
						{
							value: 1,
							name: '教育技术培训'
						},
						{
							value: 2,
							name: '教师发展基地研修'
						},
						{
							value: 3,
							name: '青年教师教学能力培训'
						},
						{
							value: 4,
							name: '外语培训'
						},
						{
							value: 5,
							name: '科研能力与师德培训'
						},
						{
							value: 6,
							name: '管理干部培训'
						}
					]
				},
				formData: {
					type: 0,
					title: '',
					desc: '',
					place: '',
					price: 0
				},
				requires: {
					type: true,
					title: true,
					desc: true,
					place: true,
					price: true
				}
			};
		},
		computed: {
			// 下拉菜单后面的文案, 用于显示当前选中的项的name
			dropText() {
				var items = this.drop.types;
				// 尝试下ES6的for-of循环 ~ ~ ~
				for(var k of items) {
					if (k['value'] == this.formData.type) {
						return k['name'];
					}
				}
			}
		},
		methods: {
			submit() {
				var vm = this,
						data = vm.formData;
				if (data.title.length === 0) {
					ui.tips({
						msg: '请填写培训名称',
						follow: $('input[name="title"]')
					});
				}
				else if (data.desc.length === 0) {
					ui.tips({
						msg: '请填写培训描述',
						follow: $('textarea')
					});
				}
				else if (data.place.length === 0) {
					ui.tips({
						msg: '请填写培训地点',
						follow: $('input[name="place"]')
					});
				}
				else if (data.price === 0) {
					ui.tips({
						msg: '培训价格不能为0',
						follow: $('input[name="price"]')
					});
				}
				else {
					ui.loading();
					$.ajax({
						url: location.origin + '/index.php/train/insert_apply',
						data: data,
						dataType: 'json',
						type: 'post'
					}).done((res) => {
						ui.closeAll('loading');
						if (res.code == 0) {
							ui.msgRight('提交申请成功');
						}
						else {
							ui.msgError('提交申请失败');
						}
					}).fail((res) => {
						ui.closeAll('loading');
						ui.msgError(res.msg);
					});
				}
			},
			reset() {
				var data = this.formData;
				for(var k in data) {
					if (k == 'price' || k == 'type') {
						data[k] = 0;
					}
					else {
						data[k] = '';
					}
				}
			},
			selectType(item) {
				this.formData.type = item.value;
			}
		}
	};


	return demand;

});
