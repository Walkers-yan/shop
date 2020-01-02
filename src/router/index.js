import Vue from 'vue'
import VueRouter from 'vue-router'
import Common from '../components/Common.vue'
import Home from '../components/Home.vue'
import Member from '../components/Member.vue'
import PhotoList from '../components/photo/PhotoList.vue'
import PhotoDetail from '../components/photo/PhotoDetail.vue'
import Goodlist from '../components/goods/GoodsList.vue'
import Shopcar from '../components/shop/Shopcar.vue'
import Search from '../components/shop/Search.vue'
import Add from '../components/shop/Add.vue'
import NewsList from '../components/news/NewsList.vue'
import NewsDetail from '../components/news/NewsDetail.vue'
import GoodsDetail from '../components/goods/GoodsDetail.vue'
import GoodsDesc from '../components/shop/GoodsDesc.vue'
import GoodsComments from '../components/shop/GoodsComments.vue'

Vue.use(VueRouter)
const routes = [
  { path: '/', redirect: '/common' },
  {
    path: '/common',
    redirect: '/home',
    component: Common,
    children: [
      { path: '/home', component: Home },
      { path: '/member', component: Member },
      { path: '/photo/list', component: PhotoList },
      { path: '/photo/Info/:id', component: PhotoDetail },
      { path: '/goods/list', component: Goodlist },
      { path: '/shopcar', component: Shopcar },
      { path: '/search', component: Search },
      { path: '/addgoods', component: Add },
      { path: '/newslist', component: NewsList },
      { path: '/newslist/detail/:id', component: NewsDetail },
      { path: '/goods/detail/:id', component: GoodsDetail },
      { path: '/goodsdesc/:id', component: GoodsDesc },
      { path: '/goodscomments/:id', component: GoodsComments }
    ]
  }
]
const router = new VueRouter({
  routes
}
)
export default router
