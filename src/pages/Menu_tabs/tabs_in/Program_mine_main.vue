<template>
  <div v-for="item in pro_menu_array_use" :key="item">
    <q-item clickable @click="hty_click(item.route)">
      <q-item-section avatar>
        <q-icon :name="item.icon_name"></q-icon>
      </q-item-section>
      <q-item-section>
        {{ $t(item.cn_name) }}
      </q-item-section>
    </q-item>
  </div>
</template>
<script setup>
import {ref} from "vue";

const pro_menu_array_use = ref(null)

const pro_menu_array = [
  {
    route: "setting",
    cn_name: "menu.setting",
    icon_name: "settings",
  },
  {
    route: "adding",
    cn_name: "menu.adding",
    icon_name: "person_add",
  },
  {
    route: "managing",
    cn_name: "menu.managing",
    icon_name: "event",
  },
  {
    route: "community",
    cn_name: "menu.community",
    icon_name: "forum",
  },
];

const for_test = {
  route: "forTest",
  cn_name: "menu.ForTest",
  icon_name: "bug_report",
}

const for_test_array = [...pro_menu_array, for_test]
// console.log(for_test_array)

window.hty_fast_store.store_getData('developer_mode') === true ? pro_menu_array_use.value = for_test_array : pro_menu_array_use.value = pro_menu_array

window.hty_fast_store.store_onUpdate("developer_mode", (event, new_value) => {
  // console.log(new_value)
  new_value === true ? pro_menu_array_use.value = for_test_array : pro_menu_array_use.value = pro_menu_array
});

function hty_click(route_get) {
  window.hty_fast_store.store_saveData(
    "win_L_menu_click",
    !window.hty_fast_store.store_getData("win_L_menu_click")
  );
  window.hty_fast_store.store_saveData("win_L_name", route_get);
  window.hty_fast_store.store_saveData("win_L_menu_how", "no_iframe");

  window.hty_pro_control.ipcSend("view_hide", true);
}
</script>

<style scoped></style>
