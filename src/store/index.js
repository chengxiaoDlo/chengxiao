import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goToStart: false,
    stopScroll: false,
    done: false,
    showAgePicker: false,
    showCityPicker: false,
    showKeyBoard: false,
    chooseList: [],
    defaultAge: '',
    selectedAge: '',
    inputNumber: '',
    progress: 0,
    info: {
      sex: '',
      age: '',
      smoke: false,
      socialSecurity: true,
      income: '',
      familyDebt: '',
      family: []
    },
    ageList: []
  },
  actions,
  mutations,
  getters
})
