<template>
  <div>
    <div class="container">
      <h3>{{ imgInfo.title }}</h3>
      <p class="one">发表时间:{{ imgInfo.add_time | dateFormat }}</p>
      <p class="two">点击:{{ imgInfo.click }}</p>
    </div>
    <hr />
    <!-- 图片显示区域 -->
    <div class="fatherBox">
      <van-image
        width="33%"
        v-for="(el, index) in images"
        :key="el.src"
        :src="el.src"
        @click="preview(index)"
      />
    </div>
    <!-- 图文内容区 -->
    <div class="content" v-html="imgInfo.content"></div>
    <!-- 发布评论区 -->
    <my-comment></my-comment>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
export default {
  data() {
    return {
      id: this.$route.params.id,
      show: true,
      // 图片预览路径数组
      images: [],
      imagesList: [],
      // 图文详情
      imgInfo: {}
    }
  },
  created() {
    // 获取图片分类数据
    this.getImg()
    // 获取图片详情
    this.getDetails()
  },
  methods: {
    async getImg() {
      const { data: res } = await this.$http.get(`api/getthumimages/${this.id}`)
      console.log(res)
      if (res.status !== 0)
        return this.$notify({ type: 'danger', message: '获取图片分类列表失败' })
      this.images = res.message
    },
    async getDetails() {
      const { data: res } = await this.$http.get(`api/getimageInfo/${this.id}`)
      if (res.status !== 0)
        return this.$notify({ type: 'danger', message: '获取图片分类列表失败' })
      // 请求成功
      this.imgInfo = res.message[0]
      // console.log(res.message[0])
    },
    preview(index) {
      // console.log(index)
      this.images.forEach(el => {
        this.imagesList.push(el.src)
      })
      // console.log(this.imagesList)
      ImagePreview({
        images: this.imagesList,
        startPosition: index,
        closeOnPopstate: true
      })
    }
  }
}
</script>

<style lang="less" scope>
.one {
  margin-left: 5px;
  color: #9a9a9a;
  float: left;
}
.two {
  margin-right: 10px;
  color: #9a9a9a;
  float: right;
}
.container {
  font-size: 14px;
  margin-bottom: 70px;
  h3 {
    color: #1989fa;
    text-align: center;
  }
}
::placeholder {
  font-size: 14px;
  color: #969799;
}
.review {
  padding: 0 10px;
  margin-bottom: 50px;
  textarea {
    width: 100%;
    height: 100px;
    resize: none;
  }
}
.review .van-button {
  width: 100%;
}
.van-image {
  box-sizing: border-box;
  padding: 10px;
}
.fatherBox {
  margin-left: 25px;
}
.van-image-preview__image /deep/ .van-image__img {
  height: 100%;
}
.more {
  margin-top: 10px !important;
}
</style>
