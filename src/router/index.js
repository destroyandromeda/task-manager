import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'create',
    component: () => import('../views/Create.vue')
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/List.vue')
  },
  {
    path: '/task/:id',
    name: 'task',
    component: () => import('../views/Task.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
