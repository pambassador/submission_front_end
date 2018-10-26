// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import global_ from './pages/common/global/index'
import base from './pages/common/global/base.js'
import myHeader from './components/myHeader'
import myFooter from './components/myFooter'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "./server/jquery.js"
import "./server/layer-v3.1.1/layer/layer.js"
import "./style/base.css"
import "./style/common.css"
import "./style/font-awesome-4.7.0/css/font-awesome.min.css"

Vue.config.productionTip = false
Vue.prototype.GLOBAL = global_
Vue.use(ElementUI)
Vue.use(base)
Vue.component('my-header', myHeader)
Vue.component('my-footer', myFooter)

router.beforeEach((to, from, next) => {
  var self = this;
  if (to.matched.some(record => record.meta.requireAuth)) {
    //这里判断用户是否登录，验证本地存储是否有cookie
    if (document.cookie) { // 判断当前的token是否存在
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
