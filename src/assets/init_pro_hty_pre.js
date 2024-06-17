import {useDark} from "@vueuse/core";
import {Quasar} from 'quasar'

let temp_name, temp_value;

// 同步主进程的log
window.hty_pro_control.onUpdateCounter('logEmitter', (_event, value) => {
  console.log(value)
})

// 语言初始化
temp_name = "your_language";
if (!window.hty_fast_store.store_hasData(temp_name)) {
  window.hty_fast_store.store_saveData(temp_name, Quasar.lang.getLocale());
}

// 黑暗模式初始化
temp_name = "themeSet";
if (!window.hty_fast_store.store_hasData(temp_name)) {
  useDark();
  const isDarkMode = document.documentElement.classList.contains("dark");
  window.hty_fast_store.store_saveData(
    "themeSet",
    isDarkMode ? "dark" : "light"
  );
  window.hty_pro_control.theme_change(isDarkMode ? "dark" : "light");
} else {
  if (window.hty_fast_store.store_getData(temp_name) === "dark") {
    document.documentElement.classList.add("dark");
    window.hty_pro_control.theme_change("dark");
  } else {
    document.documentElement.classList.remove("dark");
    window.hty_pro_control.theme_change("light");
  }
}

// 缩放 窗口 初始化
temp_value = +(
  0.018181818 * window.hty_pro_control.get_screen() +
  0.509090909
).toFixed(2);
// console.log(window.hty_pro_control.get_screen())
temp_name = "winZoom";
if (!window.hty_fast_store.store_hasData(temp_name)) {
  window.hty_fast_store.store_saveData(temp_name, temp_value);
}
window.hty_pro_control.hty_set_winZoom(
  window.hty_fast_store.store_getData(temp_name)
);

// 控制 L_win 的菜单的点击事件
temp_name = "win_L_menu_click";
if (!window.hty_fast_store.store_hasData(temp_name)) {
  window.hty_fast_store.store_saveData(temp_name, false);
}

// 传入图片url将图片转化为base64编码
// callback回调函数中拿到base64编码并进行下一步操作
async function convertImgToBase64(url, callback, outputFormat) {
  var canvas = document.createElement("CANVAS"),
    ctx = canvas.getContext("2d"),
    img = new Image();
  img.onerror = function () {
    console.error("Error loading image");
    // 在这里可以执行一些处理，例如调用回调函数通知错误等
  };
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL(outputFormat || "image/png");
    callback.call(this, dataURL);
    canvas = null;
  };

  img.src = url;
}

// 渲染进程接收url，处理数据，发送主进程：
window.hty_pro_control.copy_img((_event, value) => {
  // console.log(value)
  convertImgToBase64(value, function (base64Image) {
    // console.log(base64Image)
    window.hty_pro_control.ipcSend("copy_img_base_64", base64Image);
  });
});

// 监听 右键事件，发送dom元素到 主进程
document.oncontextmenu = function (e) {
  const tag = e?.target?.__vnode?.props?.contextmenu
  // console.log(tag);
  window.hty_pro_control.ipcSend('oncontextmenu', tag)
}

