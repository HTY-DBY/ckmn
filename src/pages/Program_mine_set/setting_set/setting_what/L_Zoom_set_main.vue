<template>
  <div class="row hty_div_ww">
    <div class="col-md-auto hty_vertical">


      <span class="text_color">{{ $t("setting_pro.AnalysisZoom") }}</span>

      &nbsp;
      {{ $t("setting_pro.Zoom") }}
      &nbsp;
      {{ value_slider_num }}
      &emsp;
      <q-btn
        :ripple="false"
        round
        color="brown-5"
        icon="question_mark"
        size="9px"
        padding="none"
      >
        <q-tooltip
          anchor="top middle"
          self="bottom middle"
          :offset="[10, 10]"
          class="text-subtitle2"
          :transition-duration="100"
        >
          ctrl + 滚轮
        </q-tooltip>
      </q-btn>
    </div>
    <div class="right_set">
      <el-slider
        class="hty_hua"
        v-model="value_slider"
        :min="0.25"
        :max="5"
        :step="0.05"
        @input="(val) => slider_change(val)"
      />
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const value_slider = ref(null);
const value_slider_num = ref('')
value_slider_num.value = window.hty_fast_store.store_getData("view_Zoom.L").toFixed(2)
value_slider.value = parseFloat(value_slider_num.value)

window.hty_fast_store.store_onUpdate("view_Zoom", (event, new_value) => {
  value_slider.value = parseFloat(new_value.L);
  value_slider_num.value = new_value.L.toFixed(2);
});

function slider_change(val) {
  window.hty_fast_store.store_saveData("view_Zoom.L", val);
  window.hty_pro_control.ipcSend("view_setZoom", ["view_Zoom.L", val]);
  // console.log(val)
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
  //line-height: 25px;
}

.text_color {
  color: #E6A23C;
}

.hty_vertical {
  display: inline-flex;
  align-items: center;
}

.right_set {
  padding: 0 0 0 15px;
}

.hty_hua {
  width: 170px;
}
</style>
