export default {
  youngList: state => {
    return state.ageList.slice(18, 61)
  },
  childList: state => {
    return state.ageList.slice(0, 31)
  },
  oldList: state => {
    return state.ageList.slice(40, 81)
  }
}
