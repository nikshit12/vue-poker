import { ref } from 'vue'
import { defineStore } from 'pinia'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase/firebase.js'

let unsubscribe = null

export const voterStore = defineStore('voterStore', () => {
  const voterName = ref('')
  const currentRoom = ref(null)
  const voteMode = ref(false)
  const roomId = ref(null)
  const ticketId = ref(null)

  async function getRoomById() {
    const collectionRef = doc(db, 'rooms', roomId.value)
    if (unsubscribe) unsubscribe()
    unsubscribe = onSnapshot(collectionRef, (roomsValue) => {
      currentRoom.value = roomsValue.data()
    })
  }
  return { voteMode, voterName, roomId, currentRoom, getRoomById }
})
