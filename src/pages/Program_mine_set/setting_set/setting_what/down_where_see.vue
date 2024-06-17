<template>
  <div class="col hty_div_ww">
    <div class="row">
      <div class="col-6 hty_vertical">
        <div>下载目录：</div>
        <div>
          <el-text type="success">安装路径\</el-text>
        </div>
        <div>
          <el-text type="success">bag_manage</el-text>
        </div>
      </div>
      <div class="col hty_ringht">
        <q-btn
          rounded
          size="13px"
          label="打开"
          outline
          @click="openDir_hty"
          :ripple="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
function openDir_hty() {
  window.hty_pro_control.openDir_hty('bag_manage')
}

</script>
<style scoped>
.hty_div_ww:hover {
  background: rgba(154, 168, 156, 0.16);
  border-radius: 15px;
}

.hty_ringht {
  display: flex;
  justify-content: flex-end;
  align-content: center;
  flex-wrap: wrap;
}

.hty_div_ww {
  padding: 8px 18px;
  line-height: 25px;
}

.hty_vertical {
  flex-wrap: wrap;
  align-content: center;
  display: flex;
}
</style>
