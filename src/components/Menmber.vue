<template>
  <div class="container">
    <div class="member">
      <van-loading type="spinner" size="24px" color="#000" vertical
        >正在加班加点开发中，敬请期待！</van-loading
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.member {
  padding-top: 20px;
  .van-loading__text {
    margin-top: 15px;
    color: #000;
    font-size: 16px;
  }
}
</style>
