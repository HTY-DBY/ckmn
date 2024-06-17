import {contextBridge, ipcRenderer} from "electron";
import {BrowserWindow} from "@electron/remote";
import path from "path";

contextBridge.exposeInMainWorld("hty_pro_control", {
  // 发送图片url
  copy_img: (callback) => ipcRenderer.on("copy_img", callback),

  // 渲染进程发送到主线程 通用写法
  ipcSend: (name, value) => ipcRenderer.send(name, value),

  // 渲染进程发送到主线程，接收返回 同步写法
  ipcSend_and_get: (name, value) => ipcRenderer.sendSync(name, value),

  ipcSend_and_get_invoke: (name, value) => ipcRenderer.invoke(name, value),

  // 渲染进程监听主进程，主进程发送信息到渲染进程
  onUpdateCounter: (name, callback) => ipcRenderer.on(name, callback),

  // 窗口最小化
  minimize: () => BrowserWindow.getFocusedWindow().minimize(),

  // 窗口最大化
  toggleMaximize() {
    const win = BrowserWindow.getFocusedWindow();
    win.isMaximized() ? win.unmaximize() : win.maximize()
  },

  // 系统主题的改变
  theme_change(theme) {
    ipcRenderer.send("theme_change", theme)
  },

  // 获取屏幕信息
  get_screen() {
    return ipcRenderer.sendSync("get_screen")
  },

  // 窗口关闭
  close() {
    BrowserWindow.getFocusedWindow().close()
  },

  // 设置主窗口 Zoom
  hty_set_winZoom(Zoom_value) {
    ipcRenderer.send("hty_set_winZoom", Zoom_value)
  },

  // 打开指定目录
  openDir_hty(filePath) {
    ipcRenderer.send("openDir_hty", filePath)
  },

  get_package_json() {
    return require("package.json")
  },

  // 获取相对路径的 绝对路径
  getExtraFilesPath(filename) {
    return path.join(process.cwd(), filename);
  },
});

