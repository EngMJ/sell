<template>
    <div class="cartControl">
      <transition name="side">
        <div class="count-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart"></div>
      </transition>
      <div class="count" v-show="food.count>0">{{food.count}}</div>
      <div class="count-add icon-add_circle" @click="addCart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default{
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart () {
        if (!this.food.count) {
          // todo 针对props属性的修改,是不允许的,所以也不会进行监听,需在实例中修改,其实更应推荐使用其他方法
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      decreaseCart () {
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartControl
    font-size: 0
    // todo 18 过渡效果,active是包括整个动画过程,所以添加transition
    // enter表示进入时样式,与原本样式做比较.
    // enter-to样式 ≈ leave样式,代表原本样式
    // leave-to样式代表离开的最终样式,与原本样式做比较
    .side-enter-active,.side-leave-active
      transition: all .5s linear
    .side-enter,.side-leave-to
      opacity: 0
      // todo 19 3d能调用移动端硬件加速,使效果更佳平滑
      transform: translate3D(24px,0,0) rotate(180deg)
    .count-decrease,.count-add
      display: inline-block
      vertical-align: top
      // todo 17 增加按钮padding,增加可选范围,提升用户体验
      padding: 6px
      font-size: 24px
      line-height: 24px
      color: rgb(0,160,220)
    .count
      display: inline-block
      width: 10px
      font-size: 10px
      line-height: 36px
      text-align: center
      color: rgb(147,153,159)
</style>
