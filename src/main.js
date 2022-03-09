import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import CountryFlag from 'vue-country-flag'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(CountryFlag)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
