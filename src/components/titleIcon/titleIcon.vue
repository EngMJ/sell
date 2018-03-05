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
        return classMap[this.type];
      },
      classSize () {
        return 'icon' + this.iconSize;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .icon1
    icon(12px,1)
  .icon2
    icon(16px,2)
  .icon3
    icon(12px,3)
</style>
