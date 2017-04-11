/**
 * 公共ui控件
 * @author  WhyCoder
 * @date    2017-01-30
 */
define(function (require, exports) {
    'use strict';

    var layer = require('layer');
    var util = require('util');

    /**
     * 表单验证tips弹层
     * @param msg(String): 弹层信息
     * @param follow(Object||String): 弹层依附元素||依附元素选择器
     * @param guide(Number): 弹层依附方向(1上, 2右, 3下, 4左)
     * @param bg(String): 弹层背景色
     * @param time(Number): 弹层自动关闭时间(ms)
     */
    function tips(opt) {
        if (util.isObject(opt) && opt.msg && opt.follow) {
            layer.open({
                type: 4,
                content: [opt.msg, opt.follow],
                time: opt.time || 2000,
                tips: [opt.guide || 3, opt.bg || '#000'],
                shade: 0,
                closeBtn: 0,
                fixed: false
            });
        }
        else {
            console.warn('请传入正确的参数');
        }
    }

    /**
     * 加载中弹层
     */
    function loading() {
        layer.open({
            type: 3,
            icon: 2,
            shade: [0.5, '#000']
        });
    }

    /**
     * 关闭所有弹层
     * @param type(String): 要关闭的弹层类型,如 'loading'
     */
    function closeAll(type) {
        layer.closeAll(type);
    }

    /**
     * 信息弹层(需点击确认)
     * @param title(String): 提示信息标题(默认为false, 即没有标题)
     * @param msg(String): 提示信息内容
     * @param btn(Array||String) [若为Array则表示多个按钮, 从第一个到最后一个为文案; 若为String则默认为只有一个按钮]
     * @param btn(2,3....n)[Function] [从第二个按钮开始的回调函数, 第一个按钮是yes]
     * @param yes(Function): 点击确定的回调函数
     * @param cancel(Function): 点击关闭按钮的回调函数
     * 注: (1)也可以只传字符串, 则为没有标题的信息弹层;
     *     (2)若有多个btn, btn2开始的回调必须在cancel和yes回调的后面设置, 否则点击后触发的回调会不对, 原因未知.
     */
    function info(opt) {
        var config;
        if (util.isObject(opt) && opt.msg) {
            config = {
                title: opt.title || false,
                content: opt.msg,
                btn: opt.btn,
                yes: function (index, layerDOM) {
                    opt.yes && opt.yes();
                    layer.close(index);
                },
                cancel: function (index, layerDOM) {
                    opt.cancel && opt.cancel();
                    layer.close(index);
                }
            };
            // 多个按钮的回调函数
            for (var k in opt) {
                if (/^btn\d+/.test(k) && typeof(opt[k]) === 'function') {
                    config[k] = function (index, layerDOM) {
                        opt[k]();
                        layer.close(index);
                    };
                }
            }
            layer.open(config);
        }
        else if (typeof(opt) === 'string') {
            layer.open({
                title: false,
                content: opt
            });
        }
        else {
            console.warn('请传入正确的参数');
        }
    }

    /**
     * 信息正确弹层(不用点击确认,自动消失)
     * @param msg(String): 提示信息内容
     * @param fun(Function): 提示框消失后的回调函数
     * 注: 也可以只传字符串,则没有回调
     */
    function msgRight(opt) {
        var param = {
            icon: 6,
            time: 2000
        };
        if (util.isObject(opt) && opt.msg) {
            layer.msg(opt.msg, param, function () {
                typeof(opt.fun) === 'function' && opt.fun();
            });
        }
        else if (typeof(opt) === 'string') {
            layer.msg(opt, param);
        }
        else {
            console.warn('请传入正确的参数');
        }
    }

    /**
     * 信息错误弹层(不用点击确认,自动消失)
     * @param msg(String): 提示信息内容
     * @param fun(Function): 提示框消失后的回调函数
     * 注: 也可以只传字符串,则没有回调
     */
    function msgError(opt) {
        var param = {
            icon: 5,
            time: 2000
        };
        if (util.isObject(opt) && opt.msg) {
            layer.msg(opt.msg, param, function () {
                typeof(opt.fun) === 'function' && opt.fun();
            });
        }
        else if (typeof(opt) === 'string') {
            layer.msg(opt, param);
        }
        else {
            layer.msg('网络异常', param);
        }
    }


    exports.tips = tips;
    exports.loading = loading;
    exports.info = info;
    exports.msgRight = msgRight;
    exports.msgError = msgError;
    exports.closeAll = closeAll;

});
