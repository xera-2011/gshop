<template>
  <header class="header_container">
    <slot name="left"></slot>
    <span class="header_title ellipsis">{{title}}</span>
    <slot name="right"></slot>
  </header>
</template>

<script>
export default {
  props: {
    title: String // 接收的属性为 字符串
  }
};
</script>

<style lang="scss" scoped>
.header_container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  .ellipsis {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 50%;
    font-size: 18px;
    /* 文本居中 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  background-color: #02a774;
  font-size: 16px;
  height: 45px;
  // line-height: 1;
  padding: 0 10px;
  color: #fff;
  display: flex;
  justify-content: space-between;
}
</style>

