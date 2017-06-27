import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    app: null
  },
  modules: {
    setApp (state, app) {
      state.app = app
    }
  }
})

export default store
