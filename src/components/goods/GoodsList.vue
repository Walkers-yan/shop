<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="list"
    >
      <van-cell
        v-for="item in goods"
        :key="item.id"
        class="list_cell"
        @click="toShop(item.id)"
      >
        <div class="list_box">
          <div class="list_img">
            <lazy-component>
              <img :src="item.img_url" alt="" :v-lazy="item.img_url" />
            </lazy-component>
          </div>
          <p>{{ item.title }}</p>
          <div class="bottom_box">
            <div class="top">
              <b>￥{{ item.sell_price }}</b>
              <span>￥{{ item.market_price }}</span>
            </div>
            <div class="bottom">
              <div class="bottom_left">热卖中</div>
              <div class="bottom_right">剩{{ item.stock_quantity }}件</div>
            </div>
          </div>
        </div>
      </van-cell>
      <van-overlay :show="show" :custom-style="style" />
    </van-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goods: [],
      loading: false,
      finished: false,
      index: 0,
      show: true,
      style: {
        backgroundColor: '#fff'
      }
    }
  },
  methods: {
    async getGoods() {
      const res = await this.$http.get('api/getgoods?pageindex=' + this.index)
      // this.goods.push(...res.data.message)
      return res.data.message
      // console.log(res)
      // console.log(this.goods)
    },
    toShop(id) {
      this.$router.push('/goods/detail/' + id)
    },
    onLoad() {
      console.log(this.loading)
      console.log(this.finished)
      this.index++
      setTimeout(async () => {
        let goodsList = await this.getGoods()
        this.goods.push(...goodsList)
        console.log(this.goods)
        // 加载状态结束
        this.loading = false
        this.show = false
        // 数据全部加载完成
        if (goodsList.length < 10) {
          this.finished = true
        }
      }, 50)
    }
  }
}
</script>
<style lang="less" scoped>
.list {
  margin: 50px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.list_cell {
  width: 50%;
  margin-bottom: 10px;
  padding: 0 10px;
  box-sizing: border-box;
}
.list_box {
  border: 1px solid #ccc;
}
/deep/ .van-list__finished-text {
  width: 100%;
}
.list_img {
  padding: 10px;
  max-width: 300;
  max-height: 300px;
  min-height: 150px;
  padding: 10px;
  text-align: center;
}
.list_img img {
  width: 100%;
  max-width: 300px;
}
.list p {
  height: 49px;
  font-size: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 4px 10px;
  line-height: 24px;
}
.bottom_box {
  background-color: #eeeeee;
  width: 100%;
  padding: 5px 0;
}
.top {
  height: 25px;
  padding: 0 10px;
}
.bottom {
  height: 24px;
  padding: 0 10px;
  color: #323233;
  font-size: 14px;
}
.top b {
  color: red;
  margin-right: 15px;
  font-weight: normal;
}
.top span {
  text-decoration: line-through;
  color: #323233;
  font-size: 14px;
  padding: 5px 0;
}
.bottom_left {
  float: left;
}
.bottom_right {
  float: right;
}
.van-list__finished-text {
  width: 100%;
}
</style>
