<template>
  <div>
    <!-- 头部 -->
    <div class="header-box">
      <span class="goback" @click="goBack" v-if="$route.path !== '/home'">
        <van-icon name="arrow-left" color="#fff" />
        返回
      </span>
      黑马程序员.vant
      <span v-if="$route.path === '/search'" @click="goAddGood" class="add"
        >添加</span
      >
    </div>
    <router-view></router-view>
    <!-- 底部 -->
    <van-tabbar v-if="$route.path !== '/shopcar'" v-model="activePath">
      <van-tabbar-item name="home" to="/home">
        <span>首页</span>
        <i slot="icon" class="iconfont icon-index-fill"></i>
      </van-tabbar-item>
      <van-tabbar-item name="vip" to="/member">
        <span>会员</span>
        <i slot="icon" class="iconfont icon-icon_zhanghao"></i>
      </van-tabbar-item>
      <van-tabbar-item
        name="shopcar"
        icon="cart-o"
        to="/shopcar"
        :info="$store.state.goodsCount || null"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item name="search" icon="search" to="/search"
        >搜索</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activePath: 'home'
    }
  },
  created() {
    this.$store.commit('getList')
  },
  methods: {
    // 返回
    goBack() {
      this.$router.go(-1)
    },
    // 去往添加商品
    goAddGood() {
      this.$router.push('/addgoods')
    }
  }
}
</script>

<style lang="less" scoped>
.header-box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 40px;
  background-color: #1989fa;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 14px;
}
.goback {
  display: flex;
  position: fixed;
  top: 0;
  left: 15px;
  align-items: center;
  i {
    margin-right: 3px;
  }
}
.add {
  font-size: 13px;
  position: fixed;
  right: 10px;
}
.van-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
}
</style>
