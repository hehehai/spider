import Vue from "vue";
import { Button, Upload, Table, TableColumn, Message } from "element-ui";

Vue.use(Button);
Vue.use(Upload);
Vue.use(Table);
Vue.use(TableColumn);

Vue.prototype.$message = Message;
