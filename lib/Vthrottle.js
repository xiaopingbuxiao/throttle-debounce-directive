import { on, off, toRawType } from './util'
import { throttle } from './throttle'

export default {
  install(Vue) {
    Vue.directive('throttle', {
      bind(el, binding) {
        let { value, arg = 'click' } = binding
        value = normalizeValue(value)
        el._eventListener = throttle(value.cb, value.wait, value)
        on(el, arg, el._eventListener)
      },
      componentUpdated(el, binding) {
        if (binding.value === binding.oldValue) return
        let { value, arg = 'click' } = binding
        off(el, arg, el._eventListener)
        value = normalizeValue(value)
        el._eventListener = throttle(value.cb, value.wait, value)
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
      wait: 300,
      leading: true,
      trailing: true
    }
  }
  return value
}