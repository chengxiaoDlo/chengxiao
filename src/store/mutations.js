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
  }
}

