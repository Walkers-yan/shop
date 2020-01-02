<template>
  <div style="padding: 0px 5px; margin-top: 40px">
    <h4>发表评论</h4>
    <hr />
    <!-- 输入框 -->
    <van-cell-group>
      <van-field
        autosize
        :disabled="disable"
        placeholder="请输入用户名"
        rows="2"
        maxlength="200"
        type="textarea"
        v-model="msg"
      />
    </van-cell-group>
    <van-button type="info" size="large" @click="postComment"
      >发表评论</van-button
    >
    <!-- 评论列表 -->
    <div class="com-list">
      <div class="com-item" v-for="(item, i) in list" :key="i">
        <div class="com-item-title">
          第{{ i + 1 }}楼&nbsp; 用户：{{ item.user_name }}&nbsp; 发表时间：{{
            item.add_time | dateFormat
          }}
        </div>
        <div class="com-item-body">{{ item.content }}</div>
      </div>
    </div>
    <van-button plain hairline color="red" type="primary" @click="loadMore"
      >加载更多</van-button
    >
  </div>
</template>

<script>
import { Dialog } from 'vant'
import _ from 'lodash'
export default {
  data() {
    return {
      // 默认第一页评论
      page: 1,
      // 评论的数组
      list: [],
      msg: '',
      id: this.$route.params.id,
      disable: false
    }
  },
  created() {
    this.getCommentPage()
  },
  methods: {
    // 根据id获取评论
    async getCommentPage() {
      const { data } = await this.$http.get(
        '/api/getcomments/' + this.id + '?pageindex=' + this.page
      )
      if (data.status === 0) {
        return (this.list = data.message)
      }
    },
    // 点击按钮加载更多
    async loadMore() {
      this.page++
      const { data } = await this.$http.get(
        '/api/getcomments/' + this.id + '?pageindex=' + this.page
      )
      let arr = data.message
      this.list = [...this.list, ...arr]
    },
    // 发表评论
    postComment: _.throttle(function() {
      if (this.msg.trim().length <= 0) return Dialog({ message: '请填写评论' })
      var params = new URLSearchParams()
      params.append('content', this.msg.trim())
      this.$http.post('/api/postcomment/' + this.id, params).then(result => {
        console.log(result.data.status)
        if (result.data.status !== 0)
          return this.$notify({ type: 'danger', message: '评论发表失败' })
        this.list.unshift({
          user_name: '匿名用户',
          add_time: new Date(),
          content: this.msg.trim()
        })
        this.msg = ''
        this.$notify({
          type: 'success',
          message: ' 评论成功!!!请于10秒后再评论'
        })
        this.disable = true
      })
      // 控制评论框的禁用状态
      setTimeout(
        function() {
          this.disable = false
        }.bind(this),
        10000
      )
    }, 10000)
  }
}
</script>

<style lang="less" scoped>
.van-field {
  height: 100px;
  border: 1px solid #ccc;
}
.van-button {
  width: 100%;
  margin: 5px 0;
}
.com-list {
  margin-top: 4px;
  .com-item {
    line-height: 30px;
    .com-item-title {
      font-size: 14px;
      background-color: #ddd;
    }
    .com-item-body {
      font-size: 13px;
      text-indent: 2em;
    }
  }
}
</style>
