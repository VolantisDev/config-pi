import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    app: null,
    routes: {}
  },
  mutations: {
    setApp (state, app) {
      state.app = app
    },
    setRoutes (state, routes) {
      state.routes = routes
    }
  }
})

export default store
