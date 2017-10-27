import Vue from 'vue'
import Router from 'vue-router'
import store from '../components/content/store/store'
import myStore from '../components/content/myStore/myStore'
import search from '../components/content/search/search'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/store'
    },
    {
      path: '/store',
      component: store
    },
    {
      path: '/myStore',
      component: myStore
    },
    {
      path: '/search',
      component: search
    }
  ],
  linkActiveClass: 'active'
})
