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
    <div class="content"></div>
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
      if (res.data.erroron === 0) {
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
</style>
