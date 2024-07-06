// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBM11MZ7dZVKge_FWcHwUsbiBSMA2J7wGg',
  authDomain: 'nexo-poker.firebaseapp.com',
  projectId: 'nexo-poker',
  storageBucket: 'nexo-poker.appspot.com',
  messagingSenderId: '575169380286',
  appId: '1:575169380286:web:a6b1ea59071147f7b303ef',
  measurementId: 'G-T99WY3V2VD'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
export { db, auth }
