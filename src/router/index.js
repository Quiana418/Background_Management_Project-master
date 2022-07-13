import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 路由懒加载
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/layout',
    component: () => import('@/views/Layout'),
    children: [
      { path: '/home', name: 'home', component: () => import('@/views/Home') },
      { path: '/users', name: 'users', component: () => import('@/views/Users') },
      { path: '/roles', name: 'roles', component: () => import('@/views/Roles') },
      { path: '/rights', name: 'rights', component: () => import('@/views/Rights') },
      { path: '/goods', name: 'goods', component: () => import('@/views/Goods') },
      { path: '/params', name: 'params', component: () => import('@/views/Params') },
      { path: '/categories', name: 'categories', component: () => import('@/views/Categories') },
      { path: '/orders', name: 'orders', component: () => import('@/views/Orders') },
      { path: '/reports', name: 'reports', component: () => import('@/views/Reports') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
