// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import App from '@/App'
import store from '@/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuetify from 'vuetify'
import 'normalize/index.styl'
import 'roboto-npm-webfont'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import app from '../../../core/app'
import routerFactory from '@/router'

// Save the app for other components to access
store.commit('setApp', app)
const router = routerFactory()

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
  store,
  template: '<App/>',
  components: {
    App
  }
})
