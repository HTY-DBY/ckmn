import {clipboard, ipcMain, nativeImage, nativeTheme, net, screen, shell} from "electron";
import {view_setBounds} from "app/src-electron/ele_main_asunder/BrowserView_main/BrowserView_setting_main";
import path from "path";
import {add_contextmenu} from "app/src-electron/ele_main_asunder/BrowserWindow_main/BrowserWindow_menu_setting";
import {begin_http_fun, getOccupiedPorts, read_and_add_local_src} from "app/src-electron/ele_pre_main/other_help.cjs";

export function ipcMain_set_main(mainWindow, store, [view_L, view_R], init_variates) {
  // 设置缩放级别
  ipcMain.on("view_setZoom", (_event, [key, value]) => {
    if (key === "view_Zoom.L") {
      view_L.webContents.setZoomFactor(value);
    } else {
      view_R.webContents.setZoomFactor(value);
    }
  });
  // 保存一个对象
  ipcMain.on("store_saveData", (_event, key, data) => {
    store.set(key, data);
  });
  // 获取一个对象
  ipcMain.on("store_getData", (_event, key) => {
    // console.log(key)
    _event.returnValue = store.get(key);
  });
  // 判断一个属性是否存在
  ipcMain.on("store_hasData", (_event, key) => {
    // console.log(key)
    _event.returnValue = store.has(key);
  });
  // 系统主题的改变
  ipcMain.on("theme_change", (_event, key) => {
    nativeTheme.themeSource = key;
  });

  // 接收图片 img_base_64
  ipcMain.on("copy_img_base_64", (event, base64Image) => {
    // console.log(base64Image)
    const image = nativeImage.createFromDataURL(base64Image);
    clipboard.writeImage(image);
  });

  // 获取屏幕信息
  ipcMain.on("get_screen", (_event) => {
    const mainScreen = screen.getPrimaryDisplay();
    const {width, height} = mainScreen.size;

    // 获取DPI（每英寸像素数）
    const dpi = screen.getPrimaryDisplay().scaleFactor;

    // 计算屏幕的对角线尺寸（英寸）
    const diagonalSizeInInches =
      Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / (dpi * 72.524);

    _event.returnValue = diagonalSizeInInches.toFixed(0);
  });

  // 返回view
  ipcMain.on("view_goBack", (_event, ele) => {
    if (ele === "L_win") {
      view_L.webContents.goBack();
    } else {
      view_R.webContents.goBack();
    }
  });
  // 前进view
  ipcMain.on("view_goForward", (_event, ele) => {
    if (ele === "L_win") {
      view_L.webContents.goForward();
    } else {
      view_R.webContents.goForward();
    }
  });
  // 刷新view
  ipcMain.on("view_reload", (_event, ele) => {
    if (ele === "L_win") {
      view_L.webContents.reload();
    } else {
      view_R.webContents.reload();
    }
  });

  // 刷新view
  ipcMain.on("toggleDevTools", (_event, ele) => {
    if (ele === "L") {
      view_L.webContents.toggleDevTools();
    } else {
      view_R.webContents.toggleDevTools();
    }
  });

  ipcMain.on("view_loadURL", async (_event, [ele, url]) => {
    if (ele === "L_win") {
      store.set("view_L_hide", false);
      await view_L.webContents.loadURL(url)
      try {
        if (!view_L.webContents.isDestroyed()) {
          store.set("view_Zoom.L", view_L.webContents.getZoomFactor());
        }
      } catch (e) {
        // 处理异常
        console.error("Error getting zoom factor for view_L:", e);
      }
      view_setBounds(store, view_L, view_R);
    } else {
      await view_R.webContents.loadURL(url)
      try {
        let count = 0;
        let temp;

        const timer = setInterval(() => {
          if (temp === view_R.webContents.getZoomFactor()) {
            count += 1;
          }

          try {
            if (!view_R.webContents.isDestroyed()) {
              store.set("view_Zoom.R", view_R.webContents.getZoomFactor());
            }
          } catch (e) {
            // 处理异常
            console.error("Error getting zoom factor for view_R:", e);
          }

          temp = view_R.webContents.getZoomFactor();

          if (count === 5) {
            clearInterval(timer);
          }
        }, 1000);
      } catch (e) {
        // console.log(e);
      }
    }
  });

  // 隐藏view
  ipcMain.on("view_hide", (_event, hide) => {
    store.set("view_L_hide", hide);
    view_setBounds(store, view_L, view_R);
  });

  // 打开指定目录，为了安全，限制了打开范围
  ipcMain.on("openDir_hty", (_event, filePath) => {
    try {
      shell.openPath(path.join(process.cwd(), filePath)).then(r => console.log("文件夹打开成功"));
    } catch (error) {
      console.log("文件夹打开失败", error);
    }
  });

  // 设置主窗口 Zoom
  ipcMain.on("hty_set_winZoom", (_event, Zoom_value) => {
    mainWindow.webContents.setZoomFactor(Zoom_value)
  });

  // 设置主窗口 Zoom
  ipcMain.on("oncontextmenu", (_event, contextmenu_value) => {
    // console.log(value)
    add_contextmenu(contextmenu_value, mainWindow, store)
  });
  // 添加 temp_value 到 src 中
  ipcMain.on("read_and_add_local_src", (_event, [key, temp_value]) => {
    // console.log(value)
    read_and_add_local_src(key, temp_value, store)
  });
  // 清空 src
  ipcMain.on("Clear_key_src", (_event, key) => {
    store.set(key + '_src', [])
  });
  // 链接检查
  ipcMain.handle("src_check", (_event, value) => {
    // console.log(value)
    return net.fetch(value).then(response => {
      // console.log('Fetch successful:');
      // return response;
      return true
    }).catch(error => {
      // console.log('Fetch failed via');
      // 处理错误，返回一个包含错误信息的对象
      return false
    });
  });
  // 启动http服务
  ipcMain.on("begin_server", (_event, [port, filePath]) => {
    // console.log('begin_server')
    begin_http_fun(port, filePath)
  });
  ipcMain.on("getOccupiedPorts", (_event, value) => {
    // console.log('begin_server')
    getOccupiedPorts()
  });

}
