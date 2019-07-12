<template>
  <div class="shop-container">
    <ul>
      <li class="shop-li">
        <a href="#" class="shop-a">
          <div class="shop-left">
            <img src="./images/shop/1.jpg" alt />
          </div>
          <div class="shop-right">
            <section class="shop-1">
              <span>品牌</span>
              <div class="shop-title">
                <h3>谁知盘中餐,粒粒皆幸苦</h3>
                <ul>
                  <li>保</li>
                  <li>准</li>
                  <li>票</li>
                </ul>
              </div>
            </section>
            <section class="shop-2">
              <div class="shop-2-left">
                <div class="star star-24">
                  <span class="star-item star-item-on"></span>
                  <span class="star-item star-item-on"></span>
                  <span class="star-item star-item-on"></span>
                  <span class="star-item star-item-half"></span>
                  <span class="star-item star-item-off"></span>
                </div>
                <span class="shop-mark">3.6</span>
                <span>月售108单</span>
              </div>
              <div class="shop-2-right">硅谷专送</div>
            </section>
            <section class="shop-3">
              <p>
                <span>￥20起送</span>
                <span>/</span>
                <span>配送费约￥5</span>
              </p>
            </section>
          </div>
        </a>
      </li>
      <li class="shop-li">
        <a href="#" class="shop-a">
          <div class="shop-left">
            <img src="./images/shop/1.jpg" alt />
          </div>
          <div class="shop-right">
            <section class="shop-1">
              <span>品牌</span>
              <div class="shop-title">
                <h3>谁知盘中餐,粒粒皆幸苦</h3>
                <ul>
                  <li>保</li>
                  <li>准</li>
                  <li>票</li>
                </ul>
              </div>
            </section>
            <section class="shop-2">
              <div class="shop-2-left">
                <div class="star star-24">
                  <span class="star-item star-item-on"></span>
                  <span class="star-item star-item-on"></span>
                  <span class="star-item star-item-on"></span>
                  <span class="star-item star-item-half"></span>
                  <span class="star-item star-item-off"></span>
                </div>
                <span class="shop-mark">3.6</span>
                <span>月售108单</span>
              </div>
              <div class="shop-2-right">硅谷专送</div>
            </section>
            <section class="shop-3">
              <p>
                <span>￥20起送</span>
                <span>/</span>
                <span>配送费约￥5</span>
              </p>
            </section>
          </div>
        </a>
      </li>
      <li class="shop-li">
        <a href="#" class="shop-a">
          <div class="shop-left">
            <img src="./images/shop/1.jpg" alt />
          </div>
          <div class="shop-right">
            <section class="shop-1">
              <span>品牌</span>
              <div class="shop-title">
                <h3>谁知盘中餐,粒粒皆幸苦</h3>
                <ul>
                  <li>保</li>
                  <li>准</li>
                  <li>票</li>
                </ul>
              </div>
            </section>
            <section class="shop-2">
              <div class="shop-2-left">
                <div class="star star-24">
                  <span class="star-item star-item-on"></span>
                  <span class="star-item star-item-on"></span>
                  <span class="star-item star-item-on"></span>
                  <span class="star-item star-item-half"></span>
                  <span class="star-item star-item-off"></span>
                </div>
                <span class="shop-mark">3.6</span>
                <span>月售108单</span>
              </div>
              <div class="shop-2-right">硅谷专送</div>
            </section>
            <section class="shop-3">
              <p>
                <span>￥20起送</span>
                <span>/</span>
                <span>配送费约￥5</span>
              </p>
            </section>
          </div>
        </a>
      </li>
      <li class="shop-li">
        <a href="#" class="shop-a">
          <div class="shop-left">
            <img src="./images/shop/1.jpg" alt />
          </div>
          <div class="shop-right">
            <section class="shop-1">
              <span>品牌</span>
              <div class="shop-title">
                <h3>谁知盘中餐,粒粒皆幸苦</h3>
                <ul>
                  <li>保</li>
                  <li>准</li>
                  <li>票</li>
                </ul>
              </div>
            </section>
            <section class="shop-2">
              <div class="shop-2-left">
                <div class="star star-24">
                  <span class="star-item star-item-on"></span>
                  <span class="star-item star-item-on"></span>
                  <span class="star-item star-item-on"></span>
                  <span class="star-item star-item-half"></span>
                  <span class="star-item star-item-off"></span>
                </div>
                <span class="shop-mark">3.6</span>
                <span>月售108单</span>
              </div>
              <div class="shop-2-right">硅谷专送</div>
            </section>
            <section class="shop-3">
              <p>
                <span>￥20起送</span>
                <span>/</span>
                <span>配送费约￥5</span>
              </p>
            </section>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script></script>

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
    z-index: 99;
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
          .star {
            .star-item {
              width: 10px;
              height: 10px;
              display: inline-block;
              margin-right: 3px;
              background: no-repeat;
              background-size: 10px 10px !important;
            }
            .star-item-on {
              display: flex;
              background: url("./images/stars/star24_on@2x.png"); //全星
            }
            .star-item-half {
              display: flex;
              background: url("./images/stars/star24_half@2x.png"); //半星
            }
            display: flex;
            .star-item-off {
              background: url("./images/stars/star24_off@2x.png"); //空星星
            }
          }
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
