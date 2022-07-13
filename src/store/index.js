import Vue from 'vue'
import Vuex from 'vuex'
// Vuex + 本地存储（用插件做yarn add vuex-persist ） 做数据持久化
import VuexPersistence from 'vuex-persist'
import user from './modules/user'
import getters from './getters'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存token
    token: ''
  },
  mutations: {
    // 存token
    setUser (state, payload) {
      state.token = payload
    }
  },
  getters,
  modules: {
    user
  },
  plugins: [vuexLocal.plugin]
})
