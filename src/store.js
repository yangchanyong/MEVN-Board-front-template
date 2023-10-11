import Vue from '@vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    accessToken: null,
    refreshToken: null
  },
  getters(state) {
    return state.refreshToken != null;
  }
})