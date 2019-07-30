<template>
  <div class="footer_guide">
    <nav class="mui-bar mui-bar-tab">
      <!-- <router-link class="mui-tab-item1" to="/msite">
        <span class="iconfont icon-waimai"></span>
        <span class="mui-tab-label">外卖</span>
      </router-link>-->
      <router-link class="mui-tab-item1" to="/msite" :class="{on: '/msite'===$route.path}">
        <span class="iconfont icon-waimai mui-icon"></span>
        <span class="mui-tab-label">外卖</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/search" :class="{on: '/search'===$route.path}">
        <span class="iconfont icon-search mui-icon"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/order" :class="{on: '/order'===$route.path}">
        <span class="iconfont icon-dingdan mui-icon"></span>
        <span class="mui-tab-label">订单</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/profile" :class="{on: '/profile'===$route.path}">
        <span class="iconfont icon-geren mui-icon"></span>
        <span class="mui-tab-label">我的</span>
      </router-link>
    </nav>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.footer_guide {
  .mui-bar {
    box-sizing: border-box; // 加了这个 padding就不会改变盒子宽高了
    padding-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.85);
    bottom: 0;
    width: 100%;
    height: 50px;
    border-top: 0;
    border-bottom: 0;
    position: fixed;
    z-index: 10;
    right: 0;
    left: 0;
  }
  .mui-bar-tab .mui-tab-item1 {
    padding:0;
    .iconfont {
      font-size: 22px;
      display: inline-block;
    }
    width: 25%;
    line-height: 17px;
    text-align: center; // 居中!!!!!!!!!
    border-bottom: 0;
    font-size: 11px;
    display: block;
    .mui-icon ~ .mui-tab-label {
      //选中.mui-icon里出现的所有.mui-tab-label(span)
      display: block;
    }
    &.on {
      color: #02a774 !important; // 路由高亮属性绑定
    }
  }
}
</style>

