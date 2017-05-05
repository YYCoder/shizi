/**
 * 留言板组件
 * @author  Markey
 * @date    2017-05-05
 */
define(function (require, exports) {
	const render = require('text!../../template/comment/comment.tpl');
	const ui = require('ui');

	const comment = {
		template: render
	}

	return comment;

});
