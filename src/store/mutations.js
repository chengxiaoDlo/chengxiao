import types from './types'

export default {
  [types.GET_START] (state) {
    state.goToStart = true
  },
  [types.TOGGLE_DONE] (state) {
    state.done = !state.done
  }
}
