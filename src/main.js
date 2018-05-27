// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "../src/assets/font/iconfont.css"
import "./style/index.less"
import App from './App'
import router from './router'

Vue.use(ElementUI); 


Vue.config.productionTip = false

//全局守卫,防止用户没有登录跳转页面
router.beforeEach((to, from, next) => {
 let token = localStorage.getItem('mytoken');
 if(token){
   next()
 }else{
   if(to.path !== '/login'){
     next({path:'/login'})
   }else{
     next()
   }
 }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
