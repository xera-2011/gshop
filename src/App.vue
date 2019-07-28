<template>
  <div class="app-container">
    <!-- 缓存路由组件对象 -->
    <keep-alive>
      <router-view />
    </keep-alive>
    <!-- 底部 -->
    <FooterGuide v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide.vue";
import { mapActions } from "vuex"; //方法二

export default {
  // 使用created生命周期钩子,可以更早获取到,mounted会看到延迟
  mounted() {
    // 从session会话中获取数据(使用vuex的action的异步获取)
    // this.$store.dispatch("getUserInfo"); //方法一
    this.getUserInfo(); //方法二
  },
  methods: {
    ...mapActions(["getUserInfo"]) //方法二
  },
  components: {
    FooterGuide
  }
};
</script>

<style lang="scss">
// 这个是让页面100%高度的
html,
body,
#app {
  height: 100%;
}
// 这个是页面内容
.app-container {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  overflow-x: scroll;
}
.app-container::-webkit-scrollbar {
  display: none;
}
</style>