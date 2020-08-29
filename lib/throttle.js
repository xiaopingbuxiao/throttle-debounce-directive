
/**
 * @param  {Function} func 需要节流的函数
 * @param  {Number} wait  时间
 * @param  {Object} options {leading:Boolean,trailing:Boolean} 首尾是否执行
 */
export function throttle(func, wait, options) {
  let timeout, context, args, result;
  let previous = 0;
  if (!options) options = {};
  wait = typeof wait === 'number' ? wait : 300
  let later = function () {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  let throttled = function () {
    let now = Date.now();
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
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}