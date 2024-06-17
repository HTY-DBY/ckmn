import {app} from "electron";

export function app_on_set_main(mainWindow, platform, create_BrowserWindow, store, view_L, view_R) {
  //侦听器，当应用程序不再有任何打开窗口时试图退出。 由于操作系统的 窗口管理行为 ，此监听器在 macOS 上是禁止操作的
  app.on("window-all-closed", () => {
    if (platform !== "darwin") {

      app.quit();

    }
  });

  //侦听器，只有当应用程序激活后没有可见窗口时，才能创建新的浏览器窗口。 例如，在首次启动应用程序后或重启运行中的应用程序
  app.on("activate", () => {
    if (mainWindow === null) {
      create_BrowserWindow();
    }
  });


}
