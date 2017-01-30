/**
 * 公共工具方法
 * @author  WhyCoder
 * @date    2017-01-30
 */
define(function (require, exports) {
    'use strict'
    
    /**
     * 判断是否为object并且不是array
     * @param arg(Object)
     */
    function isObject(arg) {
        return (typeof(arg) === 'object') && (Array.isArray(arg) === false);
    }


    exports.isObject = isObject;
});