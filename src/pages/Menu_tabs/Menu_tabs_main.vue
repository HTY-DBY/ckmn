<template>
  <q-scroll-area
    class="hty_scroll_set"
    :delay="0"
    :vertical-thumb-style="v_set_s"
    :horizontal-thumb-style="h_set_s"
    :horizontal-bar-style="h_set_s"
  >
    <q-list class="no-wrap-text ">
      <!--抽卡包等相关菜单-->
      <Lottery_bag_main></Lottery_bag_main>
      <!--    分割线-->
      <q-separator color="green" size="1px"/>
      <!--分析包等相关菜单-->
      <analyse_bag_main></analyse_bag_main>
      <!--    分割线-->
      <q-separator color="orange" size="1px"/>
      <!--系统设置等相关菜单-->
      <Program_mine_main></Program_mine_main>
    </q-list>
  </q-scroll-area>
</template>
<script setup>
import Program_mine_main from "pages/Menu_tabs/tabs_in/Program_mine_main.vue";
import Lottery_bag_main from "pages/Menu_tabs/tabs_in/Lottery_bag_main.vue";
import Analyse_bag_main from "pages/Menu_tabs/tabs_in/Analyse_bag_main.vue";

const v_set_s = {
  right: "3px",
  borderRadius: "5px",
  backgroundColor: "#027be3",
  width: "5px",
  opacity: "0.75",
};
const h_set_s = {
  // pointerEvents: 'none',
  height: "0px",
  backgroundColor: "red",
};
</script>
<style scoped lang="scss">
/* 使用 white-space 属性禁止文本换行 */
.no-wrap-text {
  white-space: nowrap;
}

.hty_scroll_set {
  //white-space: nowrap;
  height: 100%;

  ::v-deep(.scroll) {
    overflow-x: hidden !important;
  }
}
</style>
