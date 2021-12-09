import CacheBucket from './cacheBucket'
import ImgLazyLoad from './imgLazyLoad'

interface ParamsObj {
    [propName: string]: any
}
interface ThrottleOption {
    trailing ?: boolean,
    leading ?: boolean
}
//解析 URL 参数为对象
function parseParam(url: string) {
    let reg  = /.+\?(.+)$/.exec(url)
    const paramsStr = (reg && reg.length > 1) ? reg[1] : ''; // 将 ? 后面的字符串取出来
    const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
    let paramsObj: ParamsObj = {};
    // 将 params 存到对象中
    paramsArr.forEach(param => {
        if (/=/.test(param)) { // 处理有 value 的参数
            let [key, val] = param.split('='); // 分割 key 和 value
            val = decodeURIComponent(val); // 解码
            let res: any = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字
    
            if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
                paramsObj[key] = [].concat(paramsObj[key], res);
            } else { // 如果对象没有这个 key，创建 key 并设置值
                paramsObj[key] = res;
            }
        } else { // 处理没有 value 的参数
            paramsObj[param] = true;
        }
    })
    return paramsObj;
}

/**
 * 防抖
 * @param {*} func 执行的函数
 * @param {*} wait 等待的时间
 * @param {*} immediate 是否立即执行（马上执行一次，等待的时间重新执行后的下一次执行的时间）
 * @returns 
 */
function debounce(func: Function, wait: number, immediate: boolean) {
    let timeout: any, result: any;
    
    let debounced = function (this: any) {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            let callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) result = func.apply(context, args)
        } else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
        return result;
    };
    
    debounced.prototype.cancel = function() {//取消功能，相当于取消这一次的防抖功能
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}

/**
 * 节流
 * @param {*} func 执行的函数
 * @param {*} wait 等待的时间
 * @param {*} options 有两个参数 trailing结束后是否执行一次 leading是否立即执行
 * @returns 
 */
function throttle(func: Function, wait: number, options: ThrottleOption) {
    let timeout: any, context: any, args: any, result;
    let previous = 0;
    if (!options) options = {};

    let later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

    let throttled = function(this: any) {
        let now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        let remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };
    
    throttled.prototype.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    }
    return throttled;
}

/**
 * 深拷贝
 * @param target 目标对象
 * @param map 
 * @returns 
 */
function deepClone(target: any, map = new WeakMap()) {
    if (map.get(target)) {
        return target;
    }
    // 获取当前值的构造函数：获取它的类型
    let constructor = target.constructor;
    // 检测当前对象target是否与正则、日期格式对象匹配
    if (/^(RegExp|Date)$/i.test(constructor.name)) {
        // 创建一个新的特殊对象(正则类/日期类)的实例
        return new constructor(target);  
    }
    if (isObject(target)) {
        map.set(target, true);  // 为循环引用的对象做标记
        const cloneTarget: any = Array.isArray(target) ? [] : {};
        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                cloneTarget[prop] = deepClone(target[prop], map);
            }
        }
        return cloneTarget;
    } else {
        return target;
    }
}

const isObject = (target: any) => {
    return typeof target === 'object' && target !== null
}

export { parseParam, debounce, throttle, deepClone, CacheBucket, ImgLazyLoad }