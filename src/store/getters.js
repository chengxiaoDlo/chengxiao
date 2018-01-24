export default {
  youngList: state => {
    return state.ageList.slice(18, 61)
  },
  childList: () => {
    return state.ageList.slice(0, 31)
  },
  oldList: () => {
    return state.ageList.slice(40, 81)
  }
}
