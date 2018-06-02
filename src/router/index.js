import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'

import user from '@/views/user'
import welcome from '@/views/welcome/welcome'
import userInfo from '@/views/userList/userInfo'
import Right from '@/views/right/Rights'
import Role from '@/views/right/Roles'

import categories from '@/views/category/categories'




// //测试
// import add from '@/test/increment'
// import de from '@/test/decrement'
//end
Vue.use(Router)


export default new Router({
  routes: [{
      path: '/login',
      name: 'Login',
      component: Login
    },
    //测试
    // {
    //   path: '/de',
    //   name: 'de',
    //   component: de,
    //   children:[
    //     {
    //   path: '',
    //   name: 'add',
    //   component: add
    // }
    //   ]
    // },
    //end

    {
      path: '/',
      name: 'user',
      component: user,
      redirect: {
        path: '/welcome'
      },
      children: [{
        path: 'welcome',
        component: welcome
      },
      {
        path: 'users',
        component: userInfo
      },
      {
        path:'rights',
        component:Right
      },
      {
        path: 'roles',
        component: Role
      },
      {
        path: 'categories',
        component: categories

      }


    ]
    }

  ]
})
