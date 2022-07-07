import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'

const routes = [
  {
    path: '',
    name: 'home',
    component: IndexView,
    meta: { title: 'Home' }
  },
  {
    path: '/beats',
    name: 'beats',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/BeatsView.vue'),
    meta: { title: 'Beats' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior: function(to) {
    if (to.hash) {
      return {el: to.hash, behavior: 'smooth'}
    } else {
      return {left: 0, top: 0}
    }
  },
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title || 'S1ke Beatstore'
})


export default router
