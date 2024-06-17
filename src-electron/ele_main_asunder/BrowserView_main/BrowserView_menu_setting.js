import {clipboard, Menu, MenuItem, shell} from "electron";

export function set_view_menu_option(mainWindow, store, view, u_key_1) {
  view.webContents.on("context-menu", (event, params) => {
    const contextMenu = new Menu();

    // console.log(params)

    if (params.selectionText !== "") {
      contextMenu.append(
        new MenuItem({
          label: "复制",
          accelerator: "CmdOrCtrl+C",
          click: () => {
            clipboard.writeText(params.selectionText);
          },
        })
      );
    }
    if (params.linkText !== "") {
      contextMenu.append(
        new MenuItem({
          label: "复制链接",
          click: () => {
            clipboard.writeText(params.linkURL);
          },
        })
      );
      contextMenu.append(
        new MenuItem({
          label: "复制链接文字",
          click: () => {
            clipboard.writeText(params.linkText);
          },
        })
      );
    }


    if (params.isEditable === true) {
      contextMenu.append(
        new MenuItem({
          label: "剪切",
          role: "cut",
          accelerator: "CmdOrCtrl+X",
        })
      );
      contextMenu.append(
        new MenuItem({
          label: "粘贴",
          role: "paste",
          accelerator: "CmdOrCtrl+V",
        })
      );
    }


    contextMenu.append(
      new MenuItem({
        label: "重新加载",
        click: () => {
          view.webContents.reload();
        },
      })
    );

    if (params.pageURL !== "") {
      contextMenu.append(
        new MenuItem({
          label: "浏览器打开页面",
          click: () => {
            shell.openExternal(params.pageURL); // 使用shell模块即浏览器打开链接
          },
        })
      );
    }
    if (params.linkURL !== "") {
      contextMenu.append(
        new MenuItem({
          label: "浏览器打开链接",
          click: () => {
            shell.openExternal(params.linkURL); // 使用shell模块即浏览器打开链接
          },
        })
      );
    }

    // 如果右键点击的是图片，添加保存图片的菜单项
    if (params.mediaType === "image") {
      let imageURL = params.srcURL;

      if (params.srcURL !== "") {
        contextMenu.append(
          new MenuItem({
            label: "复制图片",
            click: () => {
              mainWindow.webContents.send("copy_img", params.srcURL);
            },
          })
        );

        contextMenu.append(
          new MenuItem({
            label: "复制图片链接",
            click: () => {
              clipboard.writeText(imageURL);
            },
          })
        );

        contextMenu.append(
          new MenuItem({
            label: "浏览器打开图片链接",
            click: () => {
              shell.openExternal(params.srcURL); // 使用shell模块即浏览器打开链接
            },
          })
        );

        contextMenu.append(
          new MenuItem({
            label: "保存图片",
            click: async () => {
              try {
                const filePath = await view.webContents.session.downloadURL(imageURL);
              } catch (error) {
                console.error("error:", error);
              }
            },
          })
        );
      }
    }

    if (store.get("developer_mode") === true) {
      // 如果是开发模式
      contextMenu.append(
        new MenuItem({
          label: "检查",
          accelerator: u_key_1,
          click: () => {
            view.webContents.toggleDevTools();
          },
        })
      );
    }

    contextMenu.popup({window: mainWindow});
  });
}

export function browserView_menu_setting(mainWindow, store, [view_L, view_R]) {
  set_view_menu_option(mainWindow, store, view_L, "F9");
  set_view_menu_option(mainWindow, store, view_R, "F10");
}
