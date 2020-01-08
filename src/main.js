// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'


import { Field, Toast, Button, NavBar, Tab, Tabs, Swipe, SwipeItem, Sticky, Image, Slider, Icon, Popup, Cell, Search, Collapse, CollapseItem } from 'vant';
Vue.use(Field)
    .use(Toast)
    .use(Button)
    .use(NavBar)
    .use(Tab)
    .use(Tabs)
    .use(Swipe)
    .use(SwipeItem)
    .use(Sticky)
    .use(Image)
    .use(Slider)
    .use(Icon)
    .use(Popup)
    .use(Cell)
    .use(Search)
    .use(Collapse)
    .use(CollapseItem)















Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})