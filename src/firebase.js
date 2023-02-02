// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgCBhQvJ5L-mrBmWsG5jEvtAdIjkDdGxI",
  authDomain: "innvie-6e09a.firebaseapp.com",
  projectId: "innvie-6e09a",
  storageBucket: "innvie-6e09a.appspot.com",
  messagingSenderId: "611149924665",
  appId: "1:611149924665:web:9832c851138ab57d7dc0e8",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export const storage = getStorage(app)
export default db
