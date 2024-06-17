<template>
  <div class="col hty_div_ww">
    <div class="row">
      <div class="col-md-auto hty_vertical">{{ $t("setting_pro.theme.title") }}</div>
      <div class="col text-right">

        <!--{{ $t('setting_pro.theme.dark') }}-->
        <el-switch
          v-model="value"
          :inactive-text="$t('setting_pro.theme.dark')"
          :active-text="$t('setting_pro.theme.light')"
          style="--el-switch-on-color: #1e95de; --el-switch-off-color: #3a3636"
          @click="toggleDark"
        />
        <!--{{ $t('setting_pro.theme.light') }}-->
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useQuasar} from "quasar";

const $q = useQuasar();

let value_temp;
value_temp = window.hty_fast_store.store_getData("themeSet") === "light";
const value = ref(value_temp);
let theme_change
let time_set = 430
const toggleDark = () => {
  document.documentElement.classList.toggle("dark")
  let what_theme = document.documentElement.classList.contains("dark") ? 'dark' : 'light'
  let how_theme = !document.documentElement.classList.contains("dark")

  value.value = how_theme;
  $q.dark.set(!how_theme);
  window.hty_fast_store.store_saveData("themeSet", what_theme);
  setTimeout(() => window.hty_pro_control.theme_change(what_theme), time_set)
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
