const {shell} = require("electron");
const {make_listen_key_set} = require("app/src-electron/ele_main_asunder/App_main_setting/listen_key_set_main");
const {EventEmitter} = require('events');
const path = require("path");
const {browserWindow_menu_setting} = require("app/src-electron/ele_main_asunder/BrowserWindow_main/BrowserWindow_menu_setting");


function BrowserWindow_setting_main(mainWindow, store) {
  mainWindow_on_close(mainWindow, store)
  mainWindow_on_closed(mainWindow, store)
  DEBUGGING_open(mainWindow)

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url); // 使用 shell 模块即浏览器打开链接
  });


}

function DEBUGGING_open(mainWindow) {
  if (process.env.DEBUGGING) {
    // 如果是开发模式
    mainWindow.webContents.openDevTools()
  } else {
  }
}


function mainWindow_on_close(mainWindow, store) {
  // 在窗口要关闭的时候触发。 它在DOM 的beforeunload 和 unload 事件之前触发. 调用event.preventDefault()将阻止这个操作
  mainWindow.on("close", () => {
    if (mainWindow.getContentBounds()) {
      if (mainWindow.isMaximized()) {
        store.set("resizeWin", "undefined");
      } else {
        store.set("resizeWin", mainWindow.getContentBounds())
        console.log('窗口的最后位置信息已记录')
      }
    }
  });
}

function mainWindow_on_closed(mainWindow, store) {
  // 在窗口关闭时触发 当你接收到这个事件的时候, 你应当移除相应窗口的引用对象，避免再次使用它.
  mainWindow = null;
}

module.exports = {BrowserWindow_setting_main}
