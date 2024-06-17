<template>
  <!--  菜单-->
  <q-icon
    name="menu_open"
    class="icon_cover_1 q-electron-drag--exception"
    @click="menu_open"
  >
  </q-icon>
</template>

<script setup>
function menu_open() {
  if (window.hty_fast_store.store_getData("menu_width") === 0) {
    window.hty_fast_store.store_saveData(
      "menu_width",
      window.hty_fast_store.store_getData("menu_width_init")
    );
  } else {
    window.hty_fast_store.store_saveData("menu_width", 0);
  }
}
</script>

<style scoped lang="scss">
.tooltip_font {
  font-size: 2.125rem;
  color: #0a3069;
  background: #00aeec;
}

.logo_font {
  font-size: 70%;
}

$hty_width: 35px;
$hty_height: 100%;
.icon_cover_1 {
  width: $hty_width;
  height: $hty_height;
}

.icon_cover_1:hover {
  background-color: var(--hty-bg-1);
}
</style>
