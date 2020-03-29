import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Category from '@/views/Category'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/category',
    name: 'category',
    component:Category
  },
  {
    path:'/categorylist/:id',
    name:'categorylist',
    component: () => import(/* webpackChunkName: "about" */ '@/views/categorylist.vue'),
    props:true
  },
  {
    path:'/product/:id',
    name:'product',
    component:() => import(/* webpackChunkName: "about" */ '@/views/product.vue'),
    props:true
  },
  {
    path:'/buycart',
    name:'buycart',
    component:() => import('@/views/buycart')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
