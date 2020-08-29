import { debounce } from './debounce'
import { on, off } from './util'

export default {
  install(Vue) {
    Vue.directive('debounce', {
      bind(el, binding) {
        let { value, arg = 'click', modifiers } = binding
        if (typeof value === 'function') {
          value = {
            cb: value,
            wait: 300
          }
        }
        el._eventListener = debounce(value.cb, value.wait, !!modifiers.immediate)
        on(el, arg, el._eventListener)
      },
      unbind(el, binding) {
        let { arg = 'click' } = binding
        off(el, arg, el._eventListener)
      }
    })
  }
}








