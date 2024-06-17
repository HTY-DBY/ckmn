import {app} from "electron";
import os from "os";
import equal from "fast-deep-equal";
import {make_listen_key_set} from "app/src-electron/ele_main_asunder/App_main_setting/listen_key_set_main";
import {ipcMain_set_main} from "app/src-electron/ele_main_asunder/App_main_setting/ipcMain_set_main.js";
import {protocol_set_main} from "app/src-electron/ele_main_asunder/App_main_setting/protocol_set_main";
import {init_electron_main} from "app/src-electron/ele_main_asunder/App_main_setting/init_electron_main";
import {app_on_set_main} from "app/src-electron/ele_main_asunder/App_main_setting/app_on_set_main";
import {BrowserView_setting_main, view_setBounds,} from "app/src-electron/ele_main_asunder/BrowserView_main/BrowserView_setting_main";
import {Store_init} from "app/src-electron/ele_main_asunder/Store_main/Store_init";
import {BrowserWindow_init} from "app/src-electron/ele_main_asunder/BrowserWindow_main/BrowserWindow_init";
import {BrowserWindow_setting_main} from "app/src-electron/ele_main_asunder/BrowserWindow_main/BrowserWindow_setting_main";
import {BrowserView_init_main} from "app/src-electron/ele_main_asunder/BrowserView_main/BrowserView_init_main";
import {Store_value_set_init} from "app/src-electron/ele_main_asunder/Store_main/Store_value_set_init";

let mainWindow, view_L, view_R, init_variates

const platform = process.platform || os.platform(); // needed in case process is undefined under Linux
const store = Store_init("proData_save/config")

// store 的初始化设置
Store_value_set_init(store)

// 一些初始化设置
init_variates = init_electron_main(store);

// 创建和配置 BrowserWindow
function create_BrowserWindow() {
  // 初始化 BrowserWindow
  mainWindow = BrowserWindow_init(store)
  // BrowserWindow 的一些设置
  BrowserWindow_setting_main(mainWindow, store)
}

// 创建和配置 BrowserView
function create_BrowserView() {
  // 初始化 BrowserView
  [view_L, view_R] = BrowserView_init_main(init_variates, store, mainWindow)
  // BrowserView 的一些设置
  BrowserView_setting_main(init_variates, store, mainWindow, [view_L, view_R])

  store.onDidChange("win_where", () => {
    view_setBounds(store, view_L, view_R);
  });

  mainWindow.on("focus", () => {
    // console.log('获得焦点')
    view_setBounds(store, view_L, view_R);
  });
}

app.whenReady().then(() => {
  create_BrowserWindow();
  create_BrowserView();

  //创建由菜单制作的快捷键监听
  make_listen_key_set(mainWindow, store, [view_L, view_R]);

  // 设置 接收预加载脚本的 ipc
  ipcMain_set_main(mainWindow, store, [view_L, view_R], init_variates);

  // 自定义协议 注册
  protocol_set_main(mainWindow, store);

  store.onDidAnyChange((newValue, oldValue) => {
    // try {
    // 获取 newValue 和 oldValue 的 key
    const keys = Object.keys(newValue);
    // 找到两者共同的 key，且值不相等的情况
    let differentKey = keys.filter((key) => !equal(newValue[key], oldValue[key]));
    differentKey = differentKey[0].toString();
    // 发送信息
    mainWindow.webContents.send(differentKey + "_change", store.get(differentKey));
    // } catch (e) {
    //   // console.log(e);
    // }
  });
});

app_on_set_main(mainWindow, platform, create_BrowserWindow, store, view_L, view_R);
