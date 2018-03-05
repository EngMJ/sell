<template>
  <!-- todo 10 v-bind命令绑定样式类群时,需使用[]或{},再结合计算属性与props形成动态样式类 -->
  <span class="icon" :class="[classSize,classType]"></span>
</template>

<script type="text/ecmascript-6">
  const classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
  export default{
    props: {
      type: {
        type: Number
      },
      iconSize: {
        type: Number
      }
    },
    computed: {
      classType () {
        console.log(classMap[this.type]);
        return classMap[this.type];
      },
      classSize () {
        console.log('icon' + this.iconSize);
        return 'icon' + this.iconSize;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .icon12
    display: inline-block
    width: 12px
    height: 12px
    background-size: 12px 12px
    background-repeat: no-repeat
    &.decrease
      bg-image('decrease_1')
    &.discount
      bg-image('discount_1')
    &.guarantee
      bg-image('guarantee_1')
    &.invoice
      bg-image('invoice_1')
    &.special
      bg-image('special_1')
  .icon16
    display: inline-block
    width: 16px
    height: 16px
    background-size: 16px 16px
    background-repeat: no-repeat
    &.decrease
      bg-image('decrease_2')
    &.discount
      bg-image('discount_2')
    &.guarantee
      bg-image('guarantee_2')
    &.invoice
      bg-image('invoice_2')
    &.special
      bg-image('special_2')
</style>
