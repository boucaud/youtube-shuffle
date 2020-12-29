import Vue from "vue";
import App from "@components/core/App/";
import vuetify from "./plugins/vuetify";
import store from "@store"

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
