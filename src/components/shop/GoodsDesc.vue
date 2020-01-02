<template>
  <!-- 商品标题 -->
  <div class="goodsDesc-content container">
    <h4>{{ info.title }}</h4>
    <hr />
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 商品描述信息
      info: {},
      id: this.$route.params.id
    }
  },
  created() {
    this.getDesc()
  },
  methods: {
    async getDesc() {
      console.log(1)
      const { data } = await this.$http.get('/api/goods/getdesc/' + this.id)
      console.log(data.message)
      if (data.status === 0) {
        this.info = data.message[0]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.goodsDesc-content {
  .content {
    padding: 0 5px;
    font-size: 16px;
  }
}
h4 {
  text-align: center;
  font-size: 16px;
  color: #226aff;
  padding-top: 15px;
}
</style>
