<template>
  <section class="search">
    <!-- 搜索输入 -->
    <HeaderTop title="搜索" />
    <!-- 提交表单搜索内容,并prevent阻止默认提交刷新页面行为 -->
    <form class="search_form" @submit.prevent="search">
      <input type="search" placeholder="请输入商家名称" class="search_input" v-model="keyword" />
      <input type="submit" class="search_submit" />
    </form>
    <!-- 搜索列表(如果搜索内容有数据,则显示列表) -->
    <section class="list" v-if="!noSearchShops">
      <ul class="list_container">
        <!-- to路由跳转也可以写成:to="'/shop?id='+item.id" -->
        <router-link
          tag="li"
          :to="{path:'/shop',query:{id:item.id}}"
          class="list_li"
          v-for="item in searchShops"
          :key="item.id"
        >
          <section class="item_left">
            <img :src="imgBaseUrl+item.image_path" class="restaurant_img" />
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{item.name}}</span>
              </p>
              <!-- 因为数据存在两种写法,所以下面用 ||或者 -->
              <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
              <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离 {{item.distance}} 公里</p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
    <!-- 无搜索结果(如果上面列表显示,则这里不显示) -->
    <div class="search_none" v-else>很抱歉！无搜索结果</div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import HeaderTop from "../../components/HeaderTop/HeaderTop";

export default {
  data() {
    return {
      keyword: "", // 用户填写的搜索内容
      imgBaseUrl: "http://cangdu.org:8001/img/",
      noSearchShops: false // 是否显示"无搜索结果"
    };
  },
  computed: {
    // 计算:从vuex的state中获取搜索结果数据
    ...mapState(["searchShops"])
  },
  methods: {
    // 方法:搜索
    search() {
      // 1.获取搜索关键字并trim()去空格
      const keyword = this.keyword.trim();
      // 2.根据关键字搜索(如果内容非空)
      if (keyword) {
        // 3.使用vuex的action发送异步请求搜索结果且将数据存入state(传入搜索关键字)
        this.$store.dispatch("getSearchShops", keyword);
        // 4.在用户提交form表单信息时触发(记得要阻止默认表单提交刷新页面的行为)
      }
    }
  },
  watch: {
    // 观察:是否显示"无搜索结果"
    searchShops(value) {
      // 1.没有数据
      if (!value.length) {
        // 2.显示
        this.noSearchShops = true;
        // 3.有数据
      } else {
        // 4.不显示
        this.noSearchShops = false;
      }
      // 5.时刻观察
    }
  },
  components: {
    HeaderTop
  }
};
</script>

<style lang="scss" scoped>
.search {
  // background-color: #fff;
  width: 100%;
  height: 100%;
  overflow: auto;
  .search_form {
    display: flex;
    justify-content: space-between;
    margin-top: 45px;
    background-color: #fff;
    padding: 12px 8px;
    input {
      height: 35px;
      padding: 0 4px;
      border-radius: 2px;
      font-weight: bold;
      outline: none;
      margin: 0;
      &.search_input {
        width: 79%;
        border: 4px solid #f2f2f2;
        font-size: 14px;
        color: #333;
        background-color: #f2f2f2;
        text-align: left;
      }
      &.search_submit {
        width: 18%;
        border: 4px solid #02a774;
        font-size: 16px;
        color: #fff;
        background-color: #02a774;
      }
    }
  }
  .list {
    .list_container {
      background-color: #fff;
      .list_li {
        display: flex;
        justify-content: center;
        padding: 10px;
        border-bottom: 1px solid #e4e4e4;
        .item_left {
          margin-right: 10px;
          .restaurant_img {
            width: 50px;
            height: 50px;
            display: block;
          }
        }
        .item_right {
          font-size: 12px;
          flex: 1;
          .item_right_text {
            p {
              line-height: 12px;
              margin-bottom: 6px;
              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }
  .search_none {
    margin: 0 auto;
    padding: 10px 0;
    color: #333;
    background-color: #fff;
    text-align: center;
    // margin-top: 0.125rem;
  }
}
</style>

