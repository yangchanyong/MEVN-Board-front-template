import Vuex from "vuex";


const loginStore = new Vuex.Store({
  state: {
    accessToken: null,
    refreshToken: null,
    isLogin: false
  },
  getters: {
    isLogin(state) {
      // refreshToken만 있을경우 accessToken을 발급받는 axios로 전송하는 코드 작성해야함
      return !!(state.accessToken && state.refreshToken);
    }
  },
  // mutations or actions에서 setTimeout 해줘야함 (refresh : 14d, access: 1h)
  // mutations: {
  //   setToken(state, {_accessToken, _refreshToken}) {
  //     state.accessToken = _accessToken;
  //     state.refreshToken = _refreshToken;
  //   }
  // },
  mutations: {
    setToken(state, response) {
      state.accessToken = response.data.data.accessToken;
      state.refreshToken = response.data.data.refreshToken;
    }
  },
  actions: {
    setToken: ({ commit }, { _accessToken, _refreshToken }) => {
      commit("setToken", { _accessToken, _refreshToken });
    }
  }
});

export default loginStore;

