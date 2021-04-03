import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login'
import Home from '../views/Home'
import Welcome from '../components/Welcome'
import Users from '../views/user/Users'
import Rights from '../views/power/Rights'
import Roles from '../views/power/Roles'
import Cate from '../views/goods/Cate'
import Params from '../views/goods/Params'

Vue.use(VueRouter)

const routes = [
  {path: '/',redirect: '/login',},
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children:[
      {path: '/welcome', component: Welcome},
      {path: '/users', component: Users},
      {path: '/rights', component: Rights},
      {path: '/roles', component: Roles},
      {path: '/categories', component: Cate},
      {path: '/params', component: Params},
    ]
  },

]

const router = new VueRouter({
  routes
})

// 前置路由导航守卫
router.beforeEach((to, from, next) => {
  console.log(to.path)
  //to and from are Route Object,next() must be called to resolve the hook
  if(to.path === '/login') return next()
  
  // 获取token
  const token = window.sessionStorage.getItem('token')
  console.log("token",token)
  if(token) {
    next()
  }else {
    next('/login')
  }
  
})

export default router
