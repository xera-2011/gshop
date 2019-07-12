<template>
  <div class="search_container">
    <HeaderTop title="搜索"></HeaderTop>
    <!-- 搜索 -->
    <form class="search_form">
      <input type="search" placeholder="请输入商家或美食名称" class="search_input" />
      <input type="submit" class="search_submit" />
    </form>
    <!-- 搜索列表 -->
    <section class="list">
      <ul class="list">
        <router-link to="/">
          <section></section>
        </router-link>
      </ul>
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
.search_container {
  margin-top: 45px;
  .search_form {
    width: 100%;
    height: 50px;
    background-color: #fff;
    padding: 8px 10px;
    .search_input {
      float: left;
      width: 80%;
      font-size: 14px;
      font-weight: bold;
      color: #333;
      text-align: left;
    }
    .search_submit {
      float: right;
      width: 18%;
      height: 35px;
      background-color: #02a774;
      border: 0;
    }
  }
}
</style>

