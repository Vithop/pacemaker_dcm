import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users:[],
    passwords:[],
    currentUser:''

  },
  mutations: {
    signUp ({state}, username, password){
      state.users.push(username)
      state.passwords.push(password)
      state.currentUser = username;
    }
  },
  actions: {
    signUp({commit}, username, password){
      commit('signUp',{username, password})
    }
  },
  modules: {
  }
})
