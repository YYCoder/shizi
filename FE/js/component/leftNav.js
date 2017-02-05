/**
 * 左导组件
 * @author  WhyCoder
 * @date    2017-02-06
 */
define(function (require, exports) {

    var leftNavRender = require('text!../template/leftNav.tpl');

    var leftNav = {
        template: leftNavRender,
        props: {
            // 用户的权限
            rights: {
                type: Object,
                default: function () {
                    return {
                        'info': '0',
                        'course': '0',
                        'work': '0',
                        'train': '0',
                        'assessment': '0',
                        'comment': '0'
                    }
                }
            }
        },
        data: function () {
            return {

            };
        },
        methods: {

        }
    };

    return leftNav;
});


