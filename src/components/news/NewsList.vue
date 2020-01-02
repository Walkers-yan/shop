<template>
  <div class="box">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 新闻列表 -->
      <van-card
        class="newslist"
        v-for="item in newslist"
        :key="item.id"
        :title="item.title"
        @click="getNew(item.id)"
      >
        <div slot="thumb">
          <img :src="item.img_url" class="picture" />
        </div>
        <div slot="price">
          <div class="time">发表时间: {{ item.add_time.split('T')[0] }}</div>
        </div>
        <div slot="num">
          <div class="click">点击: {{ item.click }}</div>
        </div>
      </van-card>
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newslist: [],
      // 控制下拉刷新加载
      isLoading: false,
      // 控制在页面往下移动到底部时是否调用接口获取数据
      finished: false
    }
  },
  created() {
    this.getNewsList()
  },
  methods: {
    // 获取新闻列表
    async getNewsList() {
      const { data: res } = await this.$http.get('/api/getnewslist')
      // console.log(res)
      if (res.status !== 0) {
        return this.notify('新闻列表请求失败!')
      }
      this.newslist = res.message
      // console.log(this.newslist)
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.finished = false
        this.isLoading = false
      }, 500)
    },
    // 点击列表跳转详情
    getNew(id) {
      // 路由跳转
      this.$router.push(`/newslist/detail/${id}`)
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  margin-top: 40px;
  margin-bottom: 50px;
  .newslist {
    height: 68px;
    background: #fff;
    margin: 0 10px !important;
    padding: 10px;
    border-bottom: 1px solid #eeeeee;
  }
  .picture {
    width: 42px;
    height: 42px;
  }
  .time {
    color: #1989fa;
    margin-top: 5px;
  }
  .click {
    color: #1989fa;
    margin-top: 5px;
  }
}
.van-card__thumb {
  width: 42px;
  height: 42px;
}
.van-card__title {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
  font-weight: 700;
  color: #000;
}
</style>
