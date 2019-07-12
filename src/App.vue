<template>
  <div class="app-container">
    <!-- 路由 -->
    <router-view />
    <!-- 底部 -->
    <FooterGuide v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide.vue";
export default {
  data() {
    return {};
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

