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
let roomsCollectionRef = null
let roomsQueryByTimestamp = null
let unsubsribe = null
let searchEventSubscribe = null
export const roomStore = defineStore('roomStore', () => {
  const roomName = ref('')
  const rooms = ref([])
  const currentTicket = ref({})
  const useAuthStore = authStore()
  const searchedRooms = ref([])
  async function initRoomDb() {
    roomsCollectionRef = collection(db, collectionsData.roomTable)
    roomsQueryByTimestamp = query(
      roomsCollectionRef,
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

    await addDoc(roomsCollectionRef, {
      timeStamp,
      name: roomName.value,
      createdBy: useAuthStore.userId,
      ownerEmail: useAuthStore.userEmail,
      ownerId: useAuthStore.userId,
      tickets: []
    })
  }

  async function getRoom() {
    if (unsubsribe) unsubsribe()
    unsubsribe = onSnapshot(roomsQueryByTimestamp, (roomsValue) => {
      const roomsData = []
      roomsValue.forEach((room) => {
        roomsData.push({ id: room.id, ...room.data() })
      })
      rooms.value = roomsData
    })
  }

  async function searchRoomByName(roomName) {
    if (searchEventSubscribe) searchEventSubscribe()
    searchEventSubscribe = onSnapshot(roomsCollectionRef, (roomsSnapshot) => {
      const roomsData = []
      roomsSnapshot.forEach((room) => {
        const roomData = { id: room.id, ...room.data() }
        if (roomData.name.toLowerCase().includes(roomName.toLowerCase())) {
          roomsData.push(roomData)
        }
      })
      searchedRooms.value = roomsData
    })
  }

  return {
    roomName,
    rooms,
    currentTicket,
    searchedRooms,
    getTickets,
    createRoom,
    getRoom,
    initRoomDb,
    searchRoomByName
  }
})
