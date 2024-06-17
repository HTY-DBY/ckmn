const {ipcRenderer, contextBridge} = require("electron");
const Store = require("electron-store");
const path = require("path");

contextBridge.exposeInMainWorld("electron", {
  messageOn: (callback) => ipcRenderer.on("message:toRender", callback),
  messageSend: (...args) => ipcRenderer.send("message:toMain", ...args),
});

// 连接存储位置
const save_where = "proData_save/config";
const store = new Store({cwd: path.join(process.cwd(), save_where)});

// 监听全局鼠标滚轮事件
window.addEventListener("wheel", function (event) {
  // 检查是否按下了Ctrl键
  if (event.ctrlKey) {
    // 阻止默认的滚动行为
    // event.preventDefault();

    // 判断滚轮滚动方向
    let scroll_value = event.deltaY > 0 ? 0.05 : -0.05;

    let key = "view_Zoom.R";
    // 进行计算并限制在 0.25 到 5 之间
    let value = Math.max(0.25, Math.min(store.get(key) - scroll_value, 5));
    value = +value.toFixed(2);
    ipcRenderer.send("store_saveData", key, value);
    ipcRenderer.send("view_setZoom", [key, value]);
  }
}, {passive: true});

