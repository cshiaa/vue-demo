import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import AppLayout from "@/views/layout/index.vue";

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: () => import('@/views/home/home.vue')
  // },
  {
    path: '/register',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/about/about.vue')
  },
  // {
  //   path: '/One',
  //   // redirect: '/One/home',
  //   component: AppLayout,
  //   meta: {
  //       icon: "el-icon-mouse",
  //       name: '肆貓鸭第一弹'
  //   },
  //   // name: 'Home',
  //   children: [
  //       {
  //           path: 'home',
  //           name: 'Home',
  //           component: Home,
  //           meta: {
  //               needLogin: true,
  //               icon: 'el-icon-data-line',
  //               name: '个人资料'
  //           }
  //       }
  //    ]
  // }
]

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes
})

export default router
