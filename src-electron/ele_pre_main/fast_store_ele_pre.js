import {contextBridge, ipcRenderer} from "electron";

contextBridge.exposeInMainWorld("hty_fast_store", {
  // 存储一个对象
  store_saveData(key, data) {
    ipcRenderer.send("store_saveData", key, data);
  },
  // 获取一个对象
  store_getData(key) {
    return ipcRenderer.sendSync("store_getData", key);
  },
  // 判断一个属性是否存在
  store_hasData(key) {
    return ipcRenderer.sendSync("store_hasData", key);
  },
  // 清空所有的数据
  store_clearData() {
    ipcRenderer.send("store_clearData");
    // store.clear();
    // console.log('清空数据')
  },

  // 从主进程接受，发送给渲染进程，key发送变化即其值
  store_onUpdate(key, new_value) {
    ipcRenderer.on(key + "_change", new_value);
  },
});
