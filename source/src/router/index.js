// 导入路由对象
import { createRouter, createWebHashHistory } from 'vue-router'
// 路径配置 .vue 可以省略
const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/home.vue') //.vue可以省略
  },
  {
    path: '/price',
    name: 'price',
    component: () => import('../views/price.vue') //.vue可以省略
  }
]

// 路由参数配置
const router = createRouter({
  // 使用hash(createWebHashHistory)模式，(createWebHistory是HTML5历史模式，支持SEO)
  history: createWebHashHistory(),
  routes: routes,
})

export default router;