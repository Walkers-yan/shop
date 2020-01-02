<template>
  <div class="container">
    <!-- 轮播图区域 -->
    <div class="banner">
      <van-swipe :autoplay="2000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image.src" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 购买商品区域 -->
    <div class="product_intro">
      <div class="product_intro_interior">
        <div class="product_intro_top">
          <h3 class="fuck">{{ money.title }}</h3>
        </div>
        <div class="product_intro_bottom">
          市场价: <strong>￥{{ money.market_price }}</strong> 销售价
          <font>￥ {{ money.sell_price }}</font>
          <!-- 计数器 -->
          <div class="setpper">
            <span>购买数量</span>
            <van-stepper v-model="count" />
          </div>
          <div class="btn">
            <van-button type="info">立即购买</van-button>
            <van-button type="danger" @click="success">加入购物车</van-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="params">
      <div class="params_intro">
        <div class="params_top">
          <h3>商品参数</h3>
        </div>
        <div class="params_bottom">
          <p>商品货号 : {{ money.goods_no }}</p>
          <p>库存情况 : {{ money.stock_quantity }}件</p>
          <p>上架时间 : {{ money.add_time && money.add_time.split('T')[0] }}</p>
        </div>
      </div>
      <!-- 最下面的两个按钮 -->
      <van-button plain type="info" @click="introduction">图文介绍</van-button>
      <van-button plain type="danger" @click="comment">商品评论</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 定义一个轮播图的数据
      images: [],
      // 商品数量默认数值
      count: 1,
      // 接收价格等
      money: {}
    }
  },
  created() {
    // 发起请求获取轮播图数据
    this.getlunboList()
    // 获取商品价格等
    this.moneyList()
  },
  methods: {
    async getlunboList() {
      const { data: res } = await this.$http.get(
        '/api/getthumimages/' + this.$route.params.id
      )
      console.log(res)
      if (res.status !== 0) {
        this.$notify({ message: '获取数据失败' })
      }
      console.log(res.message)
      this.images = res.message
    },
    // 获取商品价格
    async moneyList() {
      const { data: res } = await this.$http.get(
        '/api/goods/getinfo/' + this.$route.params.id
      )
      console.log()
      if (res.status !== 0) {
        this.$notify({ message: '获取数据失败' })
      }
      this.money = res.message[0]
    },
    // 编程式导航跳转到文章介绍页
    introduction() {
      this.$router.push(`/goodsdesc/${this.$route.params.id}`)
    },
    comment() {
      this.$router.push(`/goodscomments/${this.$route.params.id}`)
    },
    success() {
      this.$store.commit('addToCar', {
        id: this.money.id,
        count: this.count,
        price: this.money.sell_price
      })
      this.$toast.success('已成功加入购物车')
    }
  }
}
</script>
<style lang="less" scoped>
.banner {
  // 为什么调上就不行
  height: 288px;
  width: 94%;
  margin: 0 auto;
  border: 1px solid #cccccc;
  border-radius: 4px;
  margin-bottom: 12px;
  margin-top: 50px;
  padding-top: 10px;
}
.product_intro {
  height: 236px;
  width: 94%;
  margin: 0 auto;
  border: 1px solid #cccccc;
  border-radius: 4px;
  margin-bottom: 12px;
  // padding: 10px;
  .product_intro_interior {
    height: 100%;
    .product_intro_top {
      height: 20%;
      // margin: 8px;
    }
    .fuck {
      border-bottom: 1px solid #cccccc;
      font-weight: 400;
      margin-left: 8px;
      margin-right: 8px;
      color: #000;
      text-align: left;
    }
  }
  .product_intro_bottom {
    color: #8f8f94;
    padding: 16px 28px;
    height: 68%;
    // margin: 12px 8px;
    strong {
      font-weight: 400;
      text-decoration: line-through;
    }
    font {
      color: red;
      font-size: 22px;
    }
    .setpper {
      margin-top: 25px;
      span {
        vertical-align: -6px;
      }
      .van-stepper {
        display: inline-block;
        margin-left: 10px;
      }
    }
    .btn {
      margin-top: 20px;
      .van-button:nth-child(2) {
        margin-left: 10px;
      }
    }
  }
}
.params {
  width: 94%;
  margin: 0 auto;
  border: 1px solid #cccccc;
  border-radius: 4px;
  height: 310px;
  h3 {
    color: #000;
    text-align: left;
    border-bottom: 1px solid #cccccc;
    font-weight: 400;
    margin-left: 8px;
    margin-right: 8px;
    padding-bottom: 5px;
  }
  .params_bottom {
    margin-left: 8px;
    margin-right: 8px;
    padding: 1px 25px;
    color: #8f8f94;
    border-bottom: 1px solid #cccccc;
  }
  .van-button {
    transform: translateX(1%);
    margin-top: 10px;
    width: 98%;
    border-radius: 6px;
  }
}
.van-swipe-item {
  text-align: center;
}
.van-swipe-item img {
  border-radius: 4px;
  width: 288px;
  height: 200px;
  margin-top: 45px;
}
</style>
