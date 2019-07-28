<template>
  <section class="msite">
    <!-- 首页头部 -->
    <HeaderTop :title="address.name">
      <router-link class="header_search" to="/search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" :to="userInfo._id?'/userinfo':'/login'" slot="right">
        <span v-if="!userInfo._id">登录|注册</span>
        <span v-else class="iconfont icon-person"></span>
      </router-link>
    </HeaderTop>
    <!-- 首页导航轮播 -->
    <nav class="msite_nav">
      <!-- swiper内容容器 -->
      <div class="swiper-container">
        <!-- swiper数据包裹层 -->
        <!-- v-if判断是否已经获取到数据 -->
        <div class="swiper-wrapper" v-if="categorys.length">
          <!-- swiper轮播容器(放轮播的页面) -->
          <div class="swiper-slide" v-for="(categorys,i) in categorysArr" :key="i">
            <a
              href="javascript:;"
              class="link_to_food"
              v-for="(category) in categorys"
              :key="category.id"
            >
              <img :src="baseImageUrl+category.image_url" alt />
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- v-else如没有数据则显示图片 -->
        <img src="./images/msite_back.svg" alt="back" v-else />
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
import { mapState } from "vuex";

export default {
  data() {
    return {
      baseImageUrl: "https://fuss10.elemecdn.com"
    };
  },
  mounted() {
    //要在页面加载完之后(mounted)再进行swiper的初始化
    this.$store.dispatch("getCategorys");
    this.$store.dispatch("getAddress");
    this.$store.dispatch("getShops");
    // this.$store.dispatch("getUserInfo");
  },
  computed: {
    ...mapState(["address", "categorys", "userInfo"]),
    // 根据categorys一维数组生成一个二维数组(也就是轮播图页数数组包裹产品数组)
    // 限制小数组(也就是产品数组)的length长度为8(一页有8个产品数据)
    categorysArr() {
      const { categorys } = this; //对象解构,这是ES6的写法,就是this.categorys里的数据,之后就不用this.categorys,直接使用categorys
      const arr = []; //大数组
      let minArr = []; //小数组--let可以重复创建
      categorys.forEach(data => {
        //当满了8,则创建一个新的来装
        if (minArr.length === 8) {
          minArr = [];
        }
        //上一步创建新的,如果是空的,也就是说已经没了
        if (minArr.length === 0) {
          //则将小数组加入到大数组
          arr.push(minArr);
        }
        //将数据存储到小数组中,进行循环
        minArr.push(data);
      });
      //categorysArr()返回值是一个大数组包含小数组的二维数组
      return arr;
    }
  },
  // 在监听器中，解决轮播数据图 渲染时机问题
  watch: {
    // 创建监听函数
    categorys() {
      // 方法一 定时创建 但还不够完美
      // setTimeout(() => {
      //   new Swiper(".swiper-container", {
      //     loop: true,
      //     pagination: {
      //       el: ".swiper-pagination"
      //     }
      //   });
      // }, 50)
      // 方法二 使用Vue的api vm.$nextTick( )在修改数据之后立即使用它，然后等待 DOM 更新
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          loop: true,
          // 分页器
          pagination: {
            el: ".swiper-pagination",
            clickable: true // 可点击
          }
        });
      });
    }
  },
  components: {
    HeaderTop,
    ShopList
  }
};
</script>

<style lang="scss">
.msite {
  margin: 45px 0;
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
      height: 200px;
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

