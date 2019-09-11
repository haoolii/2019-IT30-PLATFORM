import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Register from './views/Register.vue'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/lobby',
      name: 'lobby',
      meta: { requiresAuth: true },
      component: () =>
        import(/* webpackChunkName: "Lobby" */ './views/Lobby.vue'),
      children: [
        // UserHome will be rendered inside User's <router-view>
        // when /user/:id is matched
        {
          path: '/lobby',
          name: 'gamelist',
          component: () =>
            import(/* webpackChunkName: "GameList" */ './views/GameList.vue')
        },
        {
          path: '/lobby/withdrawal',
          name: 'withdrawal',
          component: () =>
            import(
              /* webpackChunkName: "Withdrawal" */ './views/Withdrawal.vue'
            )
        },
        {
          path: '/lobby/deposit',
          name: 'deposit',
          component: () =>
            import(/* webpackChunkName: "Deposit" */ './views/Deposit.vue')
        }
      ]
    }
  ]
})

// 所有路由執行前會在這
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
