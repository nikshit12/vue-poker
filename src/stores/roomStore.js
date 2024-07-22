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
  roomTable: 'rooms',
  orderByField: 'timeStamp',
  order: 'desc'
}
let collectionRef = null
let notesQueryByTimestamp = null
let unsubsribe = null
export const roomStore = defineStore('roomStore', () => {
  const roomName = ref('')
  const rooms = ref([])
  const currentTicket = ref({})
  const useAuthStore = authStore()

  async function initRoomDb() {
    collectionRef = collection(db, collectionsData.roomTable)
    notesQueryByTimestamp = query(
      collectionRef,
      orderBy(collectionsData.orderByField, collectionsData.order),
      where('createdBy', '==', useAuthStore.userId)
    )
    getRoom()
  }

  function getTickets(roomId) {
    return rooms.value.filter((room) => room.id == roomId).flatMap((room) => room.tickets)
  }

  async function createRoom() {
    const timeStamp = new Date().getTime().toString()

    await addDoc(collectionRef, {
      timeStamp,
      name: roomName.value,
      createdBy: useAuthStore.userId,
      ownerEmail: useAuthStore.userEmail,
      ownerId: useAuthStore.userId,
      tickets: []
    })
  }

  async function addTicket(roomid, name) {
    const roomRef = doc(collectionRef, roomid)
    const timeStamp = new Date().getTime().toString()
    const newTicket = {
      ticketId: useUniqueId().uniqeId(),
      ticketName: name,
      timeStamp,
      totalEstimation: [],
      averageEstimation: 0,
      link: ''
    }
    updateDoc(roomRef, {
      tickets: arrayUnion(newTicket)
    })
      .then(() => {
        console.log('Ticket added successfully!')
      })
      .catch((error) => {
        console.error('Error adding ticket: ', error)
      })
  }
  async function getRoom() {
    if (unsubsribe) unsubsribe()
    unsubsribe = onSnapshot(notesQueryByTimestamp, (roomsValue) => {
      const roomsData = []
      roomsValue.forEach((room) => {
        roomsData.push({ id: room.id, ...room.data() })
      })
      rooms.value = roomsData
    })
  }

  return { roomName, rooms, currentTicket, getTickets, createRoom, getRoom, initRoomDb, addTicket }
})
