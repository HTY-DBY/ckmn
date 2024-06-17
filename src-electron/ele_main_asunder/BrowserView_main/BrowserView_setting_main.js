const {checkServerStatus} = require("app/src-electron/ele_pre_main/other_help.cjs")
const {browserView_menu_setting} = require("app/src-electron/ele_main_asunder/BrowserView_main/BrowserView_menu_setting");

function BrowserView_setting_main(init_variates, store, mainWindow, [view_L, view_R]) {
  let temp;
  temp = init_variates.view_url.L;
  checkServerStatus(temp, (err, message) => {
    if (!err) {
      console.log(message);
      view_L.webContents.loadURL(temp);
    }
  });
  temp = init_variates.view_url.R;
  checkServerStatus(temp, (err, message) => {
    if (!err) {
      console.log(message);
      view_R.webContents.loadURL(temp);
    }
  });

  // 拦截 BrowserView 的链接跳转
  setViewOpenHandler(view_L, view_R)

  // BrowserView 的右键菜单配置
  browserView_menu_setting(mainWindow, store, [view_L, view_R]);
}

function view_setBounds(store, view_L, view_R) {
  if (store.get("view_L_hide") === true) {
    view_L.setBounds({x: 0, y: 0, width: 0, height: 0});
  } else {
    view_L.setBounds(store.get("win_where.L_win_where"));
  }
  view_R.setBounds(store.get("win_where.R_win_where"));
}

function setViewOpenHandler(view_L, view_R) {
  // 拦截 BrowserView 的链接跳转
  view_L.webContents.setWindowOpenHandler((details) => {
    view_L.webContents.loadURL(details.url);
    return {action: "deny"};
  });
  view_R.webContents.setWindowOpenHandler((details) => {
    view_R.webContents.loadURL(details.url);
    return {action: "deny"};
  });
}

module.exports = {BrowserView_setting_main, view_setBounds}
