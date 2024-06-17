<template>
  <q-splitter
    v-model="menu_width"
    class="hty_sp"
    :limits="[0, Infinity]"
    unit="px"
    separator-class="bg-grey-9"
    @update:model-value="(value) => spl_value_save(value)"
    :separator-style="hty_set_style"
  >
    <!--左边的抽卡包的菜单栏-->
    <template v-slot:before>
      <see_-menu_tabs></see_-menu_tabs>
    </template>
    <!--右边的子窗口-->
    <template v-slot:after>
      <Right_spl_main></Right_spl_main>
    </template>

  </q-splitter>
</template>
<script setup>
import {ref} from "vue";
import Right_spl_main from "pages/ckmn_main/body_main_ckmn/Win_spl_right/Win_spl_main.vue";
import See_Menu_tabs from "pages/ckmn_main/body_main_ckmn/Menu_spl_left/see_Menu_tabs.vue";

const hty_set_style = ref({width: "1px"});
const menu_width = ref(window.hty_fast_store.store_getData("menu_width"));
window.hty_fast_store.store_onUpdate("menu_width", (event, new_value) => {
  menu_width.value = new_value;
  new_value === 0 ? hty_set_style.value.width = '0px' : hty_set_style.value.width = '1px'
});

function spl_value_save(value) {
  window.hty_fast_store.store_saveData("menu_width", value);
  value === 0 ? hty_set_style.value.width = '0px' : hty_set_style.value.width = '1px'
}


</script>
<style scoped>
.hty_sp {
  height: 100%;
  overflow: hidden; /* 隐藏滚动条 */
}
</style>
