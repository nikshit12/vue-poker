import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CreateView from '@/views/CreateView.vue'
import UseView from '@/views/UseView.vue'
import AuthView from '@/views/AuthView.vue'
import CreateTicketView from '@/views/CreateTicketView.vue'
import { authStore } from '@/stores/authStore'
import EstimateView from '@/views/EstimateView.vue'
import VoteTicketView from '@/views/VoteTicketView.vue'
import ShowTicketView from '@/views/ShowTicketView.vue'
import { voterStore } from '@/stores/voterStore'
import JoinView from '@/views/JoinView.vue'
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
    path: '/join',
    name: 'join',
    component: JoinView
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
    path: '/join-room/:id',
    name: 'showticket',
    component: ShowTicketView
  },
  {
    path: '/room/:id/estimate/:id',
    name: 'estimateticket',
    component: EstimateView
  },
  {
    path: '/room/:roomId/estimate/:ticketId/vote',
    name: 'voteticket',
    component: VoteTicketView,
    props: (route) => ({
      roomId: route.params.roomId,
      ticketId: route.params.ticketId,
      isVoteMode: route.params.ticketId != null && route.params.roomId != null
    })
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
