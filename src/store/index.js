import Vue from "vue";
import Vuex from "vuex";

import state from "@store/state";

Vue.config.devtools = true;
Vue.use(Vuex);

export const ROOT_STATE = {
  modules: {
    state,
  },
};

export default new Vuex.Store(ROOT_STATE);
