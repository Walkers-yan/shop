<template>
  <div class="container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-swipe-cell v-for="item in shopGoodsList" :key="item.id">
        <template slot="default">
          <van-card
            :num="item.cou"
            :price="item.sell_price"
            :title="item.title"
            :thumb="item.thumb_path"
          >
            <div slot="footer">
              <van-stepper
                @change="onChange(item.id, item.cou, item.sell_price)"
                v-model="item.cou"
                integer
              />
            </div>
          </van-card>
        </template>
        <template slot="right">
          <van-button
            @click="deleteGoods(item.id)"
            square
            type="danger"
            text="删除"
          />
        </template>
      </van-swipe-cell>
      <div :class="['empty', { hide: isEmpty }]">
        购物车空空如也,
        <strong @click="goToGoodsList">去逛逛</strong>
      </div>
    </van-pull-refresh>
    <van-submit-bar :price="$store.state.goodsPrice" button-text="提交订单" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      shopGoodsList: [],
      isEmpty: true
    }
  },
  created() {
    this.$store.commit('getList')
    this.getGoodsList()
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.getGoodsList()
      }, 500)
    },
    // 获取购物车页面数据
    async getGoodsList() {
      const idsList = this.$store.state.total
      // console.log(idsList)
      let ids = []
      let counts = []
      if (!idsList) {
        this.isEmpty = false
        this.shopGoodsList = []
        return
      }
      idsList.forEach(item => {
        ids.push(item.id)
        counts.push(item.count)
      })
      const { data: res } = await this.$http.get(
        '/api/goods/getshopcarlist/' + ids.join(',')
      )
      if (res.status !== 0)
        return this.$notify({
          type: 'danger',
          message: '获取购物车页面数据失败'
        })
      this.shopGoodsList = res.message
      this.shopGoodsList.forEach((item, i) => {
        item.cou = counts[i]
      })
      this.isEmpty = true
    },
    // 商品数量改变
    onChange(id, count, price) {
      this.$store.commit('addToCar', {
        id: id,
        count: count,
        price: price
      })
      this.getGoodsList()
    },
    // 删除商品
    deleteGoods(id) {
      this.$dialog
        .confirm({
          title: '警告',
          message: '是否确认删除该商品'
        })
        .then(async () => {
          this.$store.commit('deleteGoods')
          this.getGoodsList()
        })
        .catch(() => {
          this.$notify({ type: 'danger', message: '取消删除' })
        })
    },
    // 去往商品列表
    goToGoodsList() {
      this.$router.push('/goods/list')
    }
  }
}
</script>

<style lang="less" scoped>
.van-button--danger {
  height: 100%;
}
.empty {
  margin-top: 10px;
  text-align: center;
}
.hide {
  display: none;
}
</style>
