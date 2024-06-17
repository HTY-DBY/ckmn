const {BrowserView} = require("electron");
const {view_setBounds} = require("app/src-electron/ele_main_asunder/BrowserView_main/BrowserView_setting_main");
const path = require("path");
import {enable} from '@electron/remote/main' // <-- 添加这里
// initialize() // <-- 添加这里

let view_L, view_R

function BrowserView_init_main(init_variates, store, mainWindow) {
  view_L = new BrowserView({
    webPreferences: {
      // nodeIntegration: true, // 是否启用Node integration
      // nodeIntegrationInWorker: true, // 是否在Web工作器中启用了Node集成
      // nodeIntegrationInSubFrames: true, // 是否允许在子页面(iframe)或子窗口(child window)中集成Node.js
      sandbox: false,  //沙盒模式
      contextIsolation: true, // 上下文隔离
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD), // allowRunningInsecureContent: true, // 允许一个 https 页面运行来自http url的JavaScript, CSS 或 plugins
      scrollBounce: true, // boolean (可选) macOS - 启用滚动回弹（橡皮筋）效果。 默认值为 false.
      partition: "persist:view_L",
    },
  });

  enable(view_L.webContents) // <-- 添加这里

  view_R = new BrowserView({
    webPreferences: {
      // nodeIntegration: true, // 是否启用Node integration
      // nodeIntegrationInWorker: true, // 是否在Web工作器中启用了Node集成
      // nodeIntegrationInSubFrames: true, // 是否允许在子页面(iframe)或子窗口(child window)中集成Node.js
      sandbox: false,  //沙盒模式
      contextIsolation: true, // 上下文隔离
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD), allowRunningInsecureContent: true, // 允许一个 https 页面运行来自http url的JavaScript, CSS 或 plugins
      scrollBounce: true, // boolean (可选) macOS - 启用滚动回弹（橡皮筋）效果。 默认值为 false.
      partition: "persist:view_R", // 通过 session 的 partition 字符串来设置界面session。如果 partition 以 persist:开头, 该页面将使用持续的 session，并在所有页面生效，且使用同一个partition

    },
  });

  enable(view_R.webContents) // <-- 添加这里

  view_L.webContents.setZoomFactor(store.get("view_Zoom.L"));
  view_R.webContents.setZoomFactor(store.get("view_Zoom.R"));

  view_L.setAutoResize({width: true, height: true});
  view_R.setAutoResize({width: true, height: true});

  view_setBounds(store, view_L, view_R);

  mainWindow.addBrowserView(view_L);
  mainWindow.addBrowserView(view_R);

  return [view_L, view_R]
}

module.exports = {BrowserView_init_main: BrowserView_init_main}
