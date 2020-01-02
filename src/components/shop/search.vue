<template>
  <div class="container">
    <!-- 搜索 -->
    <div>
      <form action="/1">
        <van-search
          v-model="searchVal"
          placeholder="请输入搜索关键词"
          show-action
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
      <!-- 搜索历史 -->
      <div :class="[{ hide: isSearching }]">
        <div class="content">
          <span>搜索历史</span>
          <van-icon name="delete" class="delete" @click="deleteBtn" />
        </div>
        <div class="taglist">
          <van-divider
            v-if="tagsList.length === 0"
            :style="{ color: 'black', borderColor: '#ccc', padding: '0 16px' }"
          >
            暂无搜索结果
          </van-divider>
          <div v-else>
            <van-tag
              v-for="(item, i) in tagsList"
              :key="i"
              size="medium"
              @click="hitsList"
              >{{ item }}</van-tag
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 搜索结果 -->
    <div :class="{ hide: !isSearching }">
      <van-swipe-cell v-for="item in searchList" :key="item.id">
        <van-cell
          :border="false"
          :title="item.name"
          :value="'商品上架时间: ' + item.ctime.split('T')[0]"
        />
        <template slot="right">
          <van-button
            square
            type="danger"
            text="删除"
            @click="deleteSearchList(item.id)"
          />
        </template>
      </van-swipe-cell>
    </div>
    <!-- 底部 -->
    <van-tabbar v-if="$route.path !== '/shopcar'">
      <van-tabbar-item name="home" icon="wap-home-o" replace to="/home"
        >首页</van-tabbar-item
      >
      <van-tabbar-item name="vip" icon="manager-o" to="/member"
        >会员</van-tabbar-item
      >
      <van-tabbar-item
        name="shopcar"
        icon="cart-o"
        to="/shopcar"
        :info="$store.state.count"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item name="search" icon="search" to="/search"
        >搜索</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 搜索框输入
      searchVal: '',
      // 搜索框输入和隐藏
      isSearching: false,
      // 搜索历史
      tagsList: [],
      // 搜索结果
      searchList: []
    }
  },
  created() {
    this.getSearchHistory()
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    // 添加按钮
    goAddGood() {
      this.$router.push('/add')
    },
    // 删除输入框文字
    onCancel() {
      this.isSearching = false
    },
    // 搜索结果
    async onSearch() {
      if (this.searchVal.trim().length === 0)
        return this.$toast.fail('请输入数据')
      this.isSearching = true
      // 向数组中添加历史数据
      if (!this.tagsList.includes(this.searchVal.trim())) {
        this.tagsList.unshift(this.searchVal.trim())
        const getHistory = this.tagsList
        window.localStorage.setItem('history', getHistory.join('&'))
      }
      const { data: res } = await this.$http.get('/api/getprodlist')
      if (res.status !== 0)
        return this.$notify({ type: 'success', message: '获取数据列表失败' })
      this.searchList = res.message
    },
    // 点击历史数据导入输入框
    hitsList() {
      this.searchVal = this.tagsList.join()
    },
    // 清除历史栏中数据
    deleteBtn() {
      window.localStorage.removeItem('history')
      this.tagsList = []
    },
    // 获取搜索结果数据
    getSearchHistory() {
      if (window.localStorage.getItem('history')) {
        this.tagsList = window.localStorage.getItem('history').split('&')
      }
    },
    // 清除搜索结果数据
    deleteSearchList(id) {
      this.$dialog
        .confirm({
          title: '标题',
          message: '弹窗内容'
        })
        .then(async () => {
          const { data: res } = await this.$http.get('/api/delproduct/' + id)
          if (res.status !== 0)
            return this.$notify({ type: 'danger', message: '删除失败' })
          const i = this.searchList.findIndex(item => item.id === id)
          this.searchList.splice(i, 1)
          this.$notify({ type: 'success', message: '删除成功' })
        })
        .catch(() => {
          this.$notify({ type: 'danger', message: '取消删除' })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 40px;
  font: 14px 'Microsoft YaHei';
  background-color: #1989fa;
  color: #fff;
  line-height: 40px;
}
.header1 {
  margin-right: 4px;
}
.ser_history {
  padding: 15px 10px;
}
.content {
  margin-top: 10px;
  margin-left: 10px;
  position: relative;
  .delete {
    position: absolute;
    right: 5px;
  }
}
.hide {
  display: none;
}
.taglist {
  margin-top: 20px;
  .van-divider {
    color: #000;
  }
  .van-tag {
    margin: 0 5px;
  }
}
</style>
