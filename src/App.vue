<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">
          商品
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">
          评价
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">
          商家
        </router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header/header.vue';
  export default {
    data () {
      return {
        seller: {}
      };
    },
    components: {
      'v-header': header
    },
    created () {
      // 获取数据
      this.$ajax.get('api/seller').then((res) => {
        if (res.data.errno === 0) {
          this.seller = res.data.data;
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  // 还是需要单独引入styl函数
  @import './common/stylus/mixin.styl'
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7,17,27,0.1)) // rgba 代表有包含透明度的颜色
      .tab-item
        flex: 1
        text-align: center
        // &代表当前类的父类
        &>a // 代替label效果,点击字以外区域有等效果
          display : block
          font-size: 14px
          color: rgb(77,85,93)
          &.active
            color: rgb(210,20,20)
</style>
