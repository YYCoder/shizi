/**
 * 主内容组件
 * @author  WhyCoder
 * @date    2017-02-06
 */
define(function (require, exports) {

    var mainRender = require('text!../template/main.tpl');
    // 子组件
    var teacherList = require('./home/teacherList');

    var main = {
        template: mainRender,
        components: {
        	'list': teacherList
        }
    }

    return main;
});