<template>
  <div class="shop-container">
    <!-- v-if判断是否已经获取到数据 -->
    <ul v-if="shops.length">
      <li class="shop-li" v-for="shop in shops" :key="shop.id" @click="$router.push('/shop')">
        <a href="#" class="shop-a">
          <div class="shop-left">
            <!-- <img src="./images/shop/1.jpg" alt /> -->
            <!-- 图片失败的处理效果 -->
            <img :src="baseImgUrl" />
          </div>
          <div class="shop-right">
            <section class="shop-1">
              <span>品牌</span>
              <div class="shop-title">
                <h3>{{shop.name}}</h3>
                <ul>
                  <li v-for="(icon,i) in shop.supports" :key="i">{{icon.icon_name}}</li>
                </ul>
              </div>
            </section>
            <section class="shop-2">
              <div class="shop-2-left">
                <!-- 星星评分 -->
                <Start :score="shop.rating" :size="24"></Start>
                <span class="shop-mark">{{shop.rating}}</span>
                <span>月售{{shop.recent_order_num}}单</span>
              </div>
              <div class="shop-2-right">{{shop.delivery_mode.text}}</div>
            </section>
            <section class="shop-3">
              <p>
                <span>￥{{shop.float_minimum_order_amount}}起送</span>
                <span>/</span>
                <span>配送费约￥{{shop.float_delivery_fee}}</span>
              </p>
            </section>
          </div>
        </a>
      </li>
    </ul>
    <!-- v-else如没有数据则显示图片 -->
    <ul v-else>
      <!-- 这里还需要循环一下,但是可以简写 -->
      <li v-for="item in 6" :key="item.i">
        <img src="./images/shop_back.svg" alt />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Start from "../Star/Star.vue";

export default {
  data() {
    return {
      baseImgUrl:
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1273705978,2860069322&fm=27&gp=0.jpg"
    };
  },
  computed: {
    ...mapState(["shops"])
  },
  components: {
    Start
  }
};
</script>

<style lang="scss" scoped>
.shop-container {
  background-color: #fff;
  .shop-li {
    position: relative;
  }
  .shop-a::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #f1f1f1;
    z-index: 9;
  }
  .shop-a {
    display: block;
    display: flex;
    padding: 14px 7px;
    .shop-left {
      height: 100%;
      img {
        width: 75px;
        height: 75px;
      }
    }
    .shop-right {
      width: 100%;
      padding-left: 10px;
      .shop-1 {
        display: flex;
        > span {
          background-color: #ffd930;
          color: #333;
          font-size: 12px;
          font-weight: 700;
          padding: 2px 2px;
          line-height: 12px;
          white-space: nowrap;
          display: flex;
          align-self: center;
        }
        .shop-title {
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding-left: 5px;
          h3 {
            font-size: 16px;
            font-weight: 700;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100px;
          }
          ul {
            display: flex;
            color: #999;
            li {
              font-size: 12px;
              border: 1px solid #f1f1f1;
              padding: 2px 2px;
            }
          }
        }
      }
      .shop-2 {
        color: #333;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 13px 0 10px;
        .shop-2-left {
          display: flex;
          > span {
            transform: scale(0.85);
            font-size: 10px;
            white-space: nowrap;
          }
          .shop-mark {
            color: #ff6000;
            font-size: 14px;
          }
        }
        .shop-2-right {
          display: flex;
          transform: scale(0.7);
          font-size: 12px;
          color: #02a774;
          border: 1px solid #02a774;
          padding: 2px;
          margin-right: -5px;
          // display: inline-block;
          // width: 50%;
        }
      }
      .shop-3 {
        p {
          transform: scale(0.9);
          font-size: 12px;
          color: #333;
          margin-left: -15px;
          span:nth-child(2) {
            color: #999;
          }
        }
      }
    }
  }
}
</style>
