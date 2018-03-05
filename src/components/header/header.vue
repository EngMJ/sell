<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="supports">
          <!--通过bind命令来绑定class-->
          <icon :type="seller.supports[0].type" :iconSize="12"></icon>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="supports-count" @click="show">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="show">
        <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="bg-image">
      <img width="100%" height="100%" :src="seller.avatar" alt="">
    </div>
    <!--todo 8 vue的transition元素配合v-show实现淡入淡出效果,实现原理为会为元素添加在不同状态下添加不同class,分别是进入时样式name值-enter,进入过渡样式name值-enter-active,离开时样式name值-leave,离开过渡样式name值-leave-active. 在页面上时transition元素消失,会对v-show/v-if元素添加class -->
    <transition name="fade">
      <div class="detail" v-show="showDetail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li v-for="(item, i) in seller.supports" :key="i" class="supportsItem">
              <icon :type="item.type" :iconSize="16"></icon>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="sellerBulletin">{{seller.bulletin}}</div>
        </div>
      </div>
      <div class="detail-close" @click="close">
        <i class="icon-close"></i>
      </div>
    </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from '@/components/star/star';
  import icon from '@/components/titleIcon/titleIcon';
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        showDetail: false
      };
    },
    created () {
      // todo 3动态显示图标,设置class数组
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    methods: {
      show () {
        this.showDetail = true;
      },
      close () {
        this.showDetail = false;
      }
    },
    components: {
      star,
      icon
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .header
    color: #fff
    background: rgba(7,17,27,0.5)
    position: relative
    // 隐藏溢出阴影
    overflow: hidden
    &.blur
      filter: blur(10px)
    .bg-image
      position: absolute
      z-index: -1
      top: 0px
      left: 0px
      width: 100%
      height: 100%
      // todo 6 css模糊度
      filter: blur(10px)
    .content-wrapper
      position: relative
      padding : 24px 12px 18px 24px
      font-size: 0 // todo 2消除空白字符间距,即头像与字的中间间隔
      .content
        margin-left: 16px
        font-size: 14px
        display: inline-block
        .title
          margin: 2px 0px 8px 0px
          .brand
            vertical-align: top
            display: inline-block
            height: 18px
            width: 30px
            bg-image('./brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            font-width: bold
            line-height: 18px
        .description
          margin-bottom: 10px
          font-size: 10px
          line-height: 12px
        .supports
          .text
            vertical-align: top
            font-size: 10px
            line-height: 12px
      .supports-count
        position: absolute
        right: 12px
        bottom: 18px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background: rgba(0,0,0,0.2)
        .count
          vertical-align: top
          font-size: 10px
          line-height: 24px
        .icon-keyboard_arrow_right
          font-size: 10px
          line-height: 24px
          margin-left: 2px
      .avatar
        display: inline-block
        vertical-align: top
        border-radius: 2px
    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      // todo 5超出部分文字转换为...
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background: rgba(7,17,20,0.2)
      .bulletin-title
        display: inline-block
        height: 12px
        width: 22px
        bg-image('bulletin')
        background-size: 22px 12px
      .bulletin-text
        vertical-align: top
        font-size: 10px
        line-height: 28px
        margin: 0 4px
      .icon-keyboard_arrow_right
        position: absolute
        right: 12px
        top: 8px
        font-size: 10px
    // todo 8 淡入淡出fade渐变效果,样式级别与v-show元素同级
    .fade-enter
      opacity: 0
    .fade-enter-active
      transition: all 2s
    .fade-leave
      opacity: 1
    .fade-leave-active
      transition: all 2s
      opacity: 0
    // todo 7 Css Sticky footers布局
    // 解释: 蒙版层.detail,
    //            内容包装层 .detail-wrapper .clearfix(底部清除浮动,保留高度)
    //                设置包装层最小高度为视口高度,即min-height: 100%,形成内容高度不足视口高度时,可通过自身高度向下挤压底部控件,形成sticky footer
    //                内容层 .detail-main
    //                    设置内容层的下padding为 底部控件高度加底部控件下间距高度,形成即使内容长度超出视口高度,也可使用padding将底部控件向下挤压,形成sticky footer布局
    //            底部控件 .detail-close
    //                清除浮动保留高度
    //                设置宽度
    //                设置负上margin,左右auto margin,形成通过上方容器高度挤压下,依然固定于底部居中效果
    .detail
      position: fixed
      top: 0
      left: 0
      z-index: 100
      width: 100%
      height: 100%
      overflow: auto
      font-size: 0px
      background: rgba(7,17,27,0.8)
      // todo 9 ios背景模糊
      backdrop-filter: blur(10px)
      // todo 8 淡入淡出fade渐变效果,样式级别与v-show元素同级
      &.fade-enter
        opacity: 0
      &.fade-enter-active
        transition: all .5s
      &.fade-leave
        opacity: 1
      &.fade-leave-active
        transition: all .5s
        opacity: 0
      // 分隔注释,以上部分为动画过渡效果
      .detail-wrapper
        min-height:100%
        width: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          font-size: 18px
          .name
            font-size: 16px
            line-height: 16px
            font-weight: 700
            text-align: center
          .star-wrapper
            margin-top: 16px
            padding: 2px 0px
            text-align: center
          .title
            // 使用flex布局,实现等分,即(项目属性flex:1)
            display: flex
            width: 80%
            margin: 28px auto 24px auto
            .line
              display: inline-block
              flex: 1
              position: relative
              top: -6px
              border-bottom: 1px solid rgba(255,255,255,0.2)
            .text
              display: inline-block
              margin: 0 12px
              font-size: 14px
              font-weight: 700
              line-height: 14px
          .supports
            font-size: 0
            width: 80%
            box-sizing: border-box
            margin: 0 auto
            padding: 0 12px
            .supportsItem
              margin-bottom: 12px
              &:last-child
                margin-bottom: 0
              .text
                vertical-align: top
                font-size: 12px
                padding: 1px 0
                line-height: 16px
                margin-left: 6px
          .sellerBulletin
            width: 80%
            padding: 0 12px
            margin: 0 auto
            box-sizing: border-box
            font-size: 12px
            line-height: 24px
      .detail-close
        position: relative
        // 块级元素必须设置宽度后,才能使用margin的auto水平居中
        width: 32px
        height: 32px
        margin:-60px auto 0 auto
        font-size: 32px
        clear: both
</style>
