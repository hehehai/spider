import Vue from "vue";
import { ipcRenderer } from "electron";
import pluginExport from "@d2-projects/vue-table-export";

import App from "./App.vue";
import router from "./router";
import "./plugins/element";

Vue.config.productionTip = false;

Vue.prototype.$ipcRenderer = ipcRenderer;
Vue.use(pluginExport);

// ipcRenderer.on("demo-reply", function(event, arg) {
//   // 接收到Main进程返回的消息
//   const message = `异步消息回复: ${arg}`;
//   console.log(message);
// });

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
