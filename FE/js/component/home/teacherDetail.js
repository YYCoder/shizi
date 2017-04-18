/**
 * 老师列表组件
 * @author  WhyCoder
 * @date    2017-02-06
 */
define(function (require, exports) {
    'use strict'

    var render = require('text!../../template/home/teacherDetail.tpl');
    var util = require('util');
    var ui = require('ui');

    var teacherDetail = {
        template: render,
        data: function () {
        	return {
        		info: {},
        		homes: [
        			[
        				{
        					name: '张三',
        					relation: '父子',
        					dep: '万达集团',
        					job: 'CEO'
        				},
								{
        					name: '李四',
        					relation: '母子',
        					dep: '万达集团',
        					job: 'CFO'
        				},
								{
        					name: '兄弟啊',
        					relation: '兄弟',
        					dep: '万达集团',
        					job: 'CTO'
        				}
      				],
        			[
        				{
        					name: '张兵',
        					relation: '父子',
        					dep: '阅文集团',
        					job: '技术开发'
        				},
								{
        					name: '王翠花',
        					relation: '母子',
        					dep: '哈尔滨工业大学',
        					job: '讲师'
        				},
        				{
        					name: '',
        					relation: '',
        					dep: '',
        					job: ''
        				}
      				],
        			[
        				{
        					name: '李明',
        					relation: '父子',
        					dep: '中国银行',
        					job: '杭州行长'
        				},
								{
        					name: '张秀芬',
        					relation: '母子',
        					dep: '东风小学',
        					job: '校长'
        				},
								{
        					name: '刘涛',
        					relation: '兄弟',
        					dep: '中央电视台',
        					job: '主持人'
        				}
      				]
        		]
        	}
        },
        computed: {
        	marriage: function () {
        		return this.info['marriage'] == 0 ? '否' : '是';
        	},
        	home: function () {
        		return this.homes[Math.floor(Math.random()*3)]
        	}
        },
        created: function () {
        	var id = util['segment'](4),
        			vm = this;

        	ui.loading();
        	$.ajax({
        		url: location.origin +　'/index.php/info_detail',
        		data: {id: id},
        		dataType: 'json',
        		type: 'get'
        	})
        	.then(function (res) {
        		ui.closeAll('loading');
        		if (res.code == 0) {
	        		vm.info = res.data;
        		}
        		else {
        			ui.msgError(res.msg);
        		}
        	}, function (res) {
        		ui.closeAll('loading');
        		ui.msgError(res.msg);
        	});
        },
        methods: {
        	'download': function () {
        		var vm = this;
        		ui.msgRight('点击下载!');
        		$.ajax({
        			url: location.origin + '/index.php/download_info',
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
        	}
        }
    }

    return teacherDetail;
});
