<template>
  <div v-for="(item,i) in Lottery_src_ALL" :key="item" class=" hty_out_div_2  q-pa-sm q-px-md">
    <q-card class="my-card">

      <q-card-section>
        <div class="row hty_set_1">
          <div>
            <div v-if="check_array[i]">
              <q-avatar :size="icon_size">
                <img :src="'atom:\\\\'+item.ckmn_README.icon">
              </q-avatar>
            </div>
            <div v-else>
              <q-icon :size="icon_size" name="help"></q-icon>
            </div>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div class="hty_title">{{ item?.ckmn_README?.name }}</div>
        </div>
      </q-card-section>

      <q-separator inset color="green-12"/>

      <q-card-section>
        <div class="text-subtitle2 hty_About">{{ item?.ckmn_README?.About }}</div>
      </q-card-section>

      <q-separator inset/>

      <q-card-section>
        Readme：

      </q-card-section>

      <q-card-section>
        <div class="hty_set_3">
          <div><span class="text-purple-4">ver. </span>{{ item?.ckmn_README?.version }}</div>
          <div><span class="text-purple-4">by </span> {{ item?.ckmn_README?.author }}</div>
          <a target="_blank" :href="item?.ckmn_README?.project_address">项目地址</a>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import {ref, toRaw} from 'vue'

const icon_size = '34px'
const check_array = ref([])
const Lottery_src_ALL = ref(window.hty_fast_store.store_getData('Lottery_src'))

function isSrcLinkValid(src_ALL) {
  for (let [i, item] of src_ALL.entries()) {
    let value = toRaw(item).ckmn_README.icon
    window.hty_pro_control.ipcSend_and_get_invoke('src_check', value).then(r => {
      if (r === true) check_array.value[i] = true
    })
  }
}

let src_ALL = Lottery_src_ALL

isSrcLinkValid(src_ALL.value)
isSrcLinkValid(src_ALL.value)
</script>

<style scoped lang="scss">
.hty_title {
  font-size: 16px;
  white-space: nowrap;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
}

.hty_set_1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.hty_out_div_2 {
  width: 100%;

}

.hty_set_3 {
  display: flex;
  justify-content: space-between;

}

.hty_set_4 {
  white-space: nowrap;
}

.a_hty_set {
  white-space: nowrap; /* 防止文本换行 */
  max-width: 300px;
  min-width: 200px;
  text-overflow: ellipsis; /* 如果文本过长，使用省略号表示 */
  overflow: hidden;
}


.my-card {
  min-width: 240px;
  width: 100%;
}
</style>
