import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    total: [],
    goodsCount: 0,
    goodsPrice: 0,
    flag: false
  },
  mutations: {
    // 加购物车(数量改变)
    addToCar(state, params) {
      state.flag = false
      state.total = JSON.parse(window.localStorage.getItem('total'))
      // 若本地total为空
      if (!state.total) {
        state.total = [params]
      } else {
        // 若本地total已包含该商品
        state.total.forEach(item => {
          if (item.id === params.id) {
            item.count = params.count
            state.flag = true
          }
        })
        console.log(state.total)
        // 若本地total不包含该商品
        if (!state.flag) {
          state.total.push(params)
        }
      }
      window.localStorage.setItem('total', JSON.stringify(state.total))
      this.commit('getList')
    },
    // 删除商品
    deleteGoods(state, id) {
      state.total = JSON.parse(window.localStorage.getItem('total'))
      const i = state.total.findIndex(item => item.id === id)
      state.total.splice(i, 1)
      window.localStorage.setItem('total', JSON.stringify(state.total))
      this.commit('getList')
    },
    // 从本地获取购物车商品数据
    getList(state) {
      state.goodsCount = 0
      state.goodsPrice = 0
      state.total = JSON.parse(window.localStorage.getItem('total'))
      if (!state.total) return
      state.total.forEach(item => {
        state.goodsCount += item.count
        state.goodsPrice += (-item.count) * (-item.price)
      })
      state.goodsPrice *= 100
    }
  },
  actions: {
  },
  modules: {
  }
})
