import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goToStart: false,
    stopScroll: false,
    done: false,
    index: 0,
    progress: 0,
    info: {
      sex: '',
      age: '',
      smoke: false,
      socialSecurity: true,
      income: '',
      family: []
    }
  },
  actions,
  mutations
})
