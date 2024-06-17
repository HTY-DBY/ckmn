<template>
  <div style="height: 12px"></div>
  <div class="row hty_set_1">
    <div v-for="item in src_all" :key="item">
      <div class="hty_but_set">
        <a target="_blank" :href="item.src">{{ item.cn_name }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const src_all = ref([
  {
    src: "https://hty.ink",
    cn_name: "软件官网",
  },
  {
    src: "https://hty.ink",
    cn_name: "Git仓库",
  },
  {
    src: "https://hty.ink",
    cn_name: "作者博客",
  },
  {
    src: "https://hty.ink",
    cn_name: "意见反馈",
  },
]);
</script>

<style scoped>
.hty_but_set {
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hty_set_1 {
  justify-content: center;
}
</style>
