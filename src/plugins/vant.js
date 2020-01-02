import Vue from 'vue'
import {
    Button,
    ImagePreview,
    Tab,
    Tabs,
    Notify,
    Lazyload,
    Tabbar,
    TabbarItem,
    CellGroup,
    Cell,
    Image,
    Icon,
    Swipe,
    SwipeItem,
    Grid,
    GridItem,
    Field,
    Loading,
    Card,
    List,
    Overlay,
    Row,
    Col,
    Search,
    Divider,
    PullRefresh,
    SubmitBar,
    Stepper,
    Toast,
    SwipeCell,
    Tag
} from 'vant'
Vue.use(Button)
Vue.use(ImagePreview)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Notify)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(CellGroup)
Vue.use(Cell)
Vue.use(Image)
Vue.use(Icon)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Field)
Vue.use(Loading)
Vue.use(Card)
Vue.use(List)
Vue.use(Overlay)
Vue.use(Loading)
Vue.use(Icon)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Card)
Vue.use(List)
Vue.use(Cell)
Vue.use(Overlay)
Vue.use(Row)
Vue.use(Col)
Vue.use(Search)
Vue.use(Divider)
Vue.use(PullRefresh)
Vue.use(SubmitBar)
Vue.use(Stepper)
Vue.use(Toast)
Vue.use(SwipeCell)
Vue.use(Tag)
Vue.use(Lazyload, {
    lazyComponent: true,
    silent: false,
    throttleWait: 500
})
