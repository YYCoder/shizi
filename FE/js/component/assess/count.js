/**
 * 考核统计组件
 * @author  Markey
 * @date    2017-05-04
 */
define(function (require, exports) {
	'use strict';
	let render = require('text!../../template/assess/count.tpl');
	let ui = require('ui');

	let count = {
		template: render
	}

	return count;

});
