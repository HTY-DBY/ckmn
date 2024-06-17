<template>
  <div class="row hty_div_ww">
    <div class="col-md-auto hty_vertical">

      <span class="text_color">窗口</span>

      &nbsp;&nbsp;界面缩放&nbsp;&nbsp;&nbsp;{{
        value_slider
      }}
    </div>
    <div class="right_set">
      <el-slider
        class="hty_hua"
        v-model="value_slider"
        :min="0.5"
        :max="1.5"
        :step="0.05"
        @change="(val) => slider_change(val)"
      />
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const value_slider = ref(window.hty_fast_store.store_getData("winZoom"));

window.hty_fast_store.store_onUpdate("winZoom", (event, new_value) => {
  value_slider.value = new_value;
});

function slider_change(val) {
  window.hty_pro_control.hty_set_winZoom(val);
  window.hty_fast_store.store_saveData("winZoom", val);
}
</script>
<style scoped lang="scss">
.hty_div_ww:hover {
  background: rgba(154, 168, 156, 0.16);
  border-radius: 15px;
}

.hty_div_ww {
  padding: 8px 18px;
  justify-content: space-between;
}

.hty_vertical {
  display: inline-flex;
  align-items: center;
}

.right_set {
  padding: 0 0 0 15px;
}

.text_color {
  color: #F56C6C
}

.hty_hua {
  width: 170px;
}
</style>
