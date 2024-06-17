<template>
  <q-icon
    name="minimize"
    class="icon_cover_1 q-electron-drag--exception"
    @click="minimize"
  ></q-icon>
  <q-icon
    name="crop_square"
    class="icon_cover_1 q-electron-drag--exception"
    @click="toggleMaximize"
  ></q-icon>
  <q-icon
    name="close"
    class="icon_cover_2 q-electron-drag--exception"
    @click="closeApp"
  ></q-icon>
</template>
<script setup>
import {ref} from "vue";

const input = ref("ss");

function minimize() {
  if (process.env.MODE === "electron") {
    window.hty_pro_control.minimize();
  }
}

function toggleMaximize() {
  if (process.env.MODE === "electron") {
    window.hty_pro_control.toggleMaximize();
  }
}

function closeApp() {
  if (process.env.MODE === "electron") {
    window.hty_pro_control.close();
  }
}
</script>
<style scoped lang="scss">
$hty_width: 35px;
$hty_height: 100%;
.icon_cover_1 {
  width: $hty_width;
  height: $hty_height;
}

.icon_cover_2 {
  width: $hty_width;
  height: $hty_height;
}

.icon_cover_1:hover {
  background-color: var(--hty-bg-1);
}

.icon_cover_2:hover {
  background-color: var(--hty-bg-2);
}

</style>
