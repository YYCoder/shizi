/**
 * 公共工具方法
 * @author  WhyCoder
 * @date    2017-01-30
 */
define(function (require, exports) {
    'use strict';

    /**
     * 判断是否为object并且不是array
     * @param arg(Object)
     */
    function isObject(arg) {
        return (typeof(arg) === 'object') && (Array.isArray(arg) === false);
    }

    /**
     * 深度克隆
		 * @param  {Object}  [obj]   [要克隆的对象]
		 * @return {Object}  [克隆完成的对象]
     */
    function deepClone(o) {
      var res;
      if (typeof(o) !== 'object') {
          return o;
      }
      else if (o instanceof Array) {
          res = [];
          for (var i = 0; i < o.length; i++) {
              typeof(o[i]) === 'object' ? res[i] = deepClone(o[i])
                                        : res[i] = o[i];
          }
      }
      else {
          res = {};
          for(var k in o) {
              typeof(o[k]) === 'object' ? res[k] = deepClone(o[k])
                                        : res[k] = o[k];
          }
      }
      return res;
    }


    exports.isObject = isObject;
    exports.deepClone = deepClone;
});
