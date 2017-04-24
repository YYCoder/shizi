/**
 * 培训反馈组件
 * @author  Markey
 * @date    2017-04-24
 */
define(function (require, exports) {
	'use strict';
	let render = require('text!../../template/train/feedback.tpl');
	let ui = require('ui');
	let util = require('util');
	let drop = require('../common/drop');

	let feedback = {
		template: render,
		components: {
			'drop': drop
		},
		data() {
			return {
				requires: {
					title: true,
					desc: false,
					end_time: true,
					certificate: true,
					invoice: true
				},
				formData: {
					train_id: '',
					desc: '',
					end_time: '',
					certificate: '',
					invoice: '',
					// 用于显示上传文件的名字, 提交时要删除
					certName: '',
					invoiceName: ''
				},
				// 所有该用户的审核已通过的培训申请
				list: [],
				// 下拉菜单用数据
				drop: {
					dropTrain: '请选择您已通过的培训',
					trains: []
				}
			}
		},
		computed: {
			// 下拉菜单后面的文案
			dropText() {
				for(let k of this.list) {
					if (k.id == this.formData.train_id) {
						return k.title;
					}
				}
			},
			certificateText() {
				return this.formData.certName;
			},
			invoiceText() {
				return this.formData.invoiceName;
			}
		},
		created() {
			ui.loading();
			$.ajax({
				url: location.origin + '/index.php/train/get_passed_apply',
				type: 'get'
			}).done((res) => {
				ui.closeAll('loading');
				if (res.code == 0) {
					// console.log(res);
					let list = res.data;
					this.list = list;
					for(let k of list) {
						this.drop.trains.push({
							name: k.title,
							value: k.id
						});
					}
				}
				else {
					ui.msgError('您还没有申请任何培训');
				}
			}).fail((res) => {
				ui.closeAll('loading');
				ui.msgError(res.msg);
			});
		},
		methods: {
			selectTrain(item) {
				this.formData.train_id = item.value;
			},
			submit() {
				let vm = this,
						formData = util['deepClone'](vm.formData);
				if (formData.train_id === '') {
					ui.tips({
						msg: '请选择您已通过的培训',
						follow: $('.drop')
					});
				}
				else if (formData.end_time === '') {
					ui.tips({
						msg: '请选择培训结束的时间',
						follow: $('input[type=date][name=end_time]')
					});
				}
				else if (formData.certificate === '') {
					ui.tips({
						msg: '请上传培训结业/毕业证书图片',
						follow: $('label[for="certificate"]')
					});
				}
				else if (formData.invoice === '') {
					ui.tips({
						msg: '请上传培训费用发票图片',
						follow: $('label[for="invoice"]')
					});
				}
				else {
					ui.loading();
					delete formData['certName'];
					delete formData['invoiceName'];
					$.ajax({
						url: location.origin + '/index.php/train/insert_feedback',
						data: formData,
						type: 'post'
					}).done((res) => {
						ui.closeAll('loading');
						if (res.code == 0) {
							ui.msgRight('提交反馈成功');
						}
						else {
							ui.msgError(res.msg);
						}
					}).fail((res) => {
						ui.closeAll('loading');
						ui.msgError(res.msg);
					});
				}
			},
			reset() {
				for(let k in this.formData) {
					this.formData[k] = '';
				}
			},
			upload(e) {
				ui.loading();
				let target = e.target,
						file = target.files[0],
						formData = new FormData();
				if (target.id == 'certificate') {
					formData.append('type', 0);
				}
				else {
					formData.append('type', 1);
				}
				formData.append('file', file);
				$.ajax({
					url: location.origin + '/index.php/train/upload_file',
					type: 'post',
					data: formData,
					// jq使用FormData上传文件时时一定要加上这两项
	        contentType: false,// 告诉jQuery不要去处理发送的数据
	        processData: false// 告诉jQuery不要去设置Content-Type请求头
				}).done((res) => {
					ui.closeAll('loading');
					if (res.code == 0 && res.data['url'].length > 0) {
						if (res.data['type'] == '0') {
							this.formData.certificate = res.data['url'];
							this.formData.certName = res.data['name'];
						}
						else {
							this.formData.invoice = res.data['url'];
							this.formData.invoiceName = res.data['name'];
						}
						ui.msgRight('上传成功');
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
	};

	return feedback;

});
