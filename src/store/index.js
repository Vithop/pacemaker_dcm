import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users:['admin'],
    passwords:['password123'],
    currentUser:''
  },
  mutations: {
    signUp (state, payload){
      state.users.push(payload.username)
      state.passwords.push(payload.password)
      state.currentUser = payload.username;
    },
    setCurrentUsers(state,username){
      state.currentUser = username
    }
  },
  actions: {
    signUp({commit}, payload){
      // TODO: Add encrytion here and in login 
      // TODO: Add local storage 
      commit('signUp',{username : payload.username, password: payload.password})
    },
    login({commit, state}, payload){
      return new Promise((resolve) =>{
        console.log(state.users)
        console.log(payload)
        var userIndex = state.users.indexOf(payload.username);
        console.log("userIndex", userIndex)
        if(userIndex != -1){
          if (state.passwords[userIndex] == payload.password ){
            commit('setCurrentUsers', payload.username)
            resolve("Login Succesfull!")
          }else{
            throw new Error("Password is Incorrect!")
          }
        }else{
          throw new Error("User doesn't exist!! Go Sign Up!")
        }
      })
    },
    logout({commit}){
      commit('setCurrentUsers','')
    }
  },
  modules: {
  }
})
