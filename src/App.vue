<template>
  <div class="hty_box">
    <router-view name="head" class="header"></router-view>
    <router-view name="body" class="auto-fill"></router-view>
  </div>
</template>

<script setup>
import "assets/init_pro_hty_pre.js";

import {useQuasar} from "quasar";
import {useI18n} from "vue-i18n";

const $q = useQuasar();
let temp_name
// 黑暗模式设置
$q.dark.set(window.hty_fast_store.store_getData("themeSet") === "dark");

const {locale} = useI18n({useScope: "global"});
locale.value = window.hty_fast_store.store_getData('your_language')
</script>

<style scoped lang="scss">
$head_height: 36px;

.hty_box {
  height: 100vh;
  display: flex;
  flex-flow: column;
  overflow: hidden;
}

.header {
  height: $head_height;
  overflow: hidden;
}

.auto-fill {
  flex: 1;
  overflow: hidden;
}
</style>
<style></style>
