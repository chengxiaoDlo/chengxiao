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
  [types.TOGGLE_KEYBOARD] (state) {
    state.showKeyBoard = !state.showKeyBoard
  },
  [types.TOGGLE_PICKER] (state) {
    state.showPicker = !state.showPicker
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
  },
  [types.ADD_RESIDENCE] (state, payload) {
    state.info.residence = payload.data
    state.info.family.forEach(item => {
      item.residence = payload.data
    })
  },
  [types.ADD_INCOME] (state, payload) {
    payload.data.forEach(item1 => {
      if (item1.tag === 'debt') {
        state.info.familyDebt = item1.value === '房贷、车贷等' ? 0 : item1.value
      } else if (item1.tag === 'me') {
        state.info.income = item1.value
        state.info.familyIncome += item1.value
      } else if (item1.tag === 'spouse') {
        state.info.family.forEach(item2 => {
          if (item2.labelName === '配偶') {
            item2.income = item1.value
            state.info.familyIncome += item2.value
          }
        })
      }
    })
  },
  [types.ADD_SMOKE] (state, payload) {
    payload.data.forEach(item1 => {
      if (item1.text === '本人') {
        state.info.isSmoking = item1.smoke
      } else if (item1.text === '配偶') {
        state.info.family.forEach(item2 => {
          if (item2.labelName === '配偶') {
            item2.isSmoking = item1.smoke
          }
        })
      }
    })
  },
  [types.INIT_AGE_LIST] (state) {
    for (let i = 0; i < 81; i++) {
      state.ageList.push({
        name: i,
        value: i
      })
    }
  }
}


