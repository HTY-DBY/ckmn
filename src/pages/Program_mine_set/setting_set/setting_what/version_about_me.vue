<template>
  <div class="row">
    <div class="col-md-auto hty_vertical">当前版本</div>
    <div class="col text-right">
      {{ version }}
    </div>
  </div>
</template>
<script setup>
import {ref} from "vue";

const version = ref(window.hty_pro_control.get_package_json().version);
</script>
