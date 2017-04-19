/**
 * 主内容组件
 * @author  WhyCoder
 * @date    2017-02-06
 */
define(function (require, exports) {
    'use strict';

    var mainRender = require('text!../template/main.tpl');
    // 子组件
    // 首页
    var teacherList = require('./home/teacherList');
    var teacherDetail = require('./home/teacherDetail');
    // 档案管理
    var insert = require('./info/insert');
    var update = require('./info/update');
    var infoList = require('./info/infoList');
    // 课程管理
    var courseClass = require('./course/class');
    var insertClass = require('./course/insert');

    var main = {
        template: mainRender,
        components: {
            list: teacherList,
            detail: teacherDetail,

            insert: insert,
            update: update,
            infoList: infoList,

            class: courseClass,
            insertClass: insertClass
        }
    }

    return main;
});
