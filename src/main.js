import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'

import App from './App.vue'
import router from './router'
// 导入全局样式表
import "./assets/css/global.less"

Vue.use(ElementUI)
// 配置请求的根路径
axios.defaults.baseURL = "https://www.liulongbin.top:8888/api/private/v1/"
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
