import Vue from "vue";
import Vuex from "vuex";

import player from "@store/player";
import controls from "@store/controls";

Vue.config.devtools = true;
Vue.use(Vuex);

export const ROOT_STATE = {
  modules: {
    player,
    controls,
  },
};

export default new Vuex.Store(ROOT_STATE);
