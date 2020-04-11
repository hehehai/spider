import Vue from "vue";
import {
  Button,
  Upload,
  Table,
  TableColumn,
  Message,
  Loading,
  PageHeader,
  Drawer
} from "element-ui";

Vue.use(Button);
Vue.use(Upload);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Loading);
Vue.use(PageHeader);
Vue.use(Drawer);

Vue.prototype.$message = Message;
