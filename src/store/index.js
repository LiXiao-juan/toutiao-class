import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken, getART, setART } from '@/utils'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: getToken() || {},
    ArtId: getART() || ''
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      setToken(payload)
    },
    setArtId (state, id) {
      state.ArtId = id
      setART(id)
    }
  }
})
