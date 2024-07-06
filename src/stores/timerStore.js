import { ref } from 'vue'
import { defineStore } from 'pinia'
export const timerStore = defineStore('timerStore', () => {
  const isTimerRunning = ref(false)
  return { isTimerRunning }
})
