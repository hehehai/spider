import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import electron from "electron";
import router from './router'

Vue.config.productionTip = false;

Vue.prototype.$electron = electron;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
