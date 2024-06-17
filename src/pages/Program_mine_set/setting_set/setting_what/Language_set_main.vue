<template>
  <div class="col hty_div_ww">
    <div class="row">
      <div class="col-md-auto hty_vertical">{{ $t("setting_pro.language") }}</div>
      <div class="col text-right hty_select">
        <q-select
          class="hty_select_w"
          color="light-blue-5"
          v-model="locale"
          :options="options"
          emit-value
          dense
          map-options

        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {useI18n} from "vue-i18n";
import {ref, watch} from "vue";

const model = ref(null);
const {locale} = useI18n({useScope: "global"});

// const options = ref(Object.keys(language_main))
const options = ref([
  {label: '简体中文', value: 'zh-CN',},
  {label: '日本語', value: 'ja-jp',},
  {label: 'English (US)', value: 'en-us',},
])

watch(locale, (value, oldValue, onCleanup) => {
  window.hty_fast_store.store_saveData('your_language', value);
})


</script>
<style scoped>
.hty_select_w {
  width: 140px;
}

.hty_select {
  display: flex;
  justify-content: flex-end;
}

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
<style>

.q-field--auto-height.q-field--dense .q-field__control, .q-field--auto-height.q-field--dense {
  min-height: 32px;
  height: 32px;
}

.q-field--auto-height.q-field--dense .q-field__control, .q-field--auto-height.q-field--dense .q-field__native {
  min-height: 0px;
}
</style>
