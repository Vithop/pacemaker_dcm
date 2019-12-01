import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import bcrypt from "bcrypt";

Vue.use(Vuex);
const saltRounds = 10;

const vuexPersist = new VuexPersist({
  key: "app",
  storage: window.localStorage
});

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    users: ["admin"],
    passwords: ["password123"],
    currentUser: "",
    //newUsers should replace users once working
    newUsers:{
      "admin":{
        paceType:"AOO",
        lowerRateLimit:0,
        upperRateLimit:0,
        atricalPulseAmp:0,
        atricalPulseWidth: 0.5,
        atricalRefractoryPeriod: 200,
        VentricularPulseAmp: 4.0,
        VentricularPulseWidth: 0.5,
        PVARP: 200,
        HRL: true
      }
    },
    streamMode: [0x55, 0x22] // Set or Echo
  }, 
  mutations: {
    signUp(state, payload) {
      state.users.push(payload.username);
      state.passwords.push(payload.password);
      state.currentUser = payload.username;
      state.newUsers[payload.username] = payload.pacemakerParameters;
    },
    setCurrentUsers(state, username) {
      state.currentUser = username;
    },
    setProgramableParameters(state, payload){
      state.newUsers[state.currentUser] = 
      {
        paceType:payload.paceType,
        lowerRateLimit:payload.lowerRateLimit,
        upperRateLimit:payload.upperRateLimit,
        atricalPulseAmp:payload.atricalPulseAmp,
        atricalPulseWidth: payload.atricalPulseWidth,
        atricalRefractoryPeriod: payload.atricalRefractoryPeriod,
        VentricularPulseAmp: payload.VentricularPulseAmp,
        VentricularPulseWidth: payload.VentricularPulseWidth,
        PVARP: payload.PVARP,
        HRL: payload.HRL
      };
    }
  },
  actions: {
    signUp({ commit }, payload) {
      bcrypt.hash(payload.password, saltRounds).then(hash => {
        commit("signUp", {
          username: payload.username,
          password: hash,
          pacemakerParameters: {
            paceType:"AOO",
            lowerRateLimit:0,
            upperRateLimit:0,
            atricalPulseAmp:0,
            atricalPulseWidth: 0.5,
            atricalRefractoryPeriod: 200,
            VentricularPulseAmp: 4.0,
            VentricularPulseWidth: 0.5,
            PVARP: 200,
            HRL: true
          }
        });
      });
    },
    login({ commit, state }, payload) {
      return new Promise(resolve => {
        // console.log(state.users);
        // console.log(payload);
        var userIndex = state.users.indexOf(payload.username);
        //console.log("userIndex", userIndex);
        if (userIndex != -1) {
          if(userIndex == 0){
            if(state.passwords[userIndex] == payload.password){
              commit("setCurrentUsers", payload.username);
              resolve("Admin Has Logged In!")
            }
          }
          bcrypt
            .compare(payload.password, state.passwords[userIndex])
            .then(res => {
              if (res) {
                commit("setCurrentUsers", payload.username);
                resolve("Login Succesfull!");
              } 
            })
            .catch((err) =>{
              console.log(err);
              throw err;
            });
            throw new Error("Password is Incorrect!");
        } else {
          throw new Error("User doesn't exist!! Go Sign Up!");
        }
      });
    },
    logout({ commit }) {
      commit("setCurrentUsers", "");
    },
    saveUsersParameters({commit}, payload){
      commit("setProgramableParameters", payload);
      //Use promise to send serial data
      // return new Promise(resolve =>{
      //   resolve("User Parameters saved succesfully!");
      // });
    }

  },
  modules: {}
});
