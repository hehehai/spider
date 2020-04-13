import Vue from "vue";
import { ipcRenderer } from "electron";
import pluginExport from "@d2-projects/vue-table-export";

import App from "./App.vue";
import router from "./router";
import "./plugins/element";

Vue.config.productionTip = false;

Vue.prototype.$ipcRenderer = ipcRenderer;
Vue.use(pluginExport);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
