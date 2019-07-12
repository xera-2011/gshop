<template>
  <section class="msite">
    <!-- 首页头部 -->
    <HeaderTop title="昌平区北七家宏福科技园(337省道北)">
      <router-link class="header_search" to="/search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" to="/login" slot="right">
        <span>登录|注册</span>
      </router-link>
    </HeaderTop>
    <!-- 首页导航轮播 -->
    <nav class="msite_nav">
      <!-- swiper内容容器 -->
      <div class="swiper-container">
        <!-- swiper数据包裹层 -->
        <div class="swiper-wrapper">
          <!-- swiper轮播容器(放轮播的页面) -->
          <div class="swiper-slide">
            <a href="javascript:;" class="link_to_food">
              <img src="./images/nav/1.jpg" alt />
              <span>甜品美食</span>
            </a>
            <a href="javascript:;" class="link_to_food">
              <img src="./images/nav/2.jpg" alt />
              <span>甜品美食</span>
            </a>
            <a href="javascript:;" class="link_to_food">
              <img src="./images/nav/3.jpg" alt />
              <span>甜品美食</span>
            </a>
            <a href="javascript:;" class="link_to_food">
              <img src="./images/nav/4.jpg" alt />
              <span>甜品美食</span>
            </a>
            <a href="javascript:;" class="link_to_food">
              <img src="./images/nav/5.jpg" alt />
              <span>甜品美食</span>
            </a>
            <a href="javascript:;" class="link_to_food">
              <img src="./images/nav/6.jpg" alt />
              <span>甜品美食</span>
            </a>
            <a href="javascript:;" class="link_to_food">
              <img src="./images/nav/7.jpg" alt />
              <span>甜品美食</span>
            </a>
            <a href="javascript:;" class="link_to_food">
              <img src="./images/nav/8.jpg" alt />
              <span>甜品美食</span>
            </a>
          </div>
          <div class="swiper-slide">
            <a href="javascript:;" class="link_to_food">
              <img src="./images/nav/9.jpg" alt />
              <span>甜品美食</span>
            </a>
            <a href="javascript:;" class="link_to_food">
              <img src="./images/nav/10.jpg" alt />
              <span>甜品美食</span>
            </a>
            <a href="javascript:;" class="link_to_food">
              <img src="./images/nav/11.jpg" alt />
              <span>甜品美食</span>
            </a>
            <a href="javascript:;" class="link_to_food">
              <img src="./images/nav/12.jpg" alt />
              <span>甜品美食</span>
            </a>
            <a href="javascript:;" class="link_to_food">
              <img src="./images/nav/13.jpg" alt />
              <span>甜品美食</span>
            </a>
            <a href="javascript:;" class="link_to_food">
              <img src="./images/nav/14.jpg" alt />
              <span>甜品美食</span>
            </a>
            <a href="javascript:;" class="link_to_food">
              <img src="./images/nav/7.jpg" alt />
              <span>甜品美食</span>
            </a>
            <a href="javascript:;" class="link_to_food">
              <img src="./images/nav/8.jpg" alt />
              <span>甜品美食</span>
            </a>
          </div>
        </div>
        <!-- swiper轮播图圆点 -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!-- 首页附近商家 -->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span>附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </section>
</template>

<script>
import Swiper from "swiper"; // 这个swiper貌似不能全局引入
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import ShopList from "../../components/ShopList/ShopList.vue";
export default {
  data() {
    return {};
  },
  components: {
    HeaderTop,
    ShopList
  },
  mounted() {
    new Swiper(".swiper-container", {
      loop: true,
      // 如果需要分页器
      //  pagination: '.swiper-pagination', // 不同的写法
      pagination: {
        el: ".swiper-pagination"
      }
    });
  }
};
</script>

<style lang="scss">
.msite {
  margin:45px 0;
  width: 100%;
  // overflow: hidden;
  .header_search {
    position: absolute;
    top: 50%;
    left: 3%;
    transform: translateY(-50%);
    .icon-sousuo {
      font-size: 25px;
      color: #fff;
      font-weight: bold;
      padding-left: 5px;
    }
  }
  .header_login {
    font-size: 14px;
    color: #fff;
    position: absolute;
    top: 50%;
    right: 3%;
    transform: translateY(-50%);
  }
  .msite_nav {
    border-bottom: 1px solid #e2e2e2;
    .swiper-container {
      width: 100%;
      height: auto;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      .swiper-slide {
        padding-bottom: 15px;
        text-align: center;
        font-size: 18px;
        background: #fff;
        height: 200px;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        flex-wrap: wrap;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        .link_to_food {
          display: block;
          width: 25%;
          img {
            width: 50px;
            padding-bottom: 10px;
          }
          span {
            display: block;
            font-size: 13px;
            color: #666;
          }
        }
      }
      .swiper-pagination {
        > span.swiper-pagination-bullet-active {
          background-color: #02a774;
        }
      }
    }
    // 直接复制过来修改的样式
    .swiper-container-horizontal > .swiper-pagination-bullets,
    .swiper-pagination-custom,
    .swiper-pagination-fraction {
      bottom: 3px;
      left: 0;
      width: 100%;
    }
  }

  .msite_shop_list {
    margin-top: 10px;
    border-top: 1px solid #e2e2e2;

    .shop_header {
      background-color: #fff;
      padding: 10px 10px 0;
      i {
        font-size: 16px;
      }
      span {
        font-size: 14px;
        color: #999;
      }
    }
  }
}
</style>

