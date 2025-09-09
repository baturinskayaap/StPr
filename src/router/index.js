import { createRouter, createWebHistory } from 'vue-router'
import { store } from '@/stores/counter'

import LoginView from '../view/LoginView.vue'
import ClientView from '../view/ClientView.vue'
import AdminUserInfo from '../view/AdminUserInfoView.vue'
import AdminDashboard from '../view/AdminTableView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: '/client',
    name: 'Client',
    component: ClientView,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/users/:userId',
    name: 'AdminUserInfo',
    component: AdminUserInfo,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isLoggedIn
  const isAdmin = store.state.isAdmin
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next(isAuthenticated ? { name: 'Client' } : { name: 'Login' })
  } else {
    next()
  }
})

export default router
