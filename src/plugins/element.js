import {ElButton} from "element-plus";
import locale from "element-plus/lib/locale";

export default (app) => {
  locale.use(lag);
  app.use(ElButton);
};
