<template>
  <div class="profile">
    <HeaderTop title="俺的"></HeaderTop>
    <!-- 登录注册(已登录则显示个人信息) -->
    <section class="profile-number">
      <!-- 判断是否登录,为此改变这里点击跳转的路由 -->
      <router-link :to="userInfo._id?'/userinfo':'/login'" class="profile-link">
        <div class="profile-image">
          <i class="iconfont icon-person"></i>
        </div>
        <div class="user-info">
          <!-- 判断是哪种登录方式登录的,如果userInfo.phone为空则显示 用户名 或者 登录注册 -->
          <p class="user-info-top" v-if="!userInfo.phone">{{userInfo.name||'登录/注册'}}</p>
          <p class="user-info-bottom">
            <i class="iconfont icon-shouji icon-mobile"></i>
            <span class="icon-mobile-number">{{userInfo.phone||'暂无绑定手机号'}}</span>
          </p>
        </div>
        <span class="arrow">
          <i class="iconfont icon-jiantou1"></i>
        </span>
      </router-link>
    </section>
    <!-- 账户信息 -->
    <section class="profile-info-data">
      <div class="info-data-list">
        <a href="javascript:;" class="info-data-link">
          <span class="info-data-top">
            <span>0.00</span>元
          </span>
          <span class="info-data-bottom">我的余额</span>
        </a>
        <a href="javascript:;" class="info-data-link">
          <span class="info-data-top">
            <span>0</span>个
          </span>
          <span class="info-data-bottom">我的优惠</span>
        </a>
        <a href="javascript:;" class="info-data-link">
          <span class="info-data-top">
            <span>0</span>分
          </span>
          <span class="info-data-bottom">我的积分</span>
        </a>
      </div>
    </section>
    <!-- 功能 -->
    <section class="profile-my-order">
      <a href="javascript:;" class="my-order">
        <span class="iconfont icon-order-s"></span>
        <div class="my-order-div">
          <span>我的订单</span>
          <span class="my-order-icon iconfont icon-jiantou1"></span>
        </div>
      </a>
      <a href="javascript:;" class="my-order">
        <span class="iconfont icon-jifen"></span>
        <div class="my-order-div">
          <span>积分商城</span>
          <span class="my-order-icon iconfont icon-jiantou1"></span>
        </div>
      </a>
      <a href="javascript:;" class="my-order">
        <span class="iconfont icon-vip"></span>
        <div class="my-order-div">
          <span>外卖会员卡</span>
          <span class="my-order-icon iconfont icon-jiantou1"></span>
        </div>
      </a>
      <a href="javascript:;" class="my-order">
        <span class="iconfont icon-fuwu"></span>
        <div class="my-order-div">
          <span>服务中心</span>
          <span class="my-order-icon iconfont icon-jiantou1"></span>
        </div>
      </a>
    </section>
    <section>
      <mt-button @click="logout" type="danger" style="width:100%" v-show="userInfo._id">退出登录</mt-button>
    </section>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      MessageBox.confirm("确认退出?").then(
        // 请求退出
        action => {
          this.$store.dispatch("logout");//在vuex中action中发异步送退出请求
        },
        action => {
          console.log("取消退出");
        }
      );
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  components: {
    HeaderTop
  }
};
</script>

<style lang="scss" scoped>
.profile {
  margin-top: 45px;
  .profile-number {
    overflow: hidden;
    padding: 20px 10px;
    background-color: #02a774;
    border-top: 1px solid #fff;
    color: #fff;
    .profile-link {
      display: inline-block; //如果设置block不行 就inline-block
      width: 100%;
      height: 100%;
    }
    .profile-image {
      float: left;
      background-color: #e4e4e4;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
      .icon-person {
        color: #7e8c8d;
        font-size: 62px;
        position: absolute;
        bottom: -2px;
        right: -2px;
      }
    }
    .user-info {
      float: left;
      margin-left: 15px;
      padding-top: 10px;
      height: 60px;
    }
    .user-info-top {
      color: #fff;
      font-size: 18px;
      font-weight: 700;
    }
    .user-info-bottom {
      font-size: 14px;
      text-indent: 15px;
      color: #fff;
      padding-top: 13px;
      position: relative;
      .icon-mobile {
        font-size: 30px;
        vertical-align: text-top;
        padding-left: 5px;
        position: absolute;
        right: 85px;
        top: 6px;
      }
    }
    .arrow {
      float: right;
      text-align: center;
      margin-top: 18px;
      .icon-jiantou1 {
        font-size: 12px;
        color: #fff;
      }
    }
  }
  .info-data-list {
    display: flex;
    background-color: #fff;
    border-bottom: 1px solid #f1f1f1;
    .info-data-link:first-child {
      border-left: none;
      .info-data-top span {
        color: #f90;
      }
    }
    .info-data-link:nth-of-type(2) {
      .info-data-top span {
        color: #ff5f3e;
      }
    }
    .info-data-link:nth-of-type(3) {
      .info-data-top span {
        color: #6ac20b;
      }
    }
    .info-data-link {
      display: block;
      width: 33%;
      color: #666;
      height: 80px;
      border-left: 1px solid #f1f1f1;
      border-bottom: 1px solid #f1f1f1;
      .info-data-top {
        font-size: 14px;
        text-align: center;
        display: block;
        padding: 18px 5px 8px;
        margin-left: 10px;
        span {
          font-size: 30px;
          font-weight: bold;
        }
      }
      .info-data-bottom {
        text-align: center;
        display: block;
        font-size: 14px;
      }
    }
  }
  .profile-my-order {
    margin-top: 10px;
    .my-order {
      padding-left: 5px;
      display: flex;
      border-top: 1px solid #f1f1f1;
      background-color: #fff;
      .icon-order-s {
        font-size: 30px;
        color: #02a774;
        padding-top: 8px;
      }
      .icon-jifen {
        font-size: 30px;
        color: #ff5f3e;
        padding-top: 8px;
      }
      .icon-vip {
        font-size: 30px;
        color: #f90;
        padding-top: 8px;
      }
      .icon-fuwu {
        font-size: 30px;
        color: #02a774;
        padding-top: 8px;
      }
      .my-order-div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f1f1f1;
        padding: 15px 10px 15px 0;

        > span {
          font-size: 16px;
          color: #333;
        }
        .my-order-icon {
          font-size: 14px;
          color: #bbb;
        }
      }
    }
  }
  .my-order:nth-child(4) {
    margin-top: 10px;
  }
}
</style>

