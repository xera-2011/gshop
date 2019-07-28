<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{info.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家 99%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <!-- 五角星评分子组件 -->
            <Star :score="info.serviceScore" :size="36" />
            <span class="score">{{info.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :score="info.foodScore" :size="36" />
            <span class="score">{{info.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{info.deliveryTime}} 分钟</span>
          </div>
        </div>
      </div>
      <div class="split"></div>
      <div class="ratingselect">
        <div class="rating-type border-1px">
          <!-- 设置setSelectType方法传入选择的评价参数() -->
          <span class="block positive" :class="{active:selectType===2}" @click="setSelectType(2)">
            全部
            <!-- 评价的length长度数,就是总评价数量 -->
            <span class="count">{{ratings.length}}</span>
          </span>
          <span class="block positive" :class="{active:selectType===0}" @click="setSelectType(0)">
            满意
            <!-- 从vuex的getters中计算过滤出满意评论数量 -->
            <span class="count">{{positiveSize}}</span>
          </span>
          <span class="block negative" :class="{active:selectType===1}" @click="setSelectType(1)">
            不满意
            <!-- 总评价数量减去满意的评价数量 -->
            <span class="count">{{ratings.length-positiveSize}}</span>
          </span>
        </div>
        <!-- 绑定class属性,在click点击方法中判断是否勾选 -->
        <div class="switch" :class="{on: onlyShowText}" @click="toggleOnlyShowText">
          <span class="iconfont icon-check_circle"></span>
          <span class="text">只看有内容的评价</span>
        </div>
      </div>
      <div class="rating-wrapper">
        <ul>
          <!-- 评价这里必须遍历 ratings被过滤后的数组filterRatings -->
          <li class="rating-item" v-for="(rating,index) in filterRatings" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar" />
            </div>
            <div class="content">
              <h1 class="name">={{rating.username}}</h1>
              <div class="star-wrapper">
                <!-- 五角星评分子组件 -->
                <Star :score="rating.score" :size="24" />
                <span class="delivery">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <!-- 通过rating.rateType是否等于0判断用户对事物是否点赞 -->
                <span
                  class="iconfont"
                  :class="rating.rateType===0?'icon-thumb_up':'icon-thumb_down'"
                ></span>
                <!-- 如果二次循环的里面没有名字,就用二次循环自己的名字表示里面的值 -->
                <span
                  class="item"
                  v-for="(recommend,index) in rating.recommends"
                  :key="index"
                >{{recommend}}</span>
              </div>
              <div class="time">{{rating.rateTime | date-format}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Star from "../../components/Star/Star.vue";
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      onlyShowText: true, //是否显示只有文本的评价
      selectType: 2 //选择评价类型: 0满意,1不满意,2全部
    };
  },
  mounted() {
    // 商家信息之前已经获取存储过了
    // 使用vuex的action异步请求商家评价列表数据---并传入better-scroll滑动函数
    this.$store.dispatch("getShopRatings", this._initScroll());
  },
  computed: {
    // 计算:从vuex的state中获取 商家信息,商家评价列表
    ...mapState(["info", "ratings"]),
    // 计算:从vuex的getters中计算过滤出满意的评论数量
    ...mapGetters(["positiveSize"]),

    // 计算:过滤评价
    filterRatings() {
      // 1.得到相关的数据(让this.xxx简写成xxx)
      const { ratings, onlyShowText, selectType } = this;
      // 2.产生一个过滤新数组
      return ratings.filter(rating => {
        // 3.需要每条评论的 { 满意/不满意, 评论文字 }
        const { rateType, text } = rating;
        /* 4.条件分析
          条件1:
              selectType: 0/1/2 --- 用户选择(满意/不满意/全部)
              rateType: 0/1 --- 后台数据(满意/不满意)
              全部||满意/不满意
              selectType===2 || selectType===rateType
          条件2:
              onlyShowText: true/false --- 是否显示只有文本的评价
              text:有值/没值
              符合条件1的全部评价 || 符合条件1的有文字的评价
              !onlyShowText || text.length>0
         */
        // 5.返回判断结果(布尔值booleans)
        return (
          (selectType === 2 || selectType === rateType) &&
          (!onlyShowText || text.length > 0)
        );
      });
      // 6.将过滤后的评论 放入评论列表中的循环遍历 渲染列表
    }
  },
  methods: {
    // 方法:初始化滑动
    _initScroll() {
      // 0.// 异步调用(在DOM元素创建数据更新后才执行),但这里不用这么做也行
      this.$nextTick(() => {
        // 1.1初始化滑动并找到该class样式名的元素
        // 1.2也可通过ref选择DOM元素,如this.$refs.ratings无双引号
        new BScroll(".ratings", {
          // 2.允许触发click点击事件
          click: true
        });
      });
      // 3.在mounted钩子action异步请求数据的同时 传入该方法
    },

    // 方法:用户选择(0/1/2)满意/不满意/全部
    setSelectType(selectType) {
      this.selectType = selectType;
      // 在用户选择后调用
    },

    // 方法:是否显示只有文本的评价
    toggleOnlyShowText() {
      this.onlyShowText = !this.onlyShowText;
      // 在用户勾选后调用
    }
  },
  components: {
    Star
  }
};
</script>

<style lang="scss" scoped>
.ratings {
  position: absolute;
  top: 195px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  background: #fff;
  .overview {
    display: flex;
    padding: 18px 0;
    .overview-left {
      flex: 0 0 137px;
      padding: 6px 0;
      width: 137px;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      text-align: center;
      .title {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: #07111b;
      }
      .rank {
        line-height: 10px;
        font-size: 10px;
        color: #93999f;
      }
    }
    .overview-right {
      flex: 1;
      padding: 6px 0 6px 24px;
      .score-wrapper {
        .title {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: #07111b;
        }
        .star {
          display: inline-block;
          margin: 0 12px;
          vertical-align: top;
        }
        .score {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: #f90;
        }
      }
      .delivery-wrapper {
        font-size: 0;
        .title {
          line-height: 18px;
          font-size: 12px;
          color: #07111b;
        }
        .delivery {
          margin-left: 12px;
          font-size: 12px;
          color: #93999f;
        }
      }
    }
  }
  .split {
    width: 100%;
    height: 16px;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    background: #f3f5f7;
  }
  .ratingselect {
    .rating-type {
      padding: 18px 0;
      margin: 0 18px;
      color: #07111b1a;
      font-size: 0;
      .block {
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        line-height: 16px;
        border-radius: 1px;
        font-size: 12px;
        color: #4d555d;
        background: #4d555d33;
        &.active {
          background: #02a774;
          color: #fff;
        }
        .count {
          margin-left: 2px;
          font-size: 8px;
        }
      }
    }
    .switch {
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid #07111b1a;
      color: #93999f;
      font-size: 0;
      &.on {
        // color: #02a774;
        .icon-check_circle {
          color: #02a774;
        }
      }
      .icon-checkcircle {
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
        font-size: 24px;
      }
      .text {
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
      }
    }
  }
  .rating-wrapper {
    padding: 0 18px;
    .rating-item {
      display: flex;
      padding: 18px 0;
      .avatar {
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;
        img {
          border-radius: 50%;
        }
      }
      .content {
        position: relative;
        flex: 1;
        .name {
          margin-bottom: 4px;
          line-height: 12px;
          font-size: 10px;
          color: #07111b;
        }
        .star-wrapper {
          margin-bottom: 6px;
          font-size: 0;
          .star {
            display: inline-block;
            margin-right: 6px;
            vertical-align: top;
          }
          .delivery {
            display: inline-block;
            vertical-align: top;
            height: 12px;
            line-height: 12px;
            font-size: 10px;
            color: #93999f;
          }
        }
        .text {
          margin-bottom: 8px;
          line-height: 18px;
          color: #07111b;
          font-size: 12px;
        }
        .recommend {
          line-height: 16px;
          font-size: 0;
          .icon-thumb_up {
            color: yellow;
          }
          .icon-thumb_down {
            color: #93999f;
          }
          .item {
            padding: 0 6px;
            border: 1px solid #07111b1a;
            border-radius: 1px;
            color: #93999f;
            background: #fff;
          }
        }
        .time {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 12px;
          font-size: 10px;
          color: #93999f;
        }
      }
    }
  }
}
// @media {
//   only {
//     screen {
//       and {
//         (max-width {
//           &:320px) {
//             .ratings .overview .overview-left{flex: 0 0 120px;
//             width: 120px;
//             .ratings .overview .overview-right{padding-left: 6px;
//           }
//         }
//       }
//     }
//   }
// }
// }
.ratings {
  .overview {
    .overview-left {
      .score {
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: #f90;
      }
    }
    .overview-right {
      .score-wrapper {
        margin-bottom: 8px;
        font-size: 0;
      }
    }
  }
}
.ratings .rating-wrapper .rating-item .content .recommend .icon-thumb_up,
.ratings .rating-wrapper .rating-item .content .recommend .icon-thumb_down,
.ratings .rating-wrapper .rating-item .content .recommend .item {
  display: inline-block;
  margin: 0 8px 4px 0;
  font-size: 9px;
}
</style>
