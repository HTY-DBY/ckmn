const data = [
  {
    "Type": "http",
    "ckmn_README": {
      "name": "bilibili/b站",
      "icon": "https://i0.hdslb.com/bfs/face/946b4fecc2ad094b809f8e275353e67f799ad9af.jpg@240w_240h_1c_1s_!web-avatar-nav.avif",
      "About": "哔哩哔哩（bilibili.com)是国内知名的视频弹幕网站，这里有及时的动漫新番，活跃的ACG氛围，有创意的Up主。大家可以在这里找到许多欢乐。"
    },
    "URL": "https://www.bilibili.com/",
    "ID": 7
  },
  {
    "Folder": "ckmn_Lottery_test",
    "Type": "local",
    "ckmn_README": {
      "name": "测试用 抽卡包",
      "icon": "F:\\creat\\hty-ink-creat\\ckmn.hty.ink\\bag_manage\\Lottery\\ckmn_Lottery_test\\path\\to\\icon.png",
      "About": "这是关于这个包的简要说明"
    },
    "ID": 5,
    "URL": "http://localhost:21556"
  },
];

// 要寻找的值
const targetFolder = "ckmn_Lottery_test";

// 使用Array.findIndex方法查找索引
const index = data.findIndex(item => item.Folder === targetFolder);

// 输出结果
if (index !== -1) {
  console.log("找到的索引是:", index);
} else {
  console.log("未找到匹配的项。");
}
