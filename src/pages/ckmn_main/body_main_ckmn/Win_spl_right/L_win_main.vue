<template>
  <keep-alive>
    <q-scroll-area
      class="hty_scroll_set"
      :delay="0"
      :vertical-thumb-style="v_set_s"
      :horizontal-thumb-style="h_set_s"
      :horizontal-bar-style="h_set_s"
    >
      <div class="hty_rv_set">
        <!--<keep-alive>-->
        <component :is="tabs[win_L_name]"></component>
        <!--</keep-alive>-->
      </div>
    </q-scroll-area>
  </keep-alive>
</template>
<script setup>
import {ref} from "vue";
import setting from "pages/Program_mine_set/setting_set/setting_main.vue";
import adding from "pages/Program_mine_set/adding_set/adding_main.vue";
import managing from "pages/Program_mine_set/managing_set/managing_main.vue";
import forTest from "pages/Program_mine_set/ForTest_set/ForTest_main.vue";
import community from "pages/Program_mine_set/community_set/community_main.vue";

const win_L_name = ref(window.hty_fast_store.store_getData("win_L_name"));

const tabs = {
  setting,
  adding,
  managing,
  community,
  forTest,
};

// 当 store key 改变时，进行方法
window.hty_fast_store.store_onUpdate("win_L_name", (event, new_value) => {
  // console.log(new_value)
  win_L_name.value = new_value;
});

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
.hty_rv_set {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
