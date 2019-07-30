<template>
  <div>
    <div class="goods">
      <!-- 左侧列表 -->
      <div class="menu-wrapper">
        <ul>
          <!-- current选中状态 -->
          <li
            class="menu-item"
            v-for="(good,i) in goods"
            :key="i"
            :class="{current: i===currentIndex}"
            @click="clickMenuItem(i)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon" />
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <!-- 右侧列表 -->
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <!-- 食品分类-左侧列表的显示数据 -->
          <li class="food-list-hook" v-for="(good,i) in goods" :key="i">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <!-- 食品信息(这里food是goods商品列表的数据) -->
              <li
                class="food-item bottom-border-1px"
                v-for="(food,i) in good.foods"
                :key="i"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率 {{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 购物车 -->
      <ShopCart />
    </div>
    <!-- 食品信息 -->
    <Food :food="food" ref="food" />
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { mapState } from "vuex";
import CartControl from "../../components/CartControl/CartControl.vue";
import Food from "../../components/Food/Food.vue";
import ShopCart from "../../components/ShopCart/ShopCart.vue";

export default {
  data() {
    return {
      scrollY: 0, //右侧和滑动的Y轴坐标(实时变化)
      tops: [], //所有右侧分类li的top组成的数组(列表第一次显示就不再变化)
      food: {} //需要显示的food
    };
  },
  mounted() {
    // 用vuex的action异步获取商品数据---并传入better-scroll滑动函数
    this.$store.dispatch("getShopGoods", () => {
      // 跟首页的数据轮播一样,也需要在DOM元素创建数据更新后才执行better-scroll滑动函数
      this.$nextTick(() => {
        this._initScrooll();
        this._initTops();
      });
    });
  },
  computed: {
    // 计算:从vuex中的state中获取食品数据
    ...mapState(["goods", "cartFoods"]),

    // 计算:得到当前分类下标(根据滑动产生的tops高度数组)
    currentIndex() {
      // 1.条件数据(从这样做之后就不用this.scrollY和this.tops)
      const { scrollY, tops } = this;
      // 2.根据条件计算产生一个结果
      const index = tops.findIndex((top, index) => {
        // 3.当满足 scrollY >= 当前top &&(并且) < 下一个top
        return scrollY >= top && scrollY < tops[index + 1];
      });
      // 4.返回索引结果(当前处于第几个li中,也就是左边的列表)
      return index;
      // 假设[ 0 , 3 , 8 , 12 ],传入进去5, 因为在3和8之间,所以返回3的索引值 ,也就是1
      // 拿到这个索引值到左边列表判断给第几个li 加上class属性current,表示选中了
    }
  },
  // 技巧 事件回调就加下划线_,不是则不加,以便区分
  methods: {
    // 方法:初始化滑动
    _initScrooll() {
      // 1.初始化滑动并找到该class样式名的元素,也可通过ref选择DOM元素
      new BScroll(".menu-wrapper", {
        // 2.允许触发click点击事件
        click: true
      });
      // 3.初始化右侧列表滑动 (传入获取对象的scroll事件,滑动的实时坐标)
      // 本是const foodsScroll改为this.foodsScroll,为了能在另外一个方法中找到这个属性,如下面的clickMenuItem点击方法
      this.foodsScroll = new BScroll(".foods-wrapper", {
        // 4.触发时机(改成3的话 解决惯性滑动不触发currentIndex的问题:方法二)
        probeType: 2, // 设置2因为惯性滑动没必要触发(具体可看better-scroll官方文档)
        // 允许触发click点击事件
        click: true
      });
      // 5.给右侧列表绑定scroll监听 获取xy的值
      this.foodsScroll.on("scroll", ({ x, y }) => {
        // 6.收集scrollY的数据(y取绝对值)
        // console.log(x, y);
        this.scrollY = Math.abs(y);
      });
      // 7.给右侧列表绑定scroll结束的监听(解决惯性滑动不触发currentIndex的问题:方法二)
      this.foodsScroll.on("scrollEnd", ({ x, y }) => {
        // console.log("scrollEnd", x, y);
        this.scrollY = Math.abs(y);
      });
      // 8.在mounted钩子action异步请求数据的同时 传入该方法
    },

    // 方法:初始化tops
    _initTops() {
      // 1.初始化tops数组(右侧分类li的top组成的数组)
      const tops = [];
      // 2.定义第一个li的高度为0
      let top = 0;
      // 3.并先添加到数组中
      tops.push(top);
      // 4.找到所有食品分类的li(注意ref="foodsUl"是定义给li的父级ul)
      const lis = this.$refs.foodsUl.children; //方法一
      // const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook'); //方法二
      // 5.伪数组变真数组, 然后forEach循环里面的每一项li.clientHeight(也就是li的高度)
      Array.prototype.slice.call(lis).forEach(li => {
        // 6.存入top（越来越高）
        top += li.clientHeight;
        // 7.存入tops数组(从小到大)
        tops.push(top);
      });
      // 8.更新数据（将这里的tops存入data里的tops）
      this.tops = tops;
      // console.log(tops);
      // 9.最后在在mounted钩子中触发
    },

    // 方法:点击左侧列表,让右侧列表活动到对应位置
    clickMenuItem(i) {
      // console.log(i);
      // 1.通过tops[i]的高度,得到目标位置的scrollY
      const scrollY = this.tops[i];
      // 2.即刻更新this.scrollY(让点击的分类项立刻变为当前分类)
      this.scrollY = scrollY;
      // 3.这里需要获取并控制右侧列表this.foodsScroll滑动距离和延迟
      // scrollTo是better-scroll里的方法
      this.foodsScroll.scrollTo(0, -scrollY, 300);
      // 4.在左侧列表的li中click点击调用该方法
    },

    // 方法:点击显示food信息 传入food参数
    showFood(food) {
      // 1.将点击的li食品的的food信息存入this.food(让子组件接收并渲染)
      this.food = food;
      // 2.显示food组件(父组件调用Food子组件的方法)
      // 下面这样做只是 尝试一下父组件调用子组件方法
      this.$refs.food.toggleShow();
      // 3.在右侧列表的li中定义click点击事件
    }
  },
  components: {
    CartControl,
    Food,
    ShopCart
  }
};
</script>

<style lang="scss" scoped>
.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;
  .bottom-border-1px {
    position: relative;
    border: none;
    &:after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: rgba(7, 17, 27, 0.1); //--------------修改了
      // background-color: $color;
      transform: scaleY(0.5);
    }
  }
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    .menu-item {
      display: table;
      height: 54px;
      // width: 100%; //------------修改了
      padding: 0 12px;
      line-height: 14px;
      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: green;
        font-weight: 700;
      }
      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }
      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        border-bottom: 1px rgba(7, 17, 27, 0.1);
        font-size: 12px;
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: #93999f;
      background: #f3f5f7;
    }
    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      &:last-child {
        margin-bottom: 0;
      }
      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }
      .content {
        flex: 1;
        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: #07111b;
        }
        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }
        .extra {
          .count {
            margin-right: 12px;
          }
        }
        .price {
          font-weight: 700;
          line-height: 24px;
          .now {
            margin-right: 8px;
            font-size: 14px;
            color: #f01414;
          }
          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: #93999f;
          }
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
.goods .foods-wrapper .food-item .content .desc,
.goods .foods-wrapper .food-item .content .extra {
  line-height: 10px;
  font-size: 10px;
  color: #93999f;
}
</style>
