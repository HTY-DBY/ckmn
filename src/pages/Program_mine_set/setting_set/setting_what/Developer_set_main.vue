<template>
  <div class="col hty_div_ww">
    <div class="row">
      <div class="col-md-auto hty_vertical">开发者模式</div>
      <div class="col text-right">
        <el-switch
          v-model="value"
          inactive-text="关闭"
          active-text="开启"
          style="--el-switch-on-color: #1e95de; --el-switch-off-color: #3a3636"
          @click="toggleDark"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useQuasar} from "quasar";

const $q = useQuasar();

let value_temp;
const value = ref(window.hty_fast_store.store_getData("developer_mode"));

const toggleDark = () => {
  window.hty_fast_store.store_saveData(
    "developer_mode",
    !window.hty_fast_store.store_getData("developer_mode")
  );
  // console.log('developer_mode: ' + window.hty_fast_store.store_getData('developer_mode'))
};
</script>
<style scoped>
.hty_div_ww:hover {
  background: rgba(154, 168, 156, 0.16);
  border-radius: 15px;
}

.hty_div_ww {
  padding: 8px 18px;
  line-height: 25px;
}

.hty_vertical {
  display: inline-flex;
  align-items: center;
}
</style>
