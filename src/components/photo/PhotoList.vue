<template>
  <div class="container">
    <!-- <van-tabs v-model="activeName">
      <van-tab @click="onClick" v-for="item in categoryList" :key="item.id" :title="item.title" name="item.id">
        内容 {{ item.id }}
      </van-tab>
    </van-tabs> -->
    <van-tabs v-model="activeName" @click="changeTab">
      <van-tab
        v-for="index in categoryList.length"
        :key="index"
        :title="categoryList[index - 1].title"
        :name="categoryList[index - 1].id"
      >
        <div slot="default">
          <ul class="img_list">
            <li
              v-for="item in photoList"
              :key="item.id"
              @click="toPhotoInfo(item.id)"
            >
              <div>
                <img v-lazy="item.img_url" alt="" />
              </div>
              <div class="imgInfo">
                <p>{{ item.title }}</p>
                <p>{{ item.zhaiyao }}</p>
              </div>
            </li>
          </ul>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: '0',
      categoryList: [],
      photoList: []
    }
  },
  created() {
    this.getPhotoCategory()
    this.changeTab()
  },
  methods: {
    // 获取图片的分类列表
    async getPhotoCategory() {
      const { data: res } = await this.$http.get('/api/getimgcategory')
      if (res.status !== 0)
        return this.$notify({ type: 'danger', message: '获取图片分类列表失败' })
      // this.$notify({ type: 'success', message: '获取图片分类列表成功' })
      this.categoryList = res.message
      this.categoryList.unshift({ title: '全部', id: 0 })
    },
    // 点击tab栏
    async changeTab() {
      // 获取图片列表
      console.log(this.activeName)
      const { data: res } = await this.$http.get(
        `/api/getimages/${this.activeName}`
      )
      if (res.status !== 0)
        return this.$notify({ type: 'danger', message: '获取图片列表失败' })
      this.photoList = res.message
    },
    // 去往图片详情页
    toPhotoInfo(id) {
      this.$router.push(`/photo/Info/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.img_list {
  padding: 0 10px;
  li {
    position: relative;
    width: 100%;
    height: 300px;
    margin: 10px 0;
    border-radius: 5px;
    overflow: hidden;
    div {
      width: 100%;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .imgInfo {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 75px;
    padding: 0 10px;
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    p {
      font-size: 12px;
      margin: 5px 0;
    }
  }
}
</style>
