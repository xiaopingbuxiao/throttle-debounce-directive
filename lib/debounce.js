/**
 * @param {Function} cb 需要防抖的函数
 * @param {Number} wait 时间
 * @param {Boolean} immediate 时候立即执行
 * @returns {Function}  包含一个取消的方法
 */
export function debounce(cb, wait, immediate) {
  let timer, result;
  wait = typeof wait === 'number' ? wait : 300
  immediate = !!immediate
  const debounced = function () {
    const that = this;
    const args = arguments;
    const later = function () {
      timer = null;
      if (!immediate) result = cb.apply(that, args);
    }
    const callNow = immediate && !timer;
    clearTimeout(timer);
    timer = setTimeout(later, wait);
    callNow && (result = cb.apply(that, args))
    return result
  }
  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null
  }
  return debounced
}