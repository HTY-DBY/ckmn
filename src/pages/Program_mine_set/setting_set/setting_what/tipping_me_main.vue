<template>
  <div class="text-purple-11">捐赠</div>
  <div class="img_dis">
    <div>
      <el-image class="img_big" :src="wechat_url" fit="fill" />
      <div class="img_text text-green">微信</div>
    </div>
    <div>
      <el-image class="img_big" :src="alipay_url" fit="fill" />
      <div class="img_text text-blue">支付宝</div>
    </div>
  </div>
</template>
<script setup>
const wechat_url = "img/wechat.png";
const alipay_url = "img/alipay.png";
</script>
<style scoped lang="scss">
$img_hty: 170px;

.img_big {
  width: $img_hty;
  height: $img_hty;
  padding: 15px;
}

.img_dis {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.img_text {
  display: flex;
  justify-content: center;
}
</style>
