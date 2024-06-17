<template>
  <div style="height: 10px"></div>
  <div class="row">
    <div class="col-8 hty_vertical">
      <div class="row">
        <q-radio v-model="radio" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="1" label="自动更新"/>
        <q-radio v-model="radio" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="2" label="提醒更新"/>
        <q-radio v-model="radio" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="3" label="禁止更新"/>
      </div>
    </div>
    <div class="col hty_set_1">
      <div class="hty_but_set hty_vertical">
        <q-btn
          rounded
          size="13px"
          label="检查更新"
          outline
          @click="test"
          :ripple="false"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref} from "vue";

const radio = ref('2');

function test() {
  window.dialog.showMessageBox();
}
</script>
<style scoped>


.hty_set_1 {
  justify-content: flex-end;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
}
</style>
