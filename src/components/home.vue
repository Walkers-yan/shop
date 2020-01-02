<template>
  <div class="container">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image.img" />
      </van-swipe-item>
    </van-swipe>
    <!-- 下面的几个图片 -->
    <van-grid :border="false" :column-num="3">
      <van-grid-item to="/newslist">
        <img src="../assets/img/menu1.png" />
        <p>新闻资讯</p>
      </van-grid-item>
      <van-grid-item to="/photo/list">
        <img src="../assets/img/menu2.png" />
        <p>图片分享</p>
      </van-grid-item>
      <van-grid-item to="/goods/list">
        <img src="../assets/img/menu3.png" />
        <p>商品购买</p>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/img/menu4.png" />
        <p>留言反馈</p>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/img/menu5.png" />
        <p>视频专区</p>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/img/menu6.png" />
        <p>联系我们</p>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
export default {
  data() {
    return {
      images: [],
      active: 0
    }
  },
  created() {
    this.getImageList()
  },
  methods: {
    async getImageList() {
      const { data: res } = await this.$http.get('/api/getlunbo')
      console.log(res)
      this.images = res.message
    }
  }
}
</script>
<style lang="less" scoped>
.van-swipe {
  img {
    width: 100%;
    height: 200px;
  }
}
.van-grid {
  .van-grid-item {
    width: 33.3%;
  }
  img {
    width: 60px;
    height: 60px;
  }
}
</style>
