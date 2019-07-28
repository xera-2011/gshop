<template>
  <section class="star">
    <div :class="'star-'+size">
      <span class="star-item" v-for="(item,i) in starClasses" :class="item" :key="i"></span>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    score: Number, // 父组件获取到评分数据后,传过来的值
    size: Number // 有24 36 48 三种size,父组件传哪个,就绑定哪个样式
  },
  computed: {
    // 方法一
    starClasses() {
      let starArr = []; //定义一个空数组来存储类名
      let scoreInteger = Math.floor(this.score * 2) / 2; //把评分转成整数或整数+0.5（如：4.7转成4.5，4.2转成4.0）
      let decimalScore = scoreInteger % 1 !== 0; //取1的余数不等于0，说明有小数（显示半星）
      let integerScore = Math.floor(scoreInteger); //取整数分数（显示全星）
      for (let i = 0; i < integerScore; i++) {
        starArr.push("on"); //整数分数为多少，就添加多少个全星
      }
      if (decimalScore) {
        starArr.push("half"); //存在小数分数，添加一个半星
      }
      while (starArr.length < 5) {
        starArr.push("off"); //如果星星数不满5颗，空星星填充
      }
      return starArr;
    }

    //方法二
    // starClasses () {
    //   // 这个this指向当前props里面的值
    //   const {score} = this//对象解构,这是ES6的写法,就是this.scroe里的Number,这样做了之后使用,就不用this.score了,直接写score
    //   const starArr = []
    //   // 向starArr中添加n个CLASS_ON
    //   const scoreInteger = Math.floor(score)
    //   for (let i = 0; i < scoreInteger; i++) {
    //     starArr.push("on")
    //   }
    //   // 向starArr中添加0/1个CLASS_HALF
    //   if (score * 10 - scoreInteger * 10 >= 5) {
    //     starArr.push("half")
    //   }
    //   // 向starArr中添加n个CLASS_OFF
    //   while (starArr.length < 5) {
    //     starArr.push("off")
    //   }
    //   return starArr
    // }
  }
};
</script>

<style lang="scss" scoped>
.star {
  //2x图 3x图
  background: no-repeat;
  .star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      display: inline-block;
      margin-right: 3px;
      background-size: 10px 10px !important;
    }
    .star-item.on {
      display: flex;
      background: url("./images/star24_on@2x.png"); //全星
    }
    .star-item.half {
      display: flex;
      background: url("./images/star24_half@2x.png"); //半星
    }
    display: flex;
    .star-item.off {
      background: url("./images/star24_off@2x.png"); //空星星
    }
  }
  .star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      display: inline-block;
      margin-right: 6px;
      background-size: 15px 15px !important;
    }
    .star-item.on {
      display: flex;
      background: url("./images/star36_on@2x.png"); //全星
    }
    .star-item.half {
      display: flex;
      background: url("./images/star36_half@2x.png"); //半星
    }
    display: flex;
    .star-item.off {
      background: url("./images/star36_off@2x.png"); //空星星
    }
  }
  .star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      display: inline-block;
      margin-right: 22px;
      background-size: 20px 20px !important;
    }
    .star-item.on {
      display: flex;
      background: url("./images/star48_on@2x.png"); //全星
    }
    .star-item.half {
      display: flex;
      background: url("./images/star48_half@2x.png"); //半星
    }
    display: flex;
    .star-item.off {
      background: url("./images/star48_off@2x.png"); //空星星
    }
  }
}
</style>
