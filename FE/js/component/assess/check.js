/**
 * 查看考核组件
 * @author  Markey
 * @date    2017-04-26
 */
define(function (require, exports) {
	'use strict';
	let render = require('text!../../template/assess/check.tpl');
	let ui = require('ui');
	let util = require('util');
	let drop = require('../common/drop');

	let check = {
		template: render
	};

	return check;

});
