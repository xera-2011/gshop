<template>
  <section class="login-container">
    <!-- 登录界面 -->
    <div class="login-inner">
      <!-- 头部信息 -->
      <div class="login-header">
        <h1>硅谷外卖</h1>
        <div class="login-methods">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login-content">
        <form>
          <!-- 短信登录 -->
          <div :class="{on:loginWay}">
            <section class="login-message">
              <input type="tel" maxlength="11" placeholder="手机号" />
              <button disabled="disabled" class="login-verification-get">获取验证码</button>
            </section>
            <section class="login-verification">
              <input type="tel" maxlength="8" placeholder="验证码" />
            </section>
            <section class="login-hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section class="login-message">
              <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" />
              <button disabled="disabled" class="login-verification-get">获取验证码</button>
            </section>
            <section class="login-message">
              <input type="tel" maxlength="11" placeholder="密码" />
            </section>
            <section class="login-verification">
              <input type="tel" maxlength="8" placeholder="验证码" />
              <img class="get_verification" src="./images/captcha.svg" alt />
            </section>
            <section class="login-hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <button class="login-submit">登录</button>
        </form>
        <a href="javascript:;" class="about-us">关于我们</a>
      </div>
      <!-- 返回上一个界面按钮 -->
      <a @click="$router.back()" href="javascript:;">
        <span class="iconfont icon-jiantou2"></span>
      </a>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loginWay: true
    };
  }
};
</script>

<style lang="scss" scope>
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 60px;
  margin: 0;
  background-color: #fff;

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
          top: 15%;
          border: 0;
          background: transparent;
          // padding-top: 10px;
          text-align: left;
          color: #ccc;
        }
        input {
          height: 48px;
          font-size: 14px;
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
          right: 0;
          top: 0;
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
