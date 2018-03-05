<template>
  <div class="star" :class="starType">
    <span :key="i" v-for="(classItemType,i) in classer" class="starItem" :class="classItemType"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
export default{
  props: {
    size: {
      type: Number,
      required: true
    },
    score: {
      type: Number
    }
  },
  computed: {
    classer () {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let Int = score > LENGTH ? LENGTH : (score | 0);
      let stateDecimal = score % 1 !== 0;
      for (let i = 0; i < Int; i++) {
        result.push(CLS_ON);
      }
      if (score >= 0 && stateDecimal && Int < LENGTH) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    },
    starType () {
      return 'star' + this.size;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .star
    // 消除空白字符间距
    font-size: 0
    .starItem // 将span公共样式抽象
      display: inline-block
      background-repeat: no-repeat
    &.star48
      .starItem
        width: 20px
        height: 20px
        margin-left: 22px
        background-size: 20px 20px
        &:first-child
          margin-left: 0
      .on
        bg-image('star48_on')
      .off
        bg-image('star48_off')
      .half
        bg-image('star48_half')
    &.star36
      .starItem
        width: 15px
        height: 15px
        margin-left: 6px
        background-size: 15px 15px
        &:first-child
          margin-left: 0
      .on
        bg-image('star36_on')
      .off
        bg-image('star36_off')
      .half
        bg-image('star36_half')
    &.star24
      .starItem
        width: 10px
        height: 10px
        margin-left: 3px
        background-size: 10px 10px
        &:first-child
          margin-left: 0
      .on
        bg-image('star24_on')
      .off
        bg-image('star24_off')
      .half
        bg-image('star24_half')
</style>
