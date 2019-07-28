<template>
  <div class="cartcontrol">
    <!-- move动画 -->
    <transition name="move">
      <!-- 需要通过food.count是否有数据判断是否点击了加号按钮,无数据则 不显示数字 和 减号按钮 -->
      <div
        class="iconfont icon-remove_circle_outline"
        v-if="food.count"
        @click.stop="updateFoodCount(false)"
      ></div>
    </transition>
    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <!-- @click.stop 阻止事件冒泡 -->
    <div class="iconfont icon-add_circle" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>
export default {
  props: {
    food: Object // 传入的参数对象包含食品类型和增加数量
  },
  methods: {
    // 是否增加数量---由点击事件传入Booleans布尔值判断
    updateFoodCount(isAdd) {
      // 因为food是在goods里的数据(因为涉及到购物车的数据)
      // 所以使用vuex的action调用数据,传参{Booleans值,食品数据}
      this.$store.dispatch("updateFoodCount", { isAdd, food: this.food });
    }
  }
};
</script>

<style lang="scss" scoped>
.cartcontrol {
  font-size: 0;
  .cart-decrease {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: #00a0dc;
  }
  .icon-remove_circle_outline {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: #02a774;
    // 点击动画
    &.move-enter-active,
    &.move-leave-active {
      transition: all 0.3s;
    }
    &.move-enter,
    &.move-leave-to {
      opacity: 0;
      transform: translateX(15px) rotate(180deg);
    }
  }
  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: #93999f;
  }
  .icon-add_circle {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: #02a774;
  }
}
</style>
