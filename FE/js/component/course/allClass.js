/**
 * 全部排课组件
 * @author  Markey
 * @date    2017-04-21
 */
define(function (require, exports) {
	'use strict';

	var render = require('text!../../template/course/allClass.tpl');
	var ui = require('ui');
	var pager = require('../common/pager');

	var allClass = {
		template: render,
		components: {
			'pager': pager
		},
		data: function () {
			return {
				// 这两个参数用于传递给pager组件
				curPage: 0,
				pageNumber: 0,
				// 请求用的参数
				getParam: {
					// tid, start, end
					item: 'tid',
					// ASC, DESC
					type: 'ASC',
					// limit
					limit: 10,
					// where
					where: '',
					// 前往第几页
					page: 1
				},
				// 全选flag
				checkedAll: false,
				list: []
			}
		},
		created() {
			this.getData();
		},
		computed: {
			tidDesc() {
				return this.getParam['item'] === 'tid' && this.getParam['type'] === 'DESC';
			},
			startDesc() {
				return this.getParam['item'] === 'start' && this.getParam['type'] === 'DESC';
			},
			endDesc() {
				return this.getParam['item'] === 'end' && this.getParam['type'] === 'DESC';
			}
		},
		methods: {
			sort(item) {
				if (item === this.getParam['item']) {
					this.getParam['type'] === 'ASC' ? this.getParam['type'] = 'DESC' : this.getParam['type'] = 'ASC';
				}
				else {
					this.getParam['item'] = item;
					this.getParam['type'] = 'ASC';
				}
				this.getData();
			},
			pageChange(p) {
				this.getParam['page'] = p;
				this.getData();
			},
			deleteAll() {

			},
			checkAll() {
				this.checkedAll = !this.checkedAll;
				this.list.forEach((elem) => {
					elem.checked = this.checkedAll;
				});
			},
			deleteItem(id) {

			},
			updateItem(id) {

			},
			getData() {
				ui.loading();
				$.ajax({
					url: location.origin + '/index.php/course/get_all_class',
					data: this.getParam,
					dataType: 'json',
					type: 'get'
				}).done((res) => {
					console.log(res);
					ui.closeAll('loading');
					if (res.code == 0) {
						res.data['data'].forEach((elem) => {
							elem.checked = false;
						});
						this.list = res.data['data'];
						this.pageNumber = +res.data['page']['page_count'];
						this.curPage = +res.data['page']['current_page'];
					}
				}).fail((res) => {
					ui.closeAll('loading');
					ui.msgError(res.msg);
				});
			}
		}
	}

	return allClass;

});
