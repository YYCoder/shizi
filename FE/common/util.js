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

    /**
     * 将下划线格式转成驼峰格式
     * @param  {String} str [要转换的字符串]
     * @return {String}     [转换完成的字符串]
     */
    function toCamel(str) {
    	return str.replace(/_\w/g, function (match) {
    		return match.slice(1).toUpperCase();
    	});
    }


    /**
     * 以'/'将url分段,返回url中除域名之外的指定段的字符串,从1开始,未获取到返回空字符串
     * @param  {String} num [指定的url段的索引]
     * @return {String}     [指定的url段]
     */
    function segment(num) {
      var url_arr = location.pathname.split('/');
      // 去掉域名
      url_arr.shift();
      return url_arr[num - 1] || '';
    }


    exports.isObject = isObject;
    exports.deepClone = deepClone;
    exports.toCamel = toCamel;
    exports.segment = segment;
});
