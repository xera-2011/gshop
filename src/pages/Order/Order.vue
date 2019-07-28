<template>
  <div class="order_container">
    <HeaderTop title="订单列表"></HeaderTop>
    <section class="order_no_login">
      <img src="./images/person.png" alt />
      <h3>登录后查看外卖订单</h3>
      <router-link to="/login">
        <mt-button class="login">立即登录</mt-button>
      </router-link>
    </section>
  </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop";

export default {
  data() {
    return {};
  },
  components: {
    HeaderTop
  }
};
</script>

<style lang="scss" scoped>
.order_container {
  margin-top: 45px;
  .order_no_login {
    img {
      width: 60%;
    }
    h3 {
      font-size: 17px;
      color: #6a6a6a;
      padding: 10px 0;
      margin: 0;
    }
    .login {
      background-color: #02a774;
      color: #fff;
      font-size: 14px;
      width: 100px;
    }
    padding-top: 100px;
    text-align: center;
  }
}
</style>

