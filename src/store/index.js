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
    //userData should replace users once working
    userData:{
      "admin":{
        paceType: "AOO",
        lowerRateLimit: 30,
        upperRateLimit: 120,
        maxSensorRate: 120,
        fixedAvDelay: 150,
        atricalPulseAmp: 2.0,
        atricalPulseWidth: 0.5,
        atricalSensitivity: 2.5,
        ARP: 250,
        ventricularPulseAmp: 4.0,
        ventricularPulseWidth: 0.5,
        ventricularSensitivity: 2.5,
        VRP: 320,
        PVARP: 200,
        HRL: 0,
        rateSmoothing: 0,
        activityThreshold: "Med",
        reactTime: 30,
        resFactor: 8,
        recoveryTime: 5
      }
    },
    streamMode: [0x55, 0x22] // Set or Echo
  }, 
  mutations: {
    signUp(state, payload) {
      state.users.push(payload.username);
      state.passwords.push(payload.password);
      state.currentUser = payload.username;
      state.userData[payload.username] = payload.pacemakerParameters;
    },
    setCurrentUsers(state, username) {
      state.currentUser = username;
    },
    setPaceType(state, val){
      state.userData[state.currentUser].paceType = val;
    },
    setLowerRateLimit(state, val){
      state.userData[state.currentUser].lowerRateLimit = val;
    },
    setUpperRateLimit(state, val){
      state.userData[state.currentUser].upperRateLimit = val;
    },
    setMaxSensorRate(state, val){
      state.userData[state.currentUser].maxSensorRate = val;
    },
    setFixedAvDelay(state, val){
      state.userData[state.currentUser].fixedAvDelay = val;
    },
    setAtricalPulseAmp(state, val){
      state.userData[state.currentUser].atricalPulseAmp = val;
    },
    setAtricalPulseWidth(state, val){
      state.userData[state.currentUser].atricalPulseWidth = val;
    },
    setAtricalSensitivity(state, val){
      state.userData[state.currentUser].atricalSensitivity = val;
    },
    setARP(state, val){
      state.userData[state.currentUser].ARP = val;
    },
    setVentricularPulseAmp(state, val){
      state.userData[state.currentUser].ventricularPulseAmp = val;
    },
    setVentricularPulseWidth(state, val){
      state.userData[state.currentUser].ventricularPulseWidth = val;
    },
    setVentricularSensitivity(state, val){
      state.userData[state.currentUser].ventricularSensitivity = val;
    },
    setVRP(state, val){
      state.userData[state.currentUser].VRP = val;
    },
    setPVARP(state, val){
      state.userData[state.currentUser].PVARP = val;
    },
    setHRL(state, val){
      state.userData[state.currentUser].HRL = val;
    },
    setRateSmoothing(state, val){
      state.userData[state.currentUser].rateSmoothing = val;
    },
    setActivityThreshold(state, val){
      state.userData[state.currentUser].activityThreshold = val;
    },
    setReactTime(state, val){
      state.userData[state.currentUser].reactTime = val;
    },
    setResFactor(state, val){
      state.userData[state.currentUser].resFactor = val;
    },
    setRecoveryTime(state, val){
      state.userData[state.currentUser].recoveryTime = val;
    },
  },
  actions: {
    signUp({ commit }, payload) {
      bcrypt.hash(payload.password, saltRounds).then(hash => {
        commit("signUp", {
          username: payload.username,
          password: hash,
          pacemakerParameters: {
            paceType: "AOO",
            lowerRateLimit: 30,
            upperRateLimit: 120,
            maxSensorRate: 120,
            fixedAvDelay: 150,
            atricalPulseAmp: 2.0,
            atricalPulseWidth: 0.5,
            atricalSensitivity: 2.5,
            ARP: 250,
            ventricularPulseAmp: 4.0,
            ventricularPulseWidth: 0.5,
            ventricularSensitivity: 2.5,
            VRP: 320,
            PVARP: 200,
            HRL: 0,
            rateSmoothing: 0,
            activityThreshold: "Med",
            reactTime: 30,
            resFactor: 8,
            recoveryTime: 5
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
    saveUsersParameters(){

      //Use promise to send serial data
      // return new Promise(resolve =>{
      //   resolve("User Parameters saved succesfully!");
      // });
    }

  },
  modules: {}
});
