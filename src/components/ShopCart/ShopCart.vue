<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <!-- 如果totalCount购物车数量为0 则logo不亮 -->
            <div class="logo" :class="{highlight:totalCount}">
              <!-- 如果totalCount购物车数量为0 则icon不亮 -->
              <i class="iconfont icon-shopping_cart _cart" :class="{highlight:totalCount}"></i>
            </div>
            <!-- 总件数(计算属性getters得出的) -->
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <!-- 总金额(计算属性getters得出的) -->
          <div class="price highlight">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}} 元</div>
        </div>
        <div class="content-right">
          <!-- 判断是否达到起送价(在计算属性computed得出的) -->
          <div class="pay" :class="payClass">{{payText}}</div>
        </div>
      </div>
      <!-- 购物车列表移动动画 -->
      <transition name="move">
        <!-- 购物车列表 -->
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCart">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <!-- 这里food是cartFoods商家购物车中食物的列表的数据 -->
              <li class="food" v-for="(food,index) in cartFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <!-- 购物车列表背影淡入淡出动画 -->
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
    </transition>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import BScroll from "better-scroll";
import { mapState, mapGetters } from "vuex";
import CartControl from "../../components/CartControl/CartControl.vue";

export default {
  data() {
    return {
      isShow: false //是否隐藏购物车列表
    };
  },
  computed: {
    // 需要用到 购物车数据 和商家数据
    ...mapState(["cartFoods", "info"]),
    // 经过计算属性getters得出的 总数量,总价格
    ...mapGetters(["totalCount", "totalPrice"]),

    // 支付样式判断
    payClass() {
      // 这样写之后 this.totalPrice 可以写成 totalPrice
      const { totalPrice } = this;
      // 这样写之后 this.info.minPrice 可以写成 minPrice
      const { minPrice } = this.info;
      // 1.是否达到起送价(决定了用哪个样式)
      return totalPrice >= minPrice ? "enough" : "not-enougn";
      // 2.在clss属性为pay的元素中使用该方法,判断支付样式
    },

    // 支付文字判断
    payText() {
      // 这样写之后 this.totalPrice 可以写成 totalPrice
      const { totalPrice } = this;
      // 这样写之后 this.info.minPrice 可以写成 minPrice
      const { minPrice } = this.info;
      // 1.购物车(金额=0)为空
      if (totalPrice === 0) {
        return `￥${minPrice}元起送`;
        // 2.未达到起送价
      } else if (totalPrice < minPrice) {
        return `还差￥${minPrice - totalPrice}元起送`;
        // 3.达到起送价
      } else {
        return "结算";
      }
      // 4.在clss属性为pay的元素中使用该方法,判断支付文字
    },

    // 购物车列表显示
    listShow() {
      // 1.如果选中的食品总数量为0，直接不显示购物车列表
      if (this.totalCount === 0) {
        // 2.同时也需要将isShow 变回false，不然值会一直是true
        this.isShow = false;
        // 3.数量为0 listShow返回值为false
        return false;
      }
      // 4.如果购物车列表已显示,则启动滑动功能
      if (this.isShow) {
        // 5.在修改数据之后立即调用(Vue的api)
        this.$nextTick(() => {
          // 6.要防止创建多个BScroll,确认this.scroll未创建
          if (!this.scroll) {
            // 7.未创建,则创建新的
            this.scroll = new BScroll(".list-content", {
              // 8.开启点击功能
              click: true
            });
            // 9.如果已创建
          } else {
            // 10.解决第一次滑动失效问题(目前新版本这个可以不加)
            this.scroll.refresh(); //刷新滚动条
          }
        });
      }
      // 11.返回this.isShow的booleans值
      return this.isShow;
      // 12.在购物车列表DOM元素中使用v-show来判断是否显示
    }
  },
  methods: {
    // 显示/隐藏 购物车
    toggleShow() {
      // 1.1必须要限制食品数量大于0,才能让isShow取非
      // 1.2不限制的话未添加商品前,点击了购物车,也会导致isShow取非
      if (this.totalCount > 0) {
        this.isShow = !this.isShow;
      }
      // 2.在购物车DOM元素和购物车阴影DOM元素中使用该切换方法
    },

    // 清空购物车
    clearCart() {
      // 1.从mint-ui复制过来的基本使用
      MessageBox.confirm("确认清空购物车?").then(
        // 2.确认清空的话
        action => {
          // 3.使用vuex的action同步清空购物车数据
          this.$store.dispatch("clearCart");
        },
        // 4.取消   () => {} // 取消的另一个写法
        action => {
          // 5.不设置
        }
      );
      // 6.在清空按钮上使用该方法
    }
  },
  components: {
    CartControl
  }
};
</script>

<style lang="scss" scoped>
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;
  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);
    .content-left {
      flex: 1;
      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;
          &.highlight {
            background: #02a774;
          }
          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;
            &.highlight {
              color: #fff;
            }
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          background: #f01414;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }
      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 5px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: 700;
        color: #fff;
        &.highlight {
          color: #fff;
        }
      }
      .desc {
        display: inline-block;
        vertical-align: bottom;
        margin-bottom: 15px;
        margin-left: -45px;
        font-size: 10px;
      }
    }
    .content-right {
      flex: 0 0 105px;
      width: 105px;
      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        color: #fff;
        &.not-enough {
          background: #2b333b;
        }
        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
  }
  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #00b43c;
        transition: all 0.4s linear;
      }
    }
  }
  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    // 将购物车列表向上移动100%,原本的位置是在下面
    transform: translateY(-100%);
    &.move-enter-active,
    &.move-leave-active {
      transition: transform 0.3s;
    }
    &.move-enter,
    &.move-leave-to {
      // 需要使用动画属性将起始位置设置为0,也就是屏幕外
      transform: translateY(0);
    }
    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .title {
        float: left;
        font-size: 14px;
        color: #07111b;
      }
      .empty {
        float: right;
        font-size: 12px;
        color: #00a0dc;
      }
    }
    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #fff;
      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        .name {
          line-height: 24px;
          font-size: 14px;
          color: #07111b;
        }
        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: #f01414;
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
}
.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(10px);
  opacity: 1;
  background: #07111b99;
  &.fade-enter-active,
  &.fade-leave-active {
    transition: all 0.5s;
  }
  &.fade-enter,
  &.fade-leave-to {
    opacity: 0;
    background: #07111b00;
  }
}
</style>

