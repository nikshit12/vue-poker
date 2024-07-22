import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  query,
  orderBy,
  where
} from 'firebase/firestore'
import { db } from '@/firebase/firebase.js'
import { authStore } from '@/stores/authStore'
import useUniqueId from '@/utils/useUniqueId'
const collectionsData = {
  userTable: 'users',
  ticketTable: 'tickets',
  orderByField: 'timeStamp',
  order: 'desc'
}
let ticketCollectionRef = collection(db, collectionsData.ticketTable)
let ticketQueryByTimestamp = null
let unsubsribe = null
let searchEventSubscribe = null
export const ticketStore = defineStore('ticketStore', () => {
  const useAuthStore = authStore()
  const tickets = ref([])

  async function addTicket(roomId, name) {
    const timeStamp = new Date().getTime().toString()

    await addDoc(ticketCollectionRef, {
      timeStamp,
      name,
      ownerEmail: useAuthStore.userEmail,
      ownerId: useAuthStore.userId,
      roomId
    })
  }

  return {
    tickets,
    addTicket
  }
})
