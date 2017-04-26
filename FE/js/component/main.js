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
        courseDemand = require('./course/demand'),
        courseExamine = require('./course/examine'),
    // 工作量管理
    // 培训管理
        trainDemand = require('./train/demand'),
        trainApply = require('./train/apply'),
        trainFeedback = require('./train/feedback'),
        trainMyFeedback = require('./train/myFeedback'),
        trainExamineApply = require('./train/examineApply'),
        trainExamineFeedback = require('./train/examineFeedback'),
    // 考核管理
        assessInsert = require('./assess/insert'),
        assessCheck = require('./assess/check');

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
            courseDemand: courseDemand,
            courseExamine: courseExamine,

            trainDemand: trainDemand,
            trainApply: trainApply,
            trainFeedback: trainFeedback,
            trainMyFeedback: trainMyFeedback,
            trainExamineApply: trainExamineApply,
            trainExamineFeedback: trainExamineFeedback,

            assessInsert: assessInsert,
            assessCheck: assessCheck
        }
    }

    return main;
});
