import {net} from "electron";

const {protocol} = require("electron");
const fs = require("fs");

export function protocol_set_main(mainWindow, store) {
  protocol.handle("atom", (request) => {
      let first_4 = request.url.slice('atom://'.length).slice(0, 4)
      let need_src = first_4 === 'http' ? request.url.slice('atom://'.length) : 'file://' + request.url.slice('atom://'.length)
      return net.fetch(need_src).then(response => {
        // console.log('Fetch successful:', response);
        return response;
      }).catch(error => {
        // console.error(`Fetch failed via ${prefix}:`, error);
        // 处理错误，返回一个包含错误信息的对象

        return false
      });
    }
  );
}
