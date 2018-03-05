<template>
  <div class="goods">
    <div class="left-title">
    </div>
    <div class="content"></div>
  </div>
</template>

<script type="text/ecmascript-6">
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
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
    .content
      flex: 1
</style>
