import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if(store.state.currentUser != '')next('/DashBoard')
      else next()
    }
  },
  {
    path: '/SignUp',
    name: 'signUp',
    beforeEnter: (to, from, next) => {
      if(store.state.currentUser != '')next('/DashBoard')
      else next()
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue')
    
  },
  {
    path: '/DashBoard',
    name: 'dashboard',
    beforeEnter: (to, from, next) => {
      if(store.state.currentUser == '')next('/')
      else next()
    },
    component: () => import('../views/DashBoard.vue')
  }
]

const router = new VueRouter({
  routes
})
// router.beforeEach((to,from, next) =>{
//   if(store.state.currentuser == '')next('/')
//   else next('/dashboard')
// })
export default router
