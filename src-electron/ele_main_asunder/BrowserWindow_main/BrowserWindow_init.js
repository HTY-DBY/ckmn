import {BrowserWindow, screen} from "electron";
import path from "path";
import {enable} from "@electron/remote/main";
import {EventEmitter} from "events";

function BrowserWindow_init(store) {
  const mainWindow = new BrowserWindow({
    icon: path.join(process.cwd(), "src-electron/icons/icon.png"),
    // 位置记录
    width:
      store.get("resizeWin.width") ||
      Math.floor(screen.getPrimaryDisplay().workAreaSize.width * 0.82),
    height:
      store.get("resizeWin.height") ||
      Math.floor(screen.getPrimaryDisplay().workAreaSize.height * 0.86),
    x: store.get("resizeWin.x"),
    y: store.get("resizeWin.y"),
    // 无边框设置
    titleBarStyle: "hidden",
    useContentSize: true,
    autoHideMenuBar: true,
    webPreferences: {
      sandbox: false,  //沙盒模式
      contextIsolation: true, // 上下文隔离
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  enable(mainWindow.webContents); // <-- 添加这个

  // mainWindow.loadURL('https://www.bilibili.com/')
  mainWindow.loadURL(process.env.APP_URL);

  console.log("electron项目运行在 " + process.env.APP_URL);

  // 重定向console.log到logEmitter
  const logEmitter = new EventEmitter();
  const originalConsoleLog = console.log;
  console.log = function () {
    const message = Array.from(arguments).map(arg => String(arg)).join(' ');
    originalConsoleLog.call(console, ...arguments); // 使用扩展运算符将 arguments 转换为数组
    logEmitter.emit('log', ...arguments);
  }
  // 监听日志事件并发送到渲染进程
  logEmitter.on('log', (message) => {
    mainWindow.webContents.send('logEmitter', 'Main Process: ')
    mainWindow.webContents.send('logEmitter', message)
  });

  //这里是关闭这个鼠标右键功能
  mainWindow.hookWindowMessage(278, function (e) {
    mainWindow.setEnabled(false);//窗口禁用
    setTimeout(() => {
      mainWindow.setEnabled(true);//窗口启用
    }, 100);
    return true;
  })

  return mainWindow
}

module.exports = {BrowserWindow_init}
