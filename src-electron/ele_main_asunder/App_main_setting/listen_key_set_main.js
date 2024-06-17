import {Menu} from "electron";

export function make_listen_key_set(mainWindow, store, [view_L, view_R]) {
  const template = [
    {
      label: "编辑",
      submenu: [
        {
          label: "开发者工具",
          accelerator: "F12",
          click: () => {
            if (store.get("developer_mode") === true) {
              // 如果是开发模式
              mainWindow.webContents.toggleDevTools();
            }
          },
        },
        {
          label: "重新载入",
          accelerator: "CommandOrControl+R",
          click: () => {
            mainWindow.reload();
          },
        },
        {
          label: "检查",
          accelerator: "F9",
          click: () => {
            if (store.get("developer_mode") === true) {
              // 如果是开发模式
              view_L.webContents.toggleDevTools();
            }
          },
        },
        {
          label: "检查",
          accelerator: "F10",
          click: () => {
            if (store.get("developer_mode") === true) {
              // 如果是开发模式
              view_R.webContents.toggleDevTools();
            }
          },
        },
        {
          label: "全屏",
          accelerator: "F11",
          click: () => {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
          },
        },
        {
          label: "退出",
          accelerator: "Esc",
          click: () => {
            if (mainWindow.isFullScreen() === true) {
              mainWindow.setFullScreen(false);
            }
          },
        },
      ],
    },
  ];
  // 主进程设置应用菜单
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
