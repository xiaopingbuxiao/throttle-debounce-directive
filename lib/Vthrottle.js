import { on, off, toRawType } from './util'
import { throttle } from './throttle'

export default {
  install(Vue) {
    Vue.directive('throttle', {
      bind(el, binding) {
        let { value, arg = 'click' } = binding
        if (toRawType(value) === 'function') {
          value = {
            cb: value,
            wait: 300,
            leading: true,
            trailing: true
          }
        }
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