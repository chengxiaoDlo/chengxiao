import types from './types'

export default {
  [types.GET_START] (state) {
    state.goToStart = true
  },
  [types.TOGGLE_DONE] (state) {
    state.done = !state.done
  },
  [types.NEXT] (state, payload) {
    state.progress = payload.data
  },
  [types.SET_INDEX] (state, payload) {
    state.index = payload.data
  },
  [types.CHOOSE_SEX] (state, payload) {
    state.info.sex = payload.data
  },
  [types.SELECT_MEMBERS] (state, payload) {
    state.info.family = payload.data
  },
  [types.STOP_SWIPER] (state) {
    state.stopScroll = true
  },
  [types.USE_SWIPER] (state) {
    state.stopScroll = false
  },
  [types.ADD_AGE] (state, payload) {
    payload.data.forEach(item1 => {
      if (item1.labelName === '本人') {
        state.info.age = item1.value
      }
      state.info.family.forEach(item2 => {
        if (item2.labelName === item1.labelName) {
          item2.age = item1.value
        }
      })
    })
  },
  [types.ADD_SOCIAL] (state, payload) {
    payload.data.forEach(item1 => {
      if (item1.labelName === '本人') {
        state.info.socialSecurity = item1.socialSecurity
      }
      state.info.family.forEach(item2 => {
        if (item2.labelName === item1.labelName) {
          item2.hasSocialInsurance = item1.socialSecurity
        }
      })
    })
    console.log(999, state.info.family)
  }
}

