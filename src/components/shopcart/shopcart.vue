<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highShow':totalCount>0}">
            <span class="icon-shopping_cart"></span>
          </div>
          <div class="num" v-show="totalCount>0">
            {{totalCount}}
          </div>
        </div>
        <div class="price" :class="{'highShow':totalPrice>0}">¥{{totalPrice}}</div>
        <div class="desc">
            另需配送费¥{{deliveryPrice}}元
        </div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payEnd">
          {{payDesc}}
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      // todo 15 vue中props中传入obj,arr(引用类型),default需要是一个函数
      selectFoods: {
        type: Array,
        default () {
          return [
            {
              count: 1,
              price: 20
            }
          ];
        }
      },
      deliveryPrice: {
        type: Number
      },
      minPrice: {
        type: Number
      }
    },
    computed: {
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((val) => {
          total += val.count * val.price;
        });
        return total;
      },
      totalCount () {
        let count = 0;
        this.selectFoods.forEach((val) => {
          count += val.count;
        });
        return count;
      },
      payDesc () {
        if (this.totalPrice === 0) {
            return `¥${this.minPrice}起送`;
        } else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
            return `还差¥${this.minPrice - this.totalPrice}起送`;
        } else if (this.totalPrice >= this.minPrice) {
            return `去结算`;
        }
      },
      payEnd () {
        if (this.totalPrice >= this.minPrice) {
          return 'payEnd';
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    height: 48px
    z-index: 50
    .content
      display: flex
      font-size: 0
      .content-left
        flex: 1
        background: #141d27
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            height: 100%
            width: 100%
            background: #2B343C
            text-align: center
            border-radius: 50%
            &.highShow
              background: rgb(0,160,220)
              .icon-shopping_cart
                color: #fff
            .icon-shopping_cart
              font-size: 24px
              line-height: 44px
              color: rgba(255,255,255,0.4)
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 12px
            font-size: 9px
            font-weight: 700
            color: rgb(255,255,255)
            background: rgb(240,20,20)
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
        .price
          display: inline-block
          vertical-align: top
          margin: 12px 0
          padding-right: 12px
          font-size: 16px
          color: rgba(255,255,255,0.4)
          font-weight: 700
          line-height: 24px
          border-right: 1px solid rgba(255,255,255,0.1)
          &.highShow
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          line-height: 24px
          margin: 12px 0px 0px 12px
          font-size: 10px
          color: rgba(255,255,255,0.4)
      .content-right
        flex: 0 0 105px
        width: 105px
        background: #2B333B
        .pay
          font-size: 12px
          font-weight: 700
          line-height: 48px
          text-align: center
          color: rgba(255,255,255,0.4)
          &.payEnd
            background: #00b43c
            color: #fff
</style>
