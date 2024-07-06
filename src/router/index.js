import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CreateView from '@/views/CreateView.vue'
import UseView from '@/views/UseView.vue'
import AuthView from '@/views/AuthView.vue'
import CreateTicketView from '@/views/CreateTicketView.vue'
import { authStore } from '@/stores/authStore'
import EstimateView from '@/views/EstimateView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'create',
    component: CreateView
  },
  {
    path: '/use',
    name: 'use',
    component: UseView
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/room/:id',
    name: 'createticket',
    component: CreateTicketView
  },
  {
    path: '/estimate/:id',
    name: 'estimateticket',
    component: EstimateView
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  const useAuthStore = authStore()
  if (!useAuthStore.isLoggedIn && to.name != 'auth') {
    return { name: 'auth' }
  }
  if (useAuthStore.isLoggedIn && to.name == 'auth') {
    return false
  }
  if (to.matched.length == 0) {
    return false
  }
})

export default router
