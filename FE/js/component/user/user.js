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
	const lazyLoadImage = require('lazyLoadImage');
	const layer = require('layer');

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
					page: 1,
					limit: 8,
					sortItem: '',
					sortType: 'ASC',
					userType: ''
				},
				page: {
					pageNumber: 0,
					curPage: 1
				},
				drop: {
					dropName: '用户类型',
					items: [
						{
							name: '无',
							value: ''
						},
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
				regDesc: false,
				list: [],
				isDataUpdated: false,
				rights: {
					id: '',
					type: '',
					info: '',
					course: '',
					work: '',
					train: '',
					assessment: '',
					comment: ''
				}
			}
		},
		created() {
			this.getData();
		},
		updated() {
			if (this.isDataUpdated) {
				lazyLoadImage.init();
				lazyLoadImage.reload();
				this.isDataUpdated = false;
			}
		},
		computed: {
			// 排序用flag
			rDesc() {
				return this.getParam['sortItem'] === 'reg_time' && this.getParam['sortType'] === 'DESC';
			},
			idDesc() {
				return this.getParam['sortItem'] === 'id' && this.getParam['sortType'] === 'DESC';
			}
		},
		methods: {
			getData() {
				ui.loading();
				$.ajax({
					url: `${location.origin}/index.php/user/get_all`,
					data: this.getParam,
					type: 'get'
				}).done(res => {
					ui.closeAll('loading');
					if (res.code == 0) {
						this.list = res.data.data;
						this.page.pageNumber = +res.data.page.page_count;
						this.page.curPage = +res.data.page.current_page;
						this.isDataUpdated = true;
					}
					else {
						ui.msgError(res.msg);
					}
				}).fail(res => {
					ui.closeAll('loading');
					ui.msgError(res.msg);
				});
			},
			pageChange(p) {
				this.getParam.page = p;
				this.getData();
			},
			dropClick(item) {
				this.getParam.userType = item.value;
				this.getData();
			},
			checkImg(item) {
				layer.photos({
			    photos: {
			    	title: `${item.name}的头像`,
			    	id: Math.random()*10,
			    	start: 0,
			    	data: [{
			    		// 头一次尝试ES6模板字符串哈 ~
			    		alt: `${item.name}的头像`,
			    		pid: Math.random()*10,
			    		src: item.avatar
			    	}]
			    },
			    anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
			  });
			},
			sort(item) {
				console.log(item);
				if (item === this.getParam['sortItem']) {
					this.getParam['sortType'] === 'ASC' ? this.getParam['sortType'] = 'DESC' : this.getParam['sortType'] = 'ASC';
				}
				else {
					this.getParam['sortItem'] = item;
					this.getParam['sortType'] = 'ASC';
				}
				this.getData();
			},
			mod(opt) {
				const data = {};
				const vm = this;
				if (opt.type === 'gag') {
					data.is_gag = opt.value;
					$.ajax({
						url: `${location.origin}/index.php/user/mod`,
						data: {id: opt.id, is_gag: opt.value},
						type: 'post'
					}).done(res => {
						if (res.code == 0) {
							ui.msgRight(`${opt.value == 1 ? '禁言' : '解除禁言'}成功`);
							vm.getData();
						}
						else {
							ui.msgError(res.msg);
						}
					}).fail(res => {
						ui.msgError(res.msg);
					});
				}
				else if (opt.type === 'rights') {
					for(let k in opt) {
						if (k == 'id') {
							vm.rights[k] = opt[k];
						}
						else if (k == 'userType') {
							vm.rights['type'] = opt[k];
						}
						else if (k != 'type') {
							vm.rights[k] = opt[k] === '是' ? true : false;
						}
					}

					layer.open({
						type: 1,
						area: '420px',
						title: false,
						content: $('.rights-container'),
						shade: 0,
						move: 'h1.title',
						cancel() {
							for(let k in vm.rights) {
								vm.rights[k] = '';
							}
						}
					});
				}
			},
			submit() {
				// 修改用户类型: 若是教师, 添加了权限后类型改为管理员; 若是管理员, 权限都被收回后变成教师
				const valueArr = [];
				const rights = this.rights;
				for(let k in rights) {
					if (k === 'type') {
						for(let right in rights) {
							if (right !== 'id' || right !== 'type') {
								valueArr.push(rights[right]);
							}
						}
						if (rights[k] === '教师') {
							(valueArr.indexOf(true) !== -1) && (rights[k] = 1);
						}
						else if (rights[k] === '管理员') {
							valueArr.every(ele => {
								return ele === false;
							}) && (rights[k] = 0);
						}
					}
				}
				$.ajax({
					url: `${location.origin}/index.php/user/mod`,
					data: this.rights,
					type: 'post'
				}).done(res => {
					if (res.code == 0) {
						ui.msgRight('修改权限成功');
						this.getData();
					}
					else {
						ui.msgError(res.msg);
					}
				}).fail(res => {
						ui.msgError(res.msg);
				});
			}
		}
	};

	return user;

});
