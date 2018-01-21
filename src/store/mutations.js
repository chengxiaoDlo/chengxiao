import types from './types'

export default {
  [types.GET_START] (state) {
    state.goToStart = true
  },
  [types.TOGGLE_DONE] (state) {
    state.done = !state.done
  },
  [types.NEXT] (state) {
    if (state.progress === state.index) {
      state.progress++
    }
  },
  [types.SET_INDEX] (state, payload) {
    state.index = payload.data
  },
  [types.CHOOSE_SEX] (state, payload) {
    state.info.sex = payload.data
  },
  [types.SELECT_MEMBERS] (state, paload) {
    state.info.family = paload.data
  }
}

