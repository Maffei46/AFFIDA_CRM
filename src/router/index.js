import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SettingsView from '../views/SettingsView.vue'
import LoggedView from '../views/logged/LoggedView.vue'
import LoggedPraticheView from '../views/logged/pratiche/PraticheView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/settings', name: 'settings', component: SettingsView },
  { path: '/logged', component: LoggedView, children:[
    { path: 'pratiche', component: LoggedPraticheView, children:[
      { path: 'import', name: 'Pratiche Import', component: ()=>import('@/views/logged/pratiche/pratiche_import.vue') },
    ]},
  ]},
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {return window.scrollTo({ top: document.querySelector(to.hash).offsetTop, behavior: 'smooth' });}
    return window.scrollTo({ top: 0, behavior: 'smooth' });
  },
})

export default router
