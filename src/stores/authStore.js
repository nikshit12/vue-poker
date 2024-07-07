import { defineStore } from 'pinia'
import { auth } from '@/firebase/firebase.js'
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { ref } from 'vue'
import router from '@/router'
import { roomStore } from '@/stores/roomStore'
import { voterStore } from '@/stores/voterStore'
export const authStore = defineStore('authStore', () => {
  const userEmail = ref('')
  const userId = ref(null)
  const isLoggedIn = ref(false)

  function init() {
    if (!voterStore().voteMode) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          isLoggedIn.value = true
          userEmail.value = user.email
          userId.value = user.uid
          executeOnLoginFunctions()
          router.push('/')
        } else {
          isLoggedIn.value = false
          router.replace('/auth')
        }
      })
    }
  }

  function registerUser(cred) {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, cred.email, cred.password)
      .then((userCredential) => {
        const user = userCredential.user
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

  function loginUser(cred) {
    signInWithEmailAndPassword(auth, cred.email, cred.password)
      .then((userCredential) => {
        const user = userCredential.user
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

  function logoutUser() {
    signOut(auth)
      .then(() => {})
      .catch((error) => {})
  }

  function executeOnLoginFunctions() {
    roomStore().initRoomDb()
  }

  return { userEmail, userId, isLoggedIn, init, registerUser, loginUser, logoutUser }
})
