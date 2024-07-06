import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
export const playerStore = defineStore('playerStore', () => {
  const players = ref([
    { name: 'Nexo', estimation: 0, hasVotted: true },
    { name: 'Nixit', estimation: 10, hasVotted: true },
    { name: 'Tushar', estimation: 5, hasVotted: true },
    { name: 'Nexo', estimation: 0, hasVotted: true },
    { name: 'Nixit', estimation: 10, hasVotted: true },
    { name: 'Tushar', estimation: 5, hasVotted: true },
    { name: 'Nexo', estimation: 0, hasVotted: true },
    { name: 'Nixit', estimation: 10, hasVotted: true },
    { name: 'Tushar', estimation: 5, hasVotted: true },
    { name: 'Nexo', estimation: 0, hasVotted: true },
    { name: 'Nixit', estimation: 10, hasVotted: true },
    { name: 'Tushar', estimation: 5, hasVotted: true }
  ])

  return { players }
})
