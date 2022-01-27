import { createStore } from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import state from './state'

// 调用createStore
export default createStore({
  getters,
  actions,
  mutations,
  state
})