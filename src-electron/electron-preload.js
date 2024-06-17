import {getCurrentWebContents} from "@electron/remote";

switch (getCurrentWebContents().id) {
  case 1:
    console.log('success load mainWindow preload');
    import("app/src-electron/ele_pre_main/ele_pre_main")
    break;
  case process.env.DEBUGGING ? 3 : 2 :
    console.log('success load View_L Analyse preload')
    import("app/src-electron/view_pre_main/View-Analyse-preload")
    break;
  case process.env.DEBUGGING ? 4 : 3 :
    console.log('success load View_R Lottery preload')
    import("app/src-electron/view_pre_main/View-Lottery-preload")
    break;
  default:
    // 如果 expression 与上面的 value 值都不匹配，执行此处语句
    console.log('can not success load preload,the id is ' + getCurrentWebContents().id);
}




