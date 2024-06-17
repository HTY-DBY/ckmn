import emitter from "events";
import {initialize} from "@electron/remote/main";
import {begin_http_fun, read_and_add_local_src,} from "app/src-electron/ele_pre_main/other_help.cjs";

const path = require("path");
let port_of_begin_server_first = 21556
let temp_value, temp_name, key
const folderPrefix = "ckmn_"

export function init_electron_main(store) {

  emitter.setMaxListeners(0);  // 设置 EventEmitter 的监听器数量限制
  process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";  // 禁用 Electron 的网络安全警告
  initialize(); // <-- 添加这个,启用 remote

  // 读取包在本地的存储
  key = "Lottery"
  read_and_add_local_src(key, [], store)
  key = "Analyse"
  read_and_add_local_src(key, [], store)

  // 分配 URL
  allocateURLs("Lottery");
  allocateURLs("Analyse");

  function allocateURLs(key) {
    let temp_value = store.get(key + '_src');
    for (let item of temp_value) {
      if (item?.Type === 'local' && item?.Folder) {
        begin_http_fun(port_of_begin_server_first, key, item?.Folder);
        item.URL = 'http://localhost:' + port_of_begin_server_first++;
      }
    }
    store.set(key + '_src', temp_value);
  }

  return {
    view_url: {
      L: store.get("view_url.L") || "", R: store.get("view_url.R") || "",
    },
  };
}
