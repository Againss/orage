import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'

import user from '@/views/user'
import welcome from '@/views/welcome/welcome'

Vue.use(Router)


export default new Router({
  routes: [{
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'user',
      component: user,
      redirect:{path:'/welcome'},
      children: [{
        path: 'welcome',
        component:welcome
      }]
    }

  ]
})
