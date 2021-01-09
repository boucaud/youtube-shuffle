import Vue from "vue";
import App from "@components/core/App/";
import vuetify from "./plugins/vuetify";
import VueMeta from "vue-meta";

import store from "@store";

Vue.config.productionTip = false;

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true,
});

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
