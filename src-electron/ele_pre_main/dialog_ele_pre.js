import {contextBridge} from "electron";
import {dialog} from "@electron/remote";
import path from "path";

let iconPath;
if (process.env.DEBUGGING) {
  iconPath = path.join(process.cwd(), "public/icons/favicon-128x128.png");
} else {
  iconPath = path.join(__dirname, "icons/favicon-128x128.png");
}

contextBridge.exposeInMainWorld("dialog", {
  showMessageBox(message, buttons) {
    // console.log(iconPath)

    dialog
      .showMessageBox({
        // type: 'info',
        title: "ckmn",
        message: "已是最新版本",
        buttons: ["好的"],
        icon: iconPath,
        // checkboxLabel: '不再提示',
      })
      .then((result) => {
        // result.response 包含用户点击的按钮的索引
        // console.log(result.response)
        // console.log(result)
      });
  },
});
