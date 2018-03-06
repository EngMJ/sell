<template>
  <div class="goods">
    <div class="left-title">
      <ul class="titleContent">
        <li class="contentItem" v-for="(item,i) in goods" :key="i">
          <span class="text border-1px">
            <icon v-if="item.type>=0" :type="item.type" :iconSize="3"></icon>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="foods-list" v-for="(item,i) in goods" :key="i">
        <h1 class="title">{{item.name}}</h1>
        <ul class="foods-item border-1px" v-for="(foods,p) in item.foods" :key="p">
          <li>
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
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import icon from '@/components/titleIcon/titleIcon';
export default{
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: {}
    };
  },
  created () {
    this.$ajax.get('api/goods').then((res) => {
      if (res.data.errno === 0) {
        this.goods = res.data.data;
      }
    }).catch((err) => {
      console.log(err);
    });
  },
  components: {
    icon
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
          margin: 0 auto
          font-size: 0
          .text
            display: table-cell
            width: 56px
            font-size: 12px
            vertical-align: middle
            border-1px(rgba(7,17,27,0.1))
    .content
      flex: 1
      .foods-list
        font-size: 0
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
          &:last-child
            border-none()
          .icon
            display: inline-block
            vertical-align: top
          .foods-content
            display: inline-block
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
</style>
