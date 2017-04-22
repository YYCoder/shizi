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
    var teacherList = require('./home/teacherList'),
        teacherDetail = require('./home/teacherDetail'),
    // 档案管理
        insert = require('./info/insert'),
        update = require('./info/update'),
        infoList = require('./info/infoList'),
    // 课程管理
        courseClass = require('./course/class'),
        insertClass = require('./course/insert'),
        allClass = require('./course/allClass'),
        demand = require('./course/demand'),
        examine = require('./course/examine');

    var main = {
        template: mainRender,
        components: {
            list: teacherList,
            detail: teacherDetail,

            insert: insert,
            update: update,
            infoList: infoList,

            class: courseClass,
            insertClass: insertClass,
            allClass: allClass,
            demand: demand,
            examine: examine
        }
    }

    return main;
});
