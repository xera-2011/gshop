<template>
  <div class="shop-info" ref="shopInfo">
    <div class="info-content">
      <section class="section">
        <h3 class="section-title">配送信息</h3>
        <div class="delivery">
          <div>
            <span class="delivery-icon">{{info.description}}</span>
            <span>由商家配送提供配送，约 {{info.deliveryTime}} 分钟送达，距离 {{info.distance}}</span>
          </div>
          <div class="delivery-money">配送费￥{{info.deliveryPrice}}</div>
        </div>
      </section>

      <div class="split"></div>
      <!-- 各色优惠 -->
      <section class="section">
        <h3 class="section-title">活动与服务</h3>
        <div class="activity">
          <div
            class="activity-item"
            :class="supportClasses[support.type]"
            v-for="(support,index) in info.supports"
            :key="index"
          >
            <span class="content-tag">
              <span class="mini-tag">{{support.name}}</span>
            </span>
            <span class="activity-content">{{support.content}}</span>
          </div>
        </div>
      </section>

      <div class="split"></div>
      <!-- 商家图片 -->
      <section class="section">
        <h3 class="section-title">商家实景</h3>
        <div class="pic-wrapper">
          <ul class="pic-list" ref="picsUl">
            <li class="pic-item" v-for="(pic,index) in info.pics" :key="index">
              <img width="120" height="90" :src="pic" />
            </li>
          </ul>
        </div>
      </section>
      <div class="split"></div>
      <section class="section">
        <h3 class="section-title">商家信息</h3>
        <ul class="detail">
          <li>
            <span class="bold">品类</span>
            <span>{{info.category}}</span>
          </li>
          <li>
            <span class="bold">商家电话</span>
            <span>{{info.phone}}</span>
          </li>
          <li>
            <span class="bold">地址</span>
            <span>{{info.address}}</span>
          </li>
          <li>
            <span class="bold">营业时间</span>
            <span>{{info.workTime}}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { mapState } from "vuex";

export default {
  data() {
    return {
      // 从后台获取 对应索引值,在绑定样式上使用,就可以让对应优惠有对应颜色了
      supportClasses: ["activity-green", "activity-red", "activity-orange"]
    };
  },
  computed: {
    // 计算:之前在其它组件中已经 获取过了,这里可以不用请求,直接拿了
    ...mapState(["info"])
  },
  mounted() {
    this._initScroll();
  },
  methods: {
    // 方法:初始化滑动
    _initScroll() {
      // 1.如果pics数据没有拿到,就不往下执行
      if (!this.info.pics) {
        return;
      } // 1.1如果拿到了,则往下执行初始化
      // 2.上下滑动-初始化
      new BScroll(".shop-info");
      // 3.左右滑动
      // 4.获取ul的DOM元素 动态计算ul宽度(解决:子内容宽度小于父容器导致无法左右滑动问题)
      const ul = this.$refs.picsUl;
      // 5.设置li的图片固定宽度(根据实际li的width设置)
      const liWidth = 120;
      // 6.获取li的右margin值
      const margin = 6;
      // 7.获取pics中的图片数量
      const count = this.info.pics.length;
      // 8.设置ul宽度
      ul.style.width = (liWidth + margin) * count - margin + "px";
      // 9.左右滑动-初始化
      new BScroll(".pic-wrapper", {
        // eventPassthrough:'vertical',//忽略竖直方向的滚动
        scrollX: true // 10.水平滑动
      });
      // 11.在mounted钩子中调用
      // 12.还需要在watch监视info数据变动变 异步调用
    }
  },
  watch: {
    // 观察:info数据是否变动(得到数据)
    info() {
      // 1.异步调用(在DOM元素创建数据更新后才执行)
      this.$nextTick(() => {
        // 2.初始化滑动(刷新流程,更新数据)
        this._initScroll();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.shop-info {
  position: absolute;
  top: 195px;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  overflow: hidden;
  .section {
    padding: 16px 14px 14px;
    font-size: 16px;
    background-color: #fff;
    color: #666;
    border-bottom: 1px solid #eee;
    position: relative;
    .section-title {
      color: #000;
      font-weight: 700;
      line-height: 16px;
      & > .iconfont {
        float: right;
        color: #ccc;
      }
    }
    .delivery {
      margin-top: 16px;
      font-size: 13px;
      line-height: 18px;
      .delivery-icon {
        width: 55px;
        font-size: 11px;
        margin-right: 10px;
        display: inline-block;
        text-align: center;
        color: #fff;
        background-color: #0097ff;
        padding: 1px 0;
        border-radius: 4px;
      }
      .delivery-money {
        margin-top: 5px;
      }
    }
    .activity {
      margin-top: 16px;
      .activity-item {
        margin-bottom: 12px;
        display: flex;
        font-size: 13px;
        align-items: center;
        &.activity-green {
          .content-tag {
            background-color: #70bc46;
          }
        }
        &.activity-red {
          .content-tag {
            background-color: #f07373;
          }
        }
        &.activity-orange {
          .content-tag {
            background-color: #f1884f;
          }
        }
        .content-tag {
          display: inline-block;
          border-radius: 2px;
          width: 36px;
          height: 18px;
          margin-right: 10px;
          color: #fff;
          font-style: normal;
          position: relative;
          .mini-tag {
            position: absolute;
            left: 0;
            top: 0;
            right: -100%;
            bottom: -100%;
            font-size: 24px;
            transform: scale(0.5);
            transform-origin: 0 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
    .pic-wrapper {
      width: 100%;
      overflow: hidden;
      white-space: nowrap; /*当子元素超过父元素宽度的时候，不会折行*/
      margin-top: 16px;
      .pic-list {
        font-size: 0;
        .pic-item {
          display: inline-block;
          margin-right: 6px;
          width: 120px;
          height: 90px;
          &:last-child {
            margin: 0;
          }
        }
      }
    }
    .detail {
      margin-bottom: -16px;
      & > li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: -10px;
        padding: 16px 12px 16px 0;
        line-height: 16px;
        font-size: 13px;
        & > .bold {
          font-weight: 700;
          color: #333;
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
}
</style>
