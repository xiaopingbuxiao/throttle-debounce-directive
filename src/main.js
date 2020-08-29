import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import { Vdebounce, Vthrottle } from '../dist/index.esm.js'
Vue.use(Vdebounce)
Vue.use(Vthrottle)


new Vue({
  render: h => h(App),
}).$mount('#app')
