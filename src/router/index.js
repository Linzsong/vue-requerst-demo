import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Login from '@/components/Login'


Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: {   //守卫标记,令牌验证机制token
        auth: true,
      }
    }
  ]
});

//路由守卫
router.beforeEach((to, from, next) => {
  if(to.meta.auth) {
    const token = localStorage.getItem('token')
    if(token) {
      next();
    } else {
      next({
        path: '/Login',
        query: { redirectTo: to.path}   //路由的重定向友好操作
      })
    }
  } else {
    next();
  }
})

export default router
