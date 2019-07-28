<template>
  <section class="userinfo">
    <HeaderTop title="个人中心"></HeaderTop>
    <a @click="$router.back()" href="javascript:;">
      <span class="iconfont icon-jiantou2"></span>
    </a>
    <div class="userinfo_msg">
      <span>一堆个人信息</span>
    </div>
  </section>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop";

export default {
  components: {
    HeaderTop
  }
};
</script>

<style lang="scss" scoped>
.userinfo {
  padding-top: 45px; 
  a {
    display: block;
    .icon-jiantou2 {
      z-index: 100;
      color: #ccc;
      position: absolute;
      left: 5px;
      top: 10px;
      font-size: 20px;
    }
    .userinfo_msg{
      z-index: 100;
    }
  }
}
</style>
