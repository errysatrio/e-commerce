import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login-page.vue'
import Register from '../views/Register-page.vue'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'
Vue.use(VueRouter)

const beforeEnter = async (to, from, next) => {
  if (localStorage.access_token) {
    next({
      path: '/home'
    })
  } else {
    next()
  }
}
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  }
]
const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    (localStorage.access_token) ? next() : next({ name: 'Login-page' })
  } else {
    next()
  }
})

export default router
