<template>
  <q-expansion-item
    :content-inset-level="0.3"
    icon="ads_click"
    :label="$t('menu.LotteryBag')"
    default-opened
  >
    <div>
      <q-tabs v-model="tab" vertical class=""
              switch-indicator
              indicator-color="green-12"
              no-caps
      >
        <div v-for="(item,i) in src_ALL" :key="item" class="col">
          <q-tab :name="item.ID" :ripple="false" class="hty_tab_set" @click="hty_click(item)">
            <div class="hty_set_2">
              <q-avatar :size="icon_size" v-if="check_array[i]">
                <img :src="'atom:\\\\'+item.ckmn_README.icon">
              </q-avatar>
              <q-icon :size="icon_size" name="help" v-else></q-icon>

              &nbsp;&nbsp;&nbsp;
              <div class="hty_center">
                {{ item.ckmn_README.name }}
              </div>
            </div>
          </q-tab>
        </div>
      </q-tabs>
    </div>
  </q-expansion-item>
</template>
<script setup>
import {ref, toRaw, watch} from "vue";

const check_array = ref([])
const src_ALL = ref(window.hty_fast_store.store_getData('Lottery_src'))
const icon_size = '34px'
const tab = ref(window.hty_fast_store.store_getData('view_L_now_ID'))

function isSrcLinkValid(src_ALL) {
  for (let [i, item] of src_ALL.entries()) {
    let value = toRaw(item).ckmn_README.icon
    window.hty_pro_control.ipcSend_and_get_invoke('src_check', value).then(r => {
      if (r === true) check_array.value[i] = true
    })
  }
}

isSrcLinkValid(src_ALL.value)

watch(tab, (val) => {
  // console.log(val)
  window.hty_fast_store.store_saveData('view_L_now_ID', val)
})

// 当 store key 改变时，进行方法
window.hty_fast_store.store_onUpdate("Lottery_src", (event, new_value) => {
  src_ALL.value = new_value
  isSrcLinkValid(src_ALL.value)
});

function hty_click(item) {
  if (item?.URL ?? false) {
    window.hty_pro_control.ipcSend("view_loadURL", ["R_win", item?.URL]);
    // window.hty_fast_store.store_saveData("view_url.R", item.URL);
  } else {
    window.hty_pro_control.ipcSend("view_loadURL", ["R_win", 'https://www.bilibili.com/404']);
  }

}
</script>
<style scoped lang="scss">


.hty_tab_set {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.hty_set_2 {
  display: flex;
}


.hty_center {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
}
</style>
