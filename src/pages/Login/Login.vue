<template>
  <section class="login-container">
    <!-- 登录界面 -->
    <div class="login-inner">
      <!-- 头部信息 -->
      <div class="login-header">
        <h1>硅谷外卖</h1>
        <div class="login-methods">
          <!-- 用class绑定属性，和click点击事件实现登录方式隐藏切换 -->
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login-content">
        <!-- 登录表单(提交submit.prevent()提交表单内容且阻止默认行为) -->
        <form @submit.prevent="login">
          <!-- 短信登录 -->
          <!-- 这里添加的绑定属性是 是否隐藏 -->
          <div :class="{on:loginWay}">
            <section class="login-message">
              <!-- 使用v-model表单输入绑定，添加computed计算属性 监控手机号输入结果（用正则表达式匹配），判断布尔值，true的话，即按钮样式生效 -->
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" />
              <!-- 注意right_phone样式名必须是下划线... -->
              <button
                :disabled="!rightPhone"
                class="login-verification-get"
                :class="{right_phone:rightPhone}"
                @click.prevent="getCode"
              >{{computedTime>0?`已发送(${computedTime}s)`:'获取验证码'}}</button>
            </section>
            <section class="login-verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code" />
            </section>
            <section class="login-hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <!-- 用户名密码登录 -->
          <div :class="{on:!loginWay}">
            <section class="login-message">
              <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name" />
            </section>
            <section class="login-message">
              <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd" />
              <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd" />
              <!-- 复制过来的开关按钮 -->
              <!-- <div class="switch_button off" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                <div class="switch_circle" :class="{right: showPwd}"></div>
                <span class="switch_text">{{showPwd ? 'abc' : '...'}}</span>
              </div>-->
              <!-- mint-ui的开关按钮 -->
              <mt-switch class="switch_text" v-model="showPwd">
                <span class="switch_text" v-if="showPwd">显示</span>
                <span class="switch_text" v-else>隐藏</span>
              </mt-switch>
            </section>
            <section class="login-verification">
              <input type="text" maxlength="8" placeholder="验证码" v-model="captcha" />
              <img
                class="get_verification"
                src="http://localhost:4000/captcha"
                alt="captcha"
                ref="captcha"
                @click="getCaptcha"
              />
            </section>
            <section class="login-hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <button class="login-submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about-us">关于我们</a>
      </div>
      <!-- 返回上一个界面按钮 -->
      <a @click="$router.back()" href="javascript:;">
        <span class="iconfont icon-jiantou2"></span>
      </a>
    </div>
    <AlertTip :alertText="alertText" @closeTip="alertShow=false" v-show="alertShow" />
  </section>
</template>

<script>
import AlertTip from "../../components/AlertTip/AlertTip.vue";
import { reqPwdLogin, reqSendCode, reqSmsLogin } from "../../api";
import axios from "axios";

export default {
  data() {
    return {
      loginWay: true, //切换登录方式，true为短信登录 false为密码登录
      showPwd: false, //默认不显示密码
      phone: "", //手机号,查看文档,是否是string字符串格式
      code: "", //短信验证码
      name: "", //用户名
      pwd: "", //密码
      captcha: "", //图片验证码
      computedTime: 0, //初始化倒计时事件,并存储到data
      alertText: "", //提示信息
      alertShow: false //是否显示提示框
    };
  },
  computed: {
    rightPhone() {
      // return /^1\d{10}$/.test(this.phone); //监控手机号输入是否正确,返回true,上面的发送短信按钮样式则会显示
      return /^1[3-9]\d{9}$/.test(this.phone); //更严格的验证
    }
  },
  components: {
    AlertTip
  },
  methods: {
    // 这个点击事件,出现了页面表单提交行为,导致页面刷新了一下,要去点击位置设置@click.prevent阻止这个默认行为
    // 点击倒计时(使用setInterval循环定时器,因为之后可能再次需要倒计时)

    // 异步获取短信
    async getCode() {
      // 1.必须要先判断当前没有计时器(也就是this.computedTime===0时),才可以触发该事件,不然有BUG
      if (!this.computedTime) {
        // 2.初始化倒计时为30秒
        this.computedTime = 30;
        // 3.const intervalId改成this.intervalId,这样后面的函数也能清除这个定时器了
        this.intervalId = setInterval(() => {
          // 4.时间递减
          this.computedTime--;
          // 5.当小于0了
          if (this.computedTime <= 0) {
            // 6.就清除这个定时器
            clearInterval(this.intervalId);
          }
        }, 1000);
      }

      // 发送ajax请求(向用户输入的手机号发送验证码短信---但这里只能使用测试手机号)
      // 方法一(使用封装发送)
      // const result = await reqSendCode(this.phone);
      // 方法二(在组件中发送)
      const result = await axios.get(
        "./api" + "/sendcode" + "?" + "phone=" + this.phone
      );
      // 1.如果获取验证码失败
      if (result.code === 1) {
        // 2.显示提示
        this.showAlert(result.msg);
        // 3.停止计时
        if (this.computedTime) {
          // 4.倒计时清零
          this.computedTime = 0;
          // 5.清除循环定时器
          clearInterval(this.intervalId);
          this.intervalId = undefined; // 这一步是为了以防万一,可以去掉
        }
      }
    },

    // 显示提示框封装
    showAlert(alertText) {
      this.alertText = alertText; // 出现问题时,提示框的内容
      this.alertShow = true; // 显示
    },
    // 关闭提示框封装
    // 在组件中@closeTip="closeTip"但也可以选择直接@closeTip="alertShow=false"
    // closeTip() {
    //   this.alertText = "" // 清空内容
    //   this.alertShow = false // 关闭
    // },

    // 异步登录
    async login() {
      //直接初始化一个登录请求返回结果
      let result;

      // 一、短信登录
      if (this.loginWay) {
        // 1.将对象内容解构出来,this.phone直接写phone
        const { phone, code, rightPhone } = this;
        // 2.校验计算属性中的rightPhone方法是否为false(也就是disabled,是否让按钮可点击)
        if (!this.rightPhone) {
          // 3.手机号正则验证错误
          this.showAlert("手机号错误");
          return;
        }
        // 4.验证码正则验证错误
        if (!/^\d{6}$/.test(code)) {
          this.showAlert("验证必须是6位数字");
          return;
        }
        // 5.经过输入校验后发送ajax请求短信登录
        result = await reqSmsLogin({ phone, code });
        console.log(result);

        // 二、密码登录
      } else {
        // 1.将对象内容解构出来,下面就可以将this.name直接写name
        const { name, pwd, captcha } = this;
        // 2.如果v-model="name"为空
        if (!this.name) {
          this.showAlert("用户名不能为空");
          return;
        }
        // 3.如果v-model="pwd"为空
        if (!this.pwd) {
          this.showAlert("密码不能为空");
          return;
        }
        // 4.如果v-model="captcha"为空
        if (!this.captcha) {
          this.showAlert("验证码不能为空");
          return;
        }
        // 5.经过输入校验后再发送ajax请求密码登录
        result = await reqPwdLogin({ name, pwd, captcha });
      }

      // 三、清除定时器(无论成功失败都要停止)
      if (this.computedTime) {
        // 1.倒计时清零
        this.computedTime = 0;
        // 2.清除循环定时器
        clearInterval(this.intervalId);
        // 3.这一步是为了以防万一,可以去掉
        this.intervalId = undefined;
      }

      // 四、统一处理 短信登录和密码登录 返回结果
      // 成功
      if (result.code === 0) {
        // 1.获取用户信息
        const user = result.data;
        // 2.保存用户信息user到vuex的state中
        this.$store.dispatch("saveUser", user); //在'我的'组件中显示用户信息
        // 3.跳转到登录后'我的'页面
        this.$router.replace("/profile");
        // 失败
      } else {
        // 1.获取错误信息
        const msg = result.msg;
        // 2.弹出错误提示
        this.showAlert(msg);
        // 3.更新图形验证码
        this.getCaptcha();
        // 4.清空验证码
        this.captcha = "";
      }
    },

    // 五、获取图形验证码(点击可触发重新获取图片)
    getCaptcha() {
      // 1.要保证每次指定的src不一样，这里使用"?time="来拼接Date.now()的方法
      // 2.ref: 选中带有ref="captcha"的元素(算是vue的DOM操作)
      this.$refs.captcha.src =
        "http://localhost:4000/captcha?time=" + Date.now();
    }
  }
};
</script>

<style lang="scss" scope>
.login-container {
  box-sizing: border-box; // 加了这个 padding就不会改变盒子宽高了
  padding-top: 60px;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: #fff;
  input:hover {
    border: 1px solid #02a774;
  }
  input {
    box-sizing: border-box; // 加了这个 padding就不会改变盒子宽高了
    padding-left: 5px;
    height: 48px;
    width: 100%;
    font-size: 14px;
    line-height: 21px;
    margin-bottom: 15px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    outline: 0; // 取消边框样式
    background-color: #fff;
  }
  .login-inner {
    width: 80%;
    margin: 0 auto;
    .login-header {
      h1 {
        font-size: 40px;
        color: #02a774;
        font-weight: 700;
        text-align: center;
      }
      .login-methods {
        text-align: center;
        color: #333;
        font-size: 14px;
        padding-top: 40px;
        margin-bottom: 8px;
        a {
          color: #333;
          display: inline-block;
          padding-bottom: 5px;
        }
        a:first-child {
          margin-right: 40px;
        }
        .on {
          color: #02a774;
          font-weight: 700;
          border-bottom: 2px solid #02a774;
        }
      }
    }
    .login-content {
      // 切换登录方式
      > form {
        > div {
          display: none;
        }
        .on {
          display: block;
        }
      }
      //下面是样式
      .login-message {
        position: relative;
        .login-verification-get {
          position: absolute;
          right: 0;
          top: 25%;
          border: 0;
          background: transparent;
          // padding-top: 10px;
          text-align: left;
          color: #ccc;
          &.right_phone {
            color: black;
          }
        }

        // 复制过来的按钮
        // .switch_button {
        //   font-size: 12px;
        //   border: 1px solid #ddd;
        //   border-radius: 8px;
        //   transition: background-color 0.3s, border-color 0.3s;
        //   padding: 0 6px;
        //   width: 35px;
        //   height: 16px;
        //   line-height: 16px;
        //   color: #fff;
        //   position: absolute;
        //   top: 50%;
        //   right: 10px;
        //   transform: translateY(-100%);
        //   // margin-top: -5px;
        // }
        // .switch_button.off {
        //   background: #fff;
        // }
        // .switch_button.off .switch_text {
        //   float: right;
        //   color: #ddd;
        // }
        // .switch_button.on {
        //   background: #02a774;
        // }
        // .switch_button > .switch_circle {
        //   position: absolute;
        //   top: -1px;
        //   left: -1px;
        //   width: 16px;
        //   height: 16px;
        //   border: 1px solid #ddd;
        //   border-radius: 50%;
        //   background: #fff;
        //   box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        //   transition: transform 0.3s;
        //   &.right{
        //     transform: translateX(20px)
        //   }
        // }

        .mint-switch {
          position: absolute;
          top: 25%;
          right: 0%;
          .switch_text {
            position: absolute;
            top: 3px;
            right: 19px;
            font-size: 12px;
            color: #ddd;
          }
          .mint-switch-input:checked + .mint-switch-core {
            border-color: #02a774;
            background-color: #02a774;
          }
          .mint-switch-core {
            display: inline-block;
            position: relative;
            width: 42px;
            height: 18px;
            border: 1px solid #d9d9d9;
            border-radius: 16px;
            box-sizing: border-box;
            background: #d9d9d9;
          }
          .mint-switch-core::before {
            width: 40px;
            height: 16px;
          }
          .mint-switch-core::after {
            width: 18px;
            height: 18px;
            content: " ";
            top: -1px;
            left: -5px;
            position: absolute;
            z-index: 9;
          }
          .mint-switch-input:checked + .mint-switch-core::after {
            -webkit-transform: translateX(30px);
            transform: translateX(30px);
          }
        }
      }
      .login-verification {
        position: relative;
        input {
          height: 48px;
          font-size: 14px;
        }
        .get_verification {
          position: absolute;
          right: -5px;
          top: -5px;
        }
      }

      .login-hint {
        font-size: 14px;
        color: #999;
        line-height: 20px;
        text-indent: 0;
        a {
          color: #02a774;
        }
      }
      .login-submit {
        width: 100%;
        height: 42px;
        background-color: #4cd96f;
        color: #fff;
        font-size: 16px;
        border: 0;
        margin-top: 30px;
      }
      .about-us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .icon-jiantou2 {
      position: absolute;
      left: 5px;
      top: 5px;
      font-size: 20px;
    }
  }
}
</style>
