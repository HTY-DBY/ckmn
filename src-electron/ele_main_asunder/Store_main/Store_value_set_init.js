let temp_value, temp_name

function Store_value_set_init(store) {
  const setDefaultValue = (name, value) => {
    if (!store.has(name)) store.set(name, value);
  };

  // view_Zoom 初始化
  setDefaultValue("view_Zoom.L", 0.8);
  setDefaultValue("view_Zoom.R", 0.8);

  // menu_width 初始化
  const menuWidthInitValue = 155;
  setDefaultValue("menu_width_init", menuWidthInitValue);
  setDefaultValue("menu_width", menuWidthInitValue);

  // min_win_L_width 初始化
  setDefaultValue("min_win_L_width", 30);

  // win_L_width 初始化
  setDefaultValue("win_L_width", 450);

  // win_L_how 初始化
  setDefaultValue("win_L_how", true);

  // win_L_name 和 win_R_name 初始化
  setDefaultValue("win_L_name", null);
  setDefaultValue("win_R_name", null);

  // 初始化
  setDefaultValue("view_L_now_ID", null);
  setDefaultValue("view_R_now_ID", null);

  // developer_mode 初始化
  setDefaultValue("developer_mode", false);

  // view_L_hide 初始化
  setDefaultValue("view_L_hide", false);

  // win_where 初始化
  setDefaultValue("win_where", {
    L_win_where: {x: 0, y: 0, height: 0, width: 0},
    R_win_where: {x: 0, y: 0, height: 0, width: 0},
  });

  // view_L_hide 初始化
  setDefaultValue("Lottery_src", []);
  // view_L_hide 初始化
  setDefaultValue("Analyse_src", []);

}

module.exports = {Store_value_set_init};
