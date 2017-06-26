// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'font-awesome/scss/font-awesome.scss'
import './scss/style.scss'
import Vuetify from 'vuetify'

Vue.use(VueAxios, axios)
Vue.use(Vuetify)
Vue.use(VueProgressBar, {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'left',
  inverse: false
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
