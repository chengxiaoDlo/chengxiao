import types from './types'

export default {
  [types.GET_START] (state) {
    state.goToStart = true
  },
  [types.TOGGLE_NEXT] (state) {
    state.next = !state.next
  }
}
