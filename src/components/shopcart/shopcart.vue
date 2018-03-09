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
    <!--todo 22 transition-group和多个小球元素,设置抛物线效果,需在内层设置横向偏移,外层设置纵向偏移,再结合贝塞尔曲线,形成抛物线效果-->
    <transition-group name="drop" @beforeEnter="beforeEnter" @enter="enter" @afterEnter="afterEnter">
        <div class="balls" v-for="(ball,i) in balls" :key="i" v-show="ball.show">
          <div class="inner"></div>
        </div>
    </transition-group>
  </div>
</template>

<script type="text/ecmascript-6">
  import eBus from '../../common/js/eventBus';
  export default{
    props: {
      // todo 15 vue中props中传入obj,arr(引用类型),default需要是一个函数
      selectFoods: {
        type: Array,
        default () {
          return [];
        }
      },
      deliveryPrice: {
        type: Number
      },
      minPrice: {
        type: Number
      }
    },
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
          ],
        ballShow: [],
        el: ''
      };
    },
    mounted () {
      eBus.$on('addShow', (el) => {
          // 获取+按钮el,修改balls数组,修改ballShow数组
          this.el = el;
          let balls = this.balls;
          let ballShow = this.ballShow;
          let count = balls.length;
          // todo 21 多个小球,需多个元素通过v-for并以v-show进行联合使用,可产生多个元素同时过渡效果
          // todo 21 此处令balls数组内show属性改变,从而令多个小球可同时出现
          for (let i = 0; i < count; i++) {
            if (!balls[i].show) {
              balls[i].show = true;
              // todo 20 通过js的引用类型关系,将选项push进ballShow数组,省去记录下标i值操作
              // 届时在afterEnter方法中,按点击产生的程序执行次序,将ballShow数组内shift出来,并根据引用类型关系,更改它的值为false,以达到对应下标的对应值重置效果,能达到多个小球同时过渡的效果
              ballShow.push(this.balls[i]);
              return;
            }
          };
      });
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
    },
    methods: {
      beforeEnter (el) {
        let rect = this.el.getBoundingClientRect();
        let x = rect.left - 32;
        let y = -(window.innerHeight - rect.top - 22);
        el.style.display = '';
        // todo 22 内外层不同偏移方向,配合贝塞尔曲线,获得抛物线效果
        el.style.webkitTransform = `translate3d(0,${y}px,0)`;
        el.style.transform = `translate3d(0,${y}px,0)`;
        let inner = el.getElementsByClassName('inner')[0];
        inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
        inner.style.transform = `translate3d(${x}px,0,0)`;
      },
      enter (el) {
        // eslint跳过对声明未使用的变量的检测
        /* eslint-disable no-unused-vars */
        let rl = el.offsetHeight; // todo 19 激活页面重绘,可显示动效
        // todo 22 内外层不同偏移方向,配合贝塞尔曲线,获得抛物线效果
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
      },
      afterEnter (el) {
        // todo 20 对应值重置
        let ball = this.ballShow.shift();
        ball.show = false;
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
    .balls  // todo 22 贝塞尔曲线,内外层
      position: fixed
      left: 32px
      bottom: 22px
      z-index: 200
      &.drop-enter-active
        // todo 贝塞尔曲线大致理解,内层横向移动,外层纵向移动,则贝塞尔绘图取其镜像(根据贝塞尔绘图网站取值http://cubic-bezier.com)
        transition: all .4s cubic-bezier(.49,-0.29,0.75,0.41)
        .inner
          width 16px
          height: 16px
          border-radius: 50%
          background: rgb(0,160,220)
          transition: all .4s linear
</style>
