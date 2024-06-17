<template>
  <div class="text-h5">测试页面</div>
  <q-separator color="orange" inset/>
  <div class="col">
    <div>
      添加 http 到 Lottery src
      <button @click="ADD_Lottery_src_http">button</button>
    </div>
    <div>
      清空 Lottery src
      <button @click="Clear_Lottery_src_http">button</button>
    </div>
    <q-separator color="orange" inset/>
    <div>
      添加 http 到 Analyse src
      <button @click="ADD_Analyse_src_http">button</button>
    </div>
    <div>
      清空 Analyse src
      <button @click="Clear_Analyse_src_http">button</button>
    </div>
    <q-separator color="orange" inset/>

    <div>
      http 服务启动测试
      <button @click="test_http_open">button</button>
    </div>
    <div>
      获取程序占用的端口号
      <button @click="getOccupiedPorts">button</button>
    </div>
  </div>

</template>
<script setup>

let temp_port = 10488

function getOccupiedPorts() {
  window.hty_pro_control.ipcSend('getOccupiedPorts')
}

function test_http_open() {

  let temp = "Analyse/ckmn_AAA_t" + temp_port
  console.log(temp)
  window.hty_pro_control.ipcSend('begin_server', [temp_port, temp])
  temp_port++
}

let Add_src_http = [
  {
    Type: 'http',
    ckmn_README: {
      "name": "bilibili/b站",
      "icon": "https://i0.hdslb.com/bfs/face/946b4fecc2ad094b809f8e275353e67f799ad9af.jpg@240w_240h_1c_1s_!web-avatar-nav.avif",
      "About": "哔哩哔哩（bilibili.com)是国内知名的视频弹幕网站，这里有及时的动漫新番，活跃的ACG氛围，有创意的Up主。大家可以在这里找到许多欢乐。"
    },
    URL: "https://www.bilibili.com/"
  },
];

function ADD_Lottery_src_http() {
  window.hty_pro_control.ipcSend('read_and_add_local_src', ['Lottery', Add_src_http])
}

function ADD_Analyse_src_http() {
  window.hty_pro_control.ipcSend('read_and_add_local_src', ['Analyse', Add_src_http])
}

function Clear_Lottery_src_http() {
  window.hty_pro_control.ipcSend('Clear_key_src', 'Lottery')
}

function Clear_Analyse_src_http() {
  window.hty_pro_control.ipcSend('Clear_key_src', 'Analyse')
}
</script>

<style scoped></style>
