import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [],
    popupState: {
      isShow: false,
      action: '',
      data: null,
      noteId: null,
      text: ''
    }
  },
  actions,
  mutations,
  getters
})