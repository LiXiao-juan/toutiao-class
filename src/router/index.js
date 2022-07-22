import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: 'profile',
        component: () => import('@/views/My')
      },
      {
        path: 'video',
        component: () => import('@/views/Video')
      },
      {
        path: 'qa',
        component: () => import('@/views/QA')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/user',
    component: () => import('@/views/My/components/EditUser')
  },
  {
    path: '/detail/:articleId',
    component: () => import('@/views/News')
  }
]

const router = new VueRouter({
  routes
})

export default router
