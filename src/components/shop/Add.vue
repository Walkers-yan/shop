<template>
  <div>
    <!-- 搜索头部 -->
    <!-- <van-row type="flex"
             class="header">
      <van-col span="8"
               class="header12"><span class="header1">✈</span>
        <span @click="goBack">返回</span></van-col>
      <van-col span="8"><span>黑马程序员.vant</span></van-col>
    </van-row> -->
    <!-- Input输入框 -->
    <div class="container">
      <van-cell-group>
        <van-field v-model="goodName" placeholder="请输入商品名称" />
      </van-cell-group>
      <van-button @click="addGood" class="addbtn" type="info"
        >添加商品</van-button
      >
    </div>
    <!-- 底部 -->
    <!-- <van-tabbar v-if="$route.path !== '/shopcar'">
      <van-tabbar-item name="home"
                       icon="wap-home-o"
                       replace
                       to="/home">首页</van-tabbar-item>
      <van-tabbar-item name="vip"
                       icon="manager-o"
                       to="/member">会员</van-tabbar-item>
      <van-tabbar-item name="shopcar"
                       icon="cart-o"
                       to="/shopcar"
                       :info="$store.state.count">购物车</van-tabbar-item>
      <van-tabbar-item name="search"
                       icon="search"
                       to="/search">搜索</van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodName: ''
    }
  },
  created() {},
  methods: {
    // 添加商品
    async addGood() {
      if (!this.goodName.trim()) return this.$toast('请输入商品名称')
      console.log(this.goodName.trim())
      const params = new URLSearchParams()
      params.append('name', this.goodName.trim())
      const { data: res } = await this.$http.post('/api/addproduct', params)
      if (res.status !== 0)
        return this.$notify({ type: 'danger', message: res.message })
      this.$notify({ type: 'success', message: '添加商品成功' })
    },
    // 返回
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  height: 40px;
  font: 14px 'Microsoft YaHei';
  background-color: #1989fa;
  color: #fff;
  line-height: 40px;
}
.header1 {
  margin-right: 4px;
}
.header12 {
  margin-left: 10px;
}
.container {
  padding: 0 10px;
}
.van-cell {
  border-bottom: 1px solid #eee;
}
.addbtn {
  margin-top: 40px;
  width: 100%;
}
.van-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
}
</style>
