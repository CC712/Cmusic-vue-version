import Vue from 'vue'
import Router from 'vue-router'
import store from '../components/content/store/store'
import myStore from '../components/content/myStore/myStore'
import search from '../components/content/search/search'
import TheHome from '../components/TheHome'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/store'
    },
    {
      path: '/home',
      component: TheHome,
      children: [
        {
          path: 'store',
          component: store
        },
        {
          path: 'mystore',
          component: myStore
        },
        {
          path: 'search',
          component: search
        }
      ]
    }
  ],
  linkActiveClass: 'active'
})
