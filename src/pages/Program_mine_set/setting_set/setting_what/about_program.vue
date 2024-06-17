<template>
  <div style="height: 10px"></div>
  <div class="text-blue text-h6">关于 {{ cn_name }}</div>
  <div style="height: 10px"></div>
  <!--    版本号-->
  <version_about_me></version_about_me>
  <!--    更新设置-->
  <updata_pro_main></updata_pro_main>
  <!--    超链接处-->
  <a_about_me></a_about_me>
  <!--    捐赠-->
  <tipping_me_main></tipping_me_main>
</template>

<script setup>
import {ref} from "vue";
import A_about_me from "pages/Program_mine_set/setting_set/setting_what/about_me.vue";
import Version_about_me from "pages/Program_mine_set/setting_set/setting_what/version_about_me.vue";
import Updata_pro_main from "pages/Program_mine_set/setting_set/setting_what/updata_pro_main.vue";
import Tipping_me_main from "pages/Program_mine_set/setting_set/setting_what/tipping_me_main.vue";

const cn_name = ref(window.hty_pro_control.get_package_json().cn_name);
</script>
<style scoped lang="scss">
$img_hty: 150px;
.hty_vertical {
  display: inline-flex;
  align-items: center;
}
</style>
