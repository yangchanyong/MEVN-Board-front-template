import Vuex from "vuex";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
export const useAppStore = new Vuex.Store( {
  state: () => ({
    bootstrap,
  }),
});
