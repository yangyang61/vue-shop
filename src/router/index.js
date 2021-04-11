import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import(/* webpackChunkName: "group-foo" */ '../components/Login')
const Home = () => import(/* webpackChunkName: "group-foo" */ '../views/Home')
const Welcome = () => import(/* webpackChunkName: "group-foo" */ '../components/Welcome')
const Users = () => import(/* webpackChunkName: "group-foo" */ '../views/user/Users')
const Rights = () => import(/* webpackChunkName: "group-foo" */ '../views/power/Rights')
const Roles = () => import(/* webpackChunkName: "group-foo" */ '../views/power/Roles')
const Cate = () => import(/* webpackChunkName: "group-foo" */ '../views/goods/Cate')
const Params = () => import(/* webpackChunkName: "group-foo" */ '../views/goods/Params')
const GoodsList = () => import(/* webpackChunkName: "group-foo" */ '../views/goods/List')
const GoodsAdd = () => import(/* webpackChunkName: "group-foo" */ '../views/goods/Add')
const Order = () => import(/* webpackChunkName: "group-foo" */ '../views/order/Order')
const Report = () => import(/* webpackChunkName: "group-foo" */ '../views/report/Report')
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
      {path: '/goods', component: GoodsList},
      {path: '/goods/add', component: GoodsAdd},
      {path: '/orders', component: Order},
      {path: '/reports', component: Report},
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
