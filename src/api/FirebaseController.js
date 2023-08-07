/* eslint-disable no-console */
import { collection, doc, setDoc, getDocs, query, deleteDoc } from "firebase/firestore"
import db from "../firebase"

class FirebaseController {
  constructor(myCollection) {
    this.collectionRef = collection(db, myCollection)
  }

  async readAllDocuments() {
    try {
      const q = query(this.collectionRef)
      const querySnapshot = await getDocs(q)
      if (querySnapshot.empty) {
        // eslint-disable-next-line
        console.log("no users found")
        return null
      }
      const items = []
      querySnapshot.forEach((user) => {
        items.push({ ...user.data(), id: user.id })
      })
      return items
    } catch (e) {
      console.log("error:", e)
      return null
    }
  }

  async setDocument(data) {
    try {
      const docRef = doc(this.collectionRef)
      await setDoc(docRef, data)
    } catch (e) {
      console.log("error:", e)
    }
  }

  async deleteDocument(id) {
    try {
      const docRef = doc(this.collectionRef, id)
      await deleteDoc(docRef)
    } catch (e) {
      console.log("error:", e)
    }
  }
}

export default FirebaseController
