import Vue from "vue";
import {
  Button,
  Upload,
  Table,
  TableColumn,
  Notification,
  Loading,
  PageHeader,
  Drawer,
  Progress
} from "element-ui";

Vue.use(Button);
Vue.use(Upload);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Loading);
Vue.use(PageHeader);
Vue.use(Drawer);
Vue.use(Progress);

Vue.prototype.$notify = Notification;
