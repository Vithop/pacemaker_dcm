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
    devicePort: null,
    isPaceMakerConnected: false,
    //userData should replace users once working
    userData:{
      admin:{
        paceType: "AOO",
        lowerRateLimit: 50,
        upperRateLimit: 120,
        BPM:60,
        atricalPulseAmp: 50,
        atricalPulseWidth: 2,
        ventricularPulseAmp: 50,
        ventricularPulseWidth: 2,
        fixedAvDelay: 150,
        ARP: 250,
        VRP: 320,
        maxSensorRate: 120,
        atricalSensitivity: 2.5,
        ventricularSensitivity: 2.5,
        PVARP: 200,
        HRL: 0,
        rateSmoothing: 0,
        activityThreshold: "Med",
        reactTime: 30,
        resFactor: 8,
        recoveryTime: 5
      }
    },
  }, 
  mutations: {
    signUp(state, payload) {
      // console.log(payload.username);
      // console.log(payload.password);
      state.users.push(payload.username);
      state.passwords.push(payload.password);
      //state.currentUser = payload.username;
      state.userData[payload.username] = payload.pacemakerParameters;
    },
    setCurrentUsers(state, username) {
      state.currentUser = username;
    },
    setDevicePort(state, val){
      state.devicePort = val;
    },
    setIsPaceMakerConnected(state, connected){
      state.isPaceMakerConnected = connected;
    },
    setPaceType(state, val){
      //console.log("Mutate pacetype " + val);
      state.userData[state.currentUser].paceType = val;
    },
    setLowerRateLimit(state, val){
      state.userData[state.currentUser].lowerRateLimit = val;
    },
    setUpperRateLimit(state, val){
      state.userData[state.currentUser].upperRateLimit = val;
    },
    setBPM(state, val){
      state.userData[state.currentUser].BPM = val;
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
    setVRP(state, val){
      state.userData[state.currentUser].VRP = val;
    },
    setMaxSensorRate(state, val){
      state.userData[state.currentUser].maxSensorRate = val;
    },
    setVentricularSensitivity(state, val){
      state.userData[state.currentUser].ventricularSensitivity = val;
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
    }
  },
  actions: {
    signUp({ commit }, payload) {
      return new Promise(resolve =>{
        console.log("do signUp");
        bcrypt.hash(payload.password, saltRounds).then(hash => {
          commit("signUp", {
            username: payload.username,
            password: hash,
            pacemakerParameters: {
              paceType: "AOO",
              lowerRateLimit: 50,
              upperRateLimit: 120,
              BPM:60,
              atricalPulseAmp: 50,
              atricalPulseWidth: 2,
              ventricularPulseAmp: 50,
              ventricularPulseWidth: 2,
              fixedAvDelay: 150,
              ARP: 250,
              VRP: 320,
              maxSensorRate: 120,
              atricalSensitivity: 2.5,
              ventricularSensitivity: 2.5,
              PVARP: 200,
              HRL: 0,
              rateSmoothing: 0,
              activityThreshold: "Med",
              reactTime: 30,
              resFactor: 8,
              recoveryTime: 5
            }
          });
        })
        .then(()=> {
          console.log("done sign up")
          resolve("SignUp succes");
        })
        .catch(err =>{
          console.log(err);
        });
      });

    },
    login({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        
        var userIndex = state.users.indexOf(payload.username);
        console.log("userIndex", userIndex);
        if (userIndex != -1) {
          if(userIndex == 0){
            if(state.passwords[userIndex] == payload.password){
              commit("setCurrentUsers", payload.username);
              resolve("Admin Has Logged In!")
            }else{
              throw new Error("Password is Incorrect!");
            }
          }
          bcrypt
            .compare(payload.password, state.passwords[userIndex])
            .then(res => {
              if (res) {
                console.log("Logic Success!")
                commit("setCurrentUsers", payload.username);
                resolve("Login Succesfull!");
              }else{
                reject(Error("Password is Incorrect!"));
              }
            })
            .catch((err) =>{
              console.log(err);
              throw err;
            });
        } else {
          throw new Error("User doesn't exist!! Go Sign Up!");
        }
      });
    },
    logout({ commit }) {
      commit("setCurrentUsers", "");
    },

  },
  modules: {}
});
