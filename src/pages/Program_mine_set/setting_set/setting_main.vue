<template>
  <div class="hty_div_p1">
    <div class="hty_div_p2">
      <!--语言选择-->
      <language_set_main></language_set_main>
      <!--L_Zoom 大小设置-->
      <L_Zoom_set_main></L_Zoom_set_main>
      <!--R_Zoom 大小设置-->
      <R_Zoom_set_main></R_Zoom_set_main>
      <!--窗口大小设置-->
      <win-big_set_main></win-big_set_main>
      <!--主题选择-->
      <theam_select_main></theam_select_main>
      <!--打开下载目录-->
      <down_select_main></down_select_main>
      <!--开发者模式-->
      <developer_set_main></developer_set_main>
    </div>
    <el-divider style="margin: 8px 0"/>
    <div class="hty_div_p2">
      <!--关于软件-->
      <about_me></about_me>
    </div>
  </div>
</template>
<script setup>
import Theam_select_main from "pages/Program_mine_set/setting_set/setting_what/theme_select_main.vue";
import About_me from "pages/Program_mine_set/setting_set/setting_what/about_program.vue";
import Down_select_main from "pages/Program_mine_set/setting_set/setting_what/down_where_see.vue";
import WinBig_set_main from "pages/Program_mine_set/setting_set/setting_what/winBig_set_main.vue";
import Developer_set_main from "pages/Program_mine_set/setting_set/setting_what/Developer_set_main.vue";
import L_Zoom_set_main from "pages/Program_mine_set/setting_set/setting_what/L_Zoom_set_main.vue";
import R_Zoom_set_main from "pages/Program_mine_set/setting_set/setting_what/R_Zoom_set_main.vue";
import Language_set_main from "pages/Program_mine_set/setting_set/setting_what/Language_set_main.vue";
</script>

<style scoped lang="scss">
.hty_div_p1 {
  padding: 15px;
  white-space: nowrap;
}

.hty_div_p2 {
  padding: 5px;
  //white-space: nowrap
}

.hty_scroll_set {
  //white-space: nowrap;
  height: 100%;

  ::v-deep(.scroll) {
    overflow-x: hidden !important;
  }
}
</style>
