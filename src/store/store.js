import Vue from 'vue'
import Vuex from 'vuex'
import userModel from './userModel'
Vue.use(Vuex)
 
export default new Vuex.Store({
  state:{
      token: 'tokentokentokentoken',
      isLogin: false,
  },
  mutations:{
    setLoginState(state, val) {
        state.isLogin = val;
    },
    setToken(state, token) {
      state.token = token
      localStorage.setItem("token", token)
    }
  },
  actions: {
    login({ commit }, user) {
      //登录请求
    }
  },
  modules: {
    userModel,
  },
})