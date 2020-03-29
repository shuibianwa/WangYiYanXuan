<template>
  <div>
  <div style="height:50px;"></div>
  <van-tabbar v-model="tabActive">
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="medal-o">专题</van-tabbar-item>
    <van-tabbar-item icon="qr" to="/category">分类</van-tabbar-item>
    <van-tabbar-item to="/buycart" icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      tabActive: 0
    };
  },
  created() {
    switch (this.$route.path) {
      case "/category":
        this.tabActive = 2;
        break;
      case "/home":
        this.tabActive = 0;
        break;
      default:
        this.tabActive = 0;
    }
  },
  methods: {}
};
</script>
<style scoped>
</style>