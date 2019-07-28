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
    background-color: #fff;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.85);
  }
  .iconfont {
    font-size: 22px;
    display: inline-block;
  }
  // .mui-bar-tab .mui-tab-item1.mui-active {
  //   color: #02a774;
  // }
  .mui-bar-tab .mui-tab-item1 {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    line-height: 17px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
  }

  .mui-bar-tab .mui-tab-item1 .mui-icon {
    top: -3px;
    height: 24px;
  }
  .mui-bar-tab .mui-tab-item1 .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .on {
    color: #02a774 !important;
  }
}
</style>

