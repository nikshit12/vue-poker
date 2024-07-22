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

let unsubsribe = null
let getTicketIdSubscribe = null
export const ticketStore = defineStore('ticketStore', () => {
  const useAuthStore = authStore()
  const tickets = ref([])
  const currentRoomTickets = ref([])
  const currentTicket = ref({})
  let ticketCollectionRef = collection(db, collectionsData.ticketTable)
  async function addTicket(roomId, name) {
    const timeStamp = new Date().getTime().toString()

    await addDoc(ticketCollectionRef, {
      timeStamp,
      name,
      ownerEmail: useAuthStore.userEmail,
      ownerId: useAuthStore.userId,
      roomId,
      estimation: []
    })
  }

  async function setTicketValue(id, value) {
    console.log(id, value)
  }

  async function getTickets(roomId) {
    if (unsubsribe) unsubsribe()
    const queryStatement = query(
      ticketCollectionRef,
      orderBy(collectionsData.orderByField, collectionsData.order),
      where('ownerId', '==', useAuthStore.userId),
      where('roomId', '==', roomId)
    )
    unsubsribe = onSnapshot(queryStatement, (ticketsValue) => {
      const ticketsData = []
      ticketsValue.forEach((ticket) => {
        ticketsData.push({ id: ticket.id, ...ticket.data() })
      })
      tickets.value = ticketsData
    })
  }

  async function getCurrentRoomTickets(roomId) {
    if (unsubsribe) unsubsribe()
    const queryStatement = query(
      ticketCollectionRef,
      orderBy(collectionsData.orderByField, collectionsData.order),
      where('roomId', '==', roomId)
    )
    unsubsribe = onSnapshot(queryStatement, (ticketsValue) => {
      const ticketsData = []
      ticketsValue.forEach((ticket) => {
        ticketsData.push({ id: ticket.id, ...ticket.data() })
      })
      currentRoomTickets.value = ticketsData
    })
  }

  return {
    tickets,
    currentRoomTickets,
    currentTicket,
    addTicket,
    getTickets,
    getCurrentRoomTickets,
    setTicketValue
  }
})
