/**
 * 我的课表组件
 * @author  Markey
 * @date    2017-04-19
 */
define(function (require, exports) {
	'use strict';

	var render = require('text!../../template/course/class.tpl');

	var courseClass = {
		template: render

	};

	return courseClass;

});
