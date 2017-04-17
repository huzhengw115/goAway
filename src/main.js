// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from './common/js/http'
import router from './router'
import './common/css/index.css'
import store from '../store'

Vue.config.productionTip = false
Vue.use(axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
