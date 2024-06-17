<template>
  <div class="full_screen" ref="win_out_elementRef">
    <q-splitter
      v-model="win_L_width"
      class="hty_sp"
      separator-class="bg-grey-9"
      unit="px"
      :disable="!win_L_how"
      :separator-style="hty_set_style"
      :limits="[0, Infinity]"
      @update:model-value="(value) => win_L_value_save(value)"
    >
      <template v-slot:before>
        <L_win_main v-show="view_L_hide" class="L_win_pro"></L_win_main>
        <div ref="L_win" class="full_screen_1"></div>
      </template>
      <template v-slot:after>
        <div ref="R_win" class="full_screen_2"></div>
      </template>
    </q-splitter>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import L_win_main from "pages/ckmn_main/body_main_ckmn/Win_spl_right/L_win_main.vue";

const hty_set_style = ref({width: "1px"});
const win_L_width = ref(window.hty_fast_store.store_getData("win_L_width"));
const win_L_how = ref(window.hty_fast_store.store_getData("win_L_how"));
const win_out_elementRef = ref(null);
const L_win = ref(null);
const R_win = ref(null);
const winZoom = ref(window.hty_fast_store.store_getData("winZoom"));
let win_where = {};
const view_L_hide = ref(window.hty_fast_store.store_getData("view_L_hide"));

function getRectData(element) {
  const rect = element.getBoundingClientRect();
  let rectObject = {
    x: rect.x + 2,
    y: rect.y,
    height: rect.height,
    width: rect.width - 5,
  };
  rectObject = multiplyAndRoundObjectValues(rectObject, winZoom.value);
  // console.log(rectObject)
  return rectObject;
}

function multiplyAndRoundObjectValues(obj, multiplier) {
  return Object.fromEntries(
    Object.keys(obj).map((key) => [key, Math.round(obj[key] * multiplier)])
  );
}

const handleResize = () => {
  win_where.L_win_where = getRectData(L_win.value);
  win_where.R_win_where = getRectData(R_win.value);
  window.hty_fast_store.store_saveData("win_where", win_where);
};

const resizeObserver = new ResizeObserver(handleResize);

onMounted(() => {
  // 在组件挂载后开始监听元素大小变化
  resizeObserver.observe(win_out_elementRef.value);
  resizeObserver.observe(R_win.value);
});

// 当 view_L_hide 变化时
window.hty_fast_store.store_onUpdate("view_L_hide", (event, new_value) => {
  // console.log(new_value)
  view_L_hide.value = new_value;
});
// 当 winZoom 变化时
window.hty_fast_store.store_onUpdate("winZoom", (event, new_value) => {
  // console.log(new_value)
  winZoom.value = new_value;
  handleResize();
});

// 当 win_L_width 变化时
window.hty_fast_store.store_onUpdate("win_L_width", (event, new_value) => {
  // console.log(new_value)
  win_L_width.value = new_value;
});

// 当 win_L_how 变化时
window.hty_fast_store.store_onUpdate("win_L_how", (event, new_value) => {
  win_L_how.value = new_value;
});

// 当 win_L_width 变化时，只取最终时刻
function win_L_value_save(value) {
  if (value === 0) {
    // console.log(0)
    window.hty_fast_store.store_saveData("win_L_how", false);
    window.hty_fast_store.store_saveData("win_L_width", 0);
    hty_set_style.value = {width: "0px"};
  } else {
    window.hty_fast_store.store_saveData("win_L_how", true);
    let fixed_width = +value.toFixed(0);
    window.hty_fast_store.store_saveData("win_L_width", fixed_width);
    window.hty_fast_store.store_saveData("fin_win_L_width", fixed_width);
  }
}

let win_L_name_change = ref(window.hty_fast_store.store_getData("win_L_name"));

// 当 store key 改变时，进行方法
window.hty_fast_store.store_onUpdate("win_L_menu_click", (event, new_value) => {
  // 如果win_L合起来，展开它
  if (window.hty_fast_store.store_getData("win_L_how") === false) {
    // console.log('如果win_L合起来，展开它')
    window.hty_fast_store.store_saveData("win_L_how", true);
    let fin_win_L_width =
      window.hty_fast_store.store_getData("fin_win_L_width");

    // console.log(window.hty_fast_store.store_getData('fin_win_L_width'))

    let min_win_L_width =
      window.hty_fast_store.store_getData("min_win_L_width");
    window.hty_fast_store.store_saveData(
      "win_L_width",
      fin_win_L_width < min_win_L_width ? min_win_L_width : fin_win_L_width
    );
    win_L_name_change.value = window.hty_fast_store.store_getData("win_L_name");
    hty_set_style.value = {width: "1px"};
  } else {
    if (
      win_L_name_change.value ===
      window.hty_fast_store.store_getData("win_L_name")
    ) {
      // 如果win_L是展开的，如果按到的是同一界面的menu，收起它
      // console.log('同一界面的menu')
      window.hty_fast_store.store_saveData(
        "fin_win_L_width",
        window.hty_fast_store.store_getData("win_L_width")
      );
      window.hty_fast_store.store_saveData("win_L_width", 0);
      window.hty_fast_store.store_saveData("win_L_how", false);
      win_L_name_change.value =
        window.hty_fast_store.store_getData("win_L_name");
      hty_set_style.value = {width: "0px"};
    } else {
      // 如果win_L是展开的，如果按到的 不是 同一界面的menu
      win_L_name_change.value =
        window.hty_fast_store.store_getData("win_L_name");
      // console.log('不是同一界面的menu')
    }
  }
});
</script>
<style scoped lang="scss">
.hty_sp {
  height: 100%;
}

.full_screen {
  height: 100%;
  width: 100%;
  overflow: hidden; /* 隐藏滚动条 */
}

.full_screen_1 {
  position: absolute;
  height: 100%;
  width: 100%;
  //background: red;
  top: 0;
  left: 0;
  z-index: 1;
}

.L_win_pro {
  position: absolute;
  height: 100%;
  width: 100%;
  //background: red;
  top: 0;
  left: 0;
  z-index: 2;
}

.full_screen_2 {
  height: 100%;
  width: 100%;
  //background: #00aeec;
}
</style>
