<template>
  <q-bar class="q-electron-drag hty_bg row justify-between">
    <div class="hty_full hty_col ">
      <Left_head_btn></Left_head_btn>
    </div>
    <div class="hty_full col-auto">
      <centre_head_btn></centre_head_btn>
    </div>
    <div class="hty_full col-auto hty_right_set">
      <Right_head_btn></Right_head_btn>
    </div>
  </q-bar>
</template>
<script setup>
import Right_head_btn from "pages/ckmn_main/body_main_ckmn/Head_set/Right_head_btn.vue";
import Left_head_btn from "pages/ckmn_main/body_main_ckmn/Head_set/Left_head_btn.vue";
import Centre_head_btn from "pages/ckmn_main/body_main_ckmn/Head_set/Centre_head_btn.vue";
</script>
<style scoped lang="scss">
.hty_bg {
  background: var(--hty-bg);
  padding: 0 0 0 0;
}

.hty_full {
  height: 100%;
}

.hty_col {
  width: 47%;
}

.hty_right_set {
  display: flex;
  justify-content: flex-end;
}
</style>
