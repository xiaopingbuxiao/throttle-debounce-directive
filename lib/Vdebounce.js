import { debounce } from './debounce'
import { on, off, toRawType } from './util'

export default {
  install(Vue) {
    Vue.directive('debounce', {
      bind(el, binding) {
        let { value, arg = 'click', modifiers } = binding
        value = normalizeValue(value)
        el._eventListener = debounce(value.cb, value.wait, !!modifiers.immediate)
        on(el, arg, el._eventListener)
      },
      /* 修复key不规范时导致的bug */
      componentUpdated(el, binding) {
        if (binding.value === binding.oldValue) return
        let { value, arg = 'click', modifiers } = binding
        off(el, arg, el._eventListener)
        value = normalizeValue(value)
        el._eventListener = debounce(value.cb, value.wait, !!modifiers.immediate)
        on(el, arg, el._eventListener)
      },
      unbind(el, binding) {
        let { arg = 'click' } = binding
        off(el, arg, el._eventListener)
        el._eventListener = null
      }
    })
  }
}
function normalizeValue(value) {
  if (toRawType(value) === 'function') {
    value = {
      cb: value,
      wait: 300
    }
  }
  return value
}







