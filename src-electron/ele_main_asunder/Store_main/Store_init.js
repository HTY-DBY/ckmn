const path = require("path");
const Store = require("electron-store");
const {writeFileByUser} = require("app/src-electron/ele_pre_main/other_help.cjs");

function Store_init(path_input) {
  // Store 的存储位置
  const Store_path = path.join(process.cwd(), path_input)
  // 如果不存在，创建路径
  writeFileByUser(Store_path);
  // 创建 Store
  return new Store({cwd: Store_path}, {watch: true});
}

module.exports = {Store_init};
