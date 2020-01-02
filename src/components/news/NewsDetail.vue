<template>
  <div class="container">
    <div class="news_box">
      <h3 class="news_title">{{ newsDetail.title }}</h3>
      <div class="news_info">
        <span
          >发表时间 :
          {{ newsDetail.add_time && newsDetail.add_time.split('T')[0] }}</span
        >
        <span>点击次数 : {{ newsDetail.click }}</span>
      </div>
      <div class="news_content" v-html="newsDetail.content"></div>
    </div>
    <!-- 发表评论 -->
    <my-comment></my-comment>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsDetail: {}
    }
  },
  created() {
    this.getNewsDetail()
  },
  methods: {
    // 获取资讯详情
    async getNewsDetail() {
      const { data: res } = await this.$http.get(
        '/api/getnew/' + this.$route.params.id
      )
      if (res.status !== 0)
        return this.$notify({ type: 'danger', message: '获取图片分类列表失败' })
      this.newsDetail = res.message[0]
    }
  }
}
</script>

<style lang="less" scoped>
.news_box {
  padding: 0 10px;
  color: #1989fa;
}
.news_title {
  margin: 0;
  padding: 10px 0;
  font-size: 14px;
  text-align: center;
}
.news_info {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 13px;
  border-bottom: 1px solid #ccc;
}
.news_content {
  color: #555;
}
</style>
