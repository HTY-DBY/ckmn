<template>
  <div class="row hty_full">
    <!--  后退-->
    <q-icon
      name="arrow_back"
      class="icon_cover_1 q-electron-drag--exception"
      @click="view_goBack('L_win')"
    >
    </q-icon>
    <!--  刷新-->
    <q-icon
      name="refresh"
      class="icon_cover_1 q-electron-drag--exception"
      @click="view_reload('L_win')"
    >
    </q-icon>
    <!--  前进-->
    <q-icon
      name="arrow_forward"
      class="icon_cover_1 q-electron-drag--exception"
      @click="view_goForward('L_win')"
    >
    </q-icon>

    <!--  分割条-->
    <q-separator vertical inset color="orange" class="hty_separator" />
    <!--  分割条-->

    <!--  后退-->
    <q-icon
      name="arrow_back"
      class="icon_cover_1 q-electron-drag--exception"
      @click="view_goBack('R_win')"
    >
    </q-icon>
    <!--  刷新-->
    <q-icon
      name="refresh"
      class="icon_cover_1 q-electron-drag--exception"
      @click="view_reload('R_win')"
    >
    </q-icon>
    <!--  前进-->
    <q-icon
      name="arrow_forward"
      class="icon_cover_1 q-electron-drag--exception"
      @click="view_goForward('R_win')"
    >
    </q-icon>
  </div>
</template>

<script setup>
function view_goBack(ele) {
  window.hty_pro_control.ipcSend("view_goBack", ele);
}

function view_goForward(ele) {
  window.hty_pro_control.ipcSend("view_goForward", ele);
}

function view_reload(ele) {
  window.hty_pro_control.ipcSend("view_reload", ele);
}
</script>

<style scoped lang="scss">
$hty_width: 35px;
$hty_height: 100%;
.icon_cover_1 {
  width: $hty_width;
  height: $hty_height;
}

.icon_cover_1:hover {
  background-color: var(--hty-bg-1);
}

.hty_full {
  height: 100%;
}

.hty_separator {
  width: 2px;
  margin: 6px 8px 6px 8px;
}
</style>
