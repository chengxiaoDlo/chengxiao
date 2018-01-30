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
    isModify: false,
    city: {
      name: '请选择',
      value: ''
    },
    chooseList: null,
    defaultAge: [],
    defaultCity: [],
    selectedAge: '',
    inputNumber: '',
    progress: 0,
    info: {
      sex: '',
      age: '',
      smoke: false,
      socialSecurity: true,
      income: '',
      familyIncome: 0,
      familyDebt: '',
      family: []
    },
    ageList: []
  },
  actions,
  mutations,
  getters
})
