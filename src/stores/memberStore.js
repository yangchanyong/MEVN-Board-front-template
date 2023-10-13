import router from "@/router";
import axios from "axios";

const memberStore = {
  state: {
    accessToken: null,
    refreshToken: null,
    isLogin: false
  },
  mutations: {
    loginSuccess: function(state, payload) {
      state.refreshToken = payload.refreshToken;
      state.accessToken = payload.accessToken;
      state.isLogin = true;
    },
    logout: function(state) {
      state.refreshToken = null;
      state.accessToken = null;
      state.isLogin = false;
    }
  },
  actions: {
    login(dispatch, loginObj) {
      axios
        .post("/api/auth/login", loginObj)
        .then((res) => {
          const accessToken = res.data.data.accessToken;
          const refreshToken = res.data.data.refreshToken;
          this.dispatch("");
        });
    }
  }
};