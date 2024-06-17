import {clipboard, Menu, MenuItem} from "electron";

function add_contextmenu_fun(params, contextmenu_value, mainWindow, store) {
  const contextMenu = new Menu();

  if (contextmenu_value === 'm') {
    contextMenu.append(
      new MenuItem({
        label: "test",
        accelerator: "CmdOrCtrl+C",
        click: () => {
          clipboard.writeText(params.selectionText);
        },
      })
    );
  }

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

  // 如果右键点击的是图片，添加保存图片的菜单项
  if (params.mediaType === "image") {
    let imageURL = params.srcURL;

    if (imageURL.slice(0, 4) === 'atom') {
      let first_4 = imageURL.slice('atom://'.length).slice(0, 4)
      imageURL = first_4 === 'http' ? imageURL.slice('atom://'.length) : imageURL.slice('atom://'.length)
    }

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
          label: "保存图片",
          click: async () => {
            try {
              const filePath = await mainWindow.webContents.session.downloadURL(
                imageURL
              );
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
        accelerator: 'F12',
        click: () => {
          mainWindow.webContents.toggleDevTools();
        },
      })
    );
  }

  // 检查是否有菜单项
  if (contextMenu.items.length > 0) {
    contextMenu.popup({window: mainWindow});
  }
}

function add_contextmenu(contextmenu_value, mainWindow, store) {
  mainWindow.webContents.once("context-menu", (event, params) => {
    // console.log(contextmenu_value);
    add_contextmenu_fun(params, (contextmenu_value === null) ? undefined : contextmenu_value, mainWindow, store)
  })
}


module.exports = {add_contextmenu}
