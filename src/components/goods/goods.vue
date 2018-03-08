<template>
  <div class="goods">
    <!--12 better-scroll为wrapper元素添加ref,从而获得DOM,同时为容器内第一个子元素添加calss从而进样式更改和滚动逻辑-->
    <div class="left-title" ref="title">
      <ul class="titleContent">
        <!-- todo 13 通过bind命令绑定配合计算属性,进行class更新 -->
        <li class="contentItem" v-for="(item,i) in goods" :key="i" :class="{'current':currentIndex === i}" @click="selectMenu(i,$event)">
          <span class="text border-1px">
            <icon v-if="item.type>=0" :type="item.type" :iconSize="3"></icon>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div ref="content" class="content-wrapper">
      <div class="content">
      <div class="foods-list item-hook" v-for="(item,i) in goods" :key="i">
        <h1 class="title">{{item.name}}</h1>
        <ul class="foods-item border-1px" v-for="(foods,p) in item.foods" :key="p">
          <li class="item">
            <div class="icon">
              <img width="58" height="58" :src="foods.image" alt="">
            </div>
            <div class="foods-content">
              <h2 class="name">{{foods.name}}</h2>
              <div class="description" v-show="foods.description">{{foods.description}}</div>
              <div class="sell">
                <span class="sell-count">月售{{foods.sellCount}}份</span>
                <span class="sell-ratings">好评率{{foods.rating}}%</span>
              </div>
              <div class="price">
                <span class="on-price">{{foods.price}}</span>
                <span v-show="foods.oldPrice" class="old-price">{{foods.oldPrice}}</span>
              </div>
            </div>
            <div class="cartControl-wrapper">
              <cartControl :food="foods"></cartControl>
            </div>
          </li>
        </ul>
      </div>
      </div>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
  import icon from '@/components/titleIcon/titleIcon';
  import shopcart from '@/components/shopcart/shopcart';
  import cartControl from '@/components/cartControl/cartControl';
  import BScroll from 'better-scroll';
export default{
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: {},
      listHeight: [],
      scrollY: 0
    };
  },
  computed: {
    // todo 13 更新对应i值
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        // 当height2为undefined时,则直接返回末位置
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    }
  },
  created () {
    this.$ajax.get('api/goods').then((res) => {
      if (res.data.errno === 0) {
        this.goods = res.data.data;
        // todo 12 better-scroll模块运用,需在DOM渲染完后
        this.$nextTick(() => {
          this._initBScroll();
          this._calculateHeight();
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  },
  components: {
    icon,
    shopcart,
    cartControl
  },
  methods: {
    _initBScroll () { // todo 12 better-scroll模块运用
      // options中传入click属性,可解开click禁用
      this.leftScroll = new BScroll(this.$refs.title, {
        click: true
      });
        // options中传入probeType可返回(暴露)参数
      this.contentScroll = new BScroll(this.$refs.content, {
        probeType: 3,
        click: true
      });
        // todo 13 将暴露的对象,绑定滚动事件,更新vue的data属性,配合计算属性更新
      this.contentScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    // todo 13 better-scroll的滚动联动
    _calculateHeight () {
      // 获取DOM,获得每个区间高度
      let foodList = this.$refs.content.getElementsByClassName('item-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    // 滚动联动
    selectMenu (i) {
      this.scrollY = this.listHeight[i];
      this.contentScroll.scrollTo(0, -this.scrollY, 300);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  // todo 9 无滚动条,常用absolut布局,即视口设计,一般都需要溢出隐藏
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .left-title
      // 弹性布局中,固定宽度方法,同时需写出width以兼容安卓端
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      font-size: 0
      .titleContent
        .contentItem
          // todo 11 通过display的显示类型为table,实现垂直居中效果
          display: table
          height: 54px
          padding: 0 12px
          font-size: 0
          &.current
            position: relative
            z-index: 10
            margin-top: -1px
            background: #fff
            &>.text
              font-weight: 700
            &>.text:after
              border: none
          .text
            display: table-cell
            width: 56px
            font-size: 12px
            vertical-align: middle
            border-1px(rgba(7,17,27,0.1))
    .content-wrapper
      flex: 1
      .content
        .foods-list
          font-size: 0
          width: 100%
          .title
            height: 26px
            padding-left: 12px
            color: rgb(147,153,159)
            font-size: 12px
            line-height: 26px
            border-left: 2px solid #d9dde1
            background: #f3f5f7
          .foods-item
            padding: 18px 0px
            margin: 0 18px
            border-1px(rgba(7,17,27,0.1))
            &>.item
              display: flex
            &:last-child
              border-none()
            .icon
              flex: 0 0 58px
            .foods-content
              flex: 1
              margin-left: 10px
              font-size: 10px
              .name
                margin: 2px 0 8px 0
                height: 14px
                font-size: 14px
                color: rgb(7,17,27)
                line-height: 14px
              .description
                padding-bottom: 8px
                font-size: 10px
                color: rgb(147,153,159)
                line-height: 10px
              .sell
                font-size: 10px
                color: rgb(143,153,159)
                line-height: 10px
                .sell-count
                  margin-right: 12px
              .price
                .on-price
                  color: #F01414
                  font-size: 14px
                  font-weight: 700
                  line-height: 24px
                  &:before
                    display: inline-block
                    content: '¥'
                    font-size: 10px
                    font-weight: normal
                .old-price
                  margin-left: 8px
                  color: rgb(147,153,159)
                  font-size: 10px
                  font-weight: 700
                  line-height: 24px
                  text-decoration: line-through
                  &:before
                    display: inline-block
                    content: '¥'
                    font-weight: normal
            .cartControl-wrapper
              position: absolute
              right: 0px
              bottom: 18px
</style>
