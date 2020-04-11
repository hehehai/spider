import Vue from "vue";
import {
  Button,
  Upload,
  Table,
  TableColumn,
  Message,
  Loading,
  PageHeader
} from "element-ui";

Vue.use(Button);
Vue.use(Upload);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Loading);
Vue.use(PageHeader);

Vue.prototype.$message = Message;
