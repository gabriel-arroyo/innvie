import { useAtom } from "jotai"
import loggedUserAtom from "states/loggedUser"
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore"
import { useEffect, useState } from "react"
import useHistory from "./useHistory"
import db from "../firebase"

function useAccesories() {
  const { addAction } = useHistory()
  const [loading, setLoading] = useState(false)
  const [accesoryError, setError] = useState(false)
  const [accesories, setAccesories] = useState([])
  const collectionRef = collection(db, "accesories")
  const [loggedUser] = useAtom(loggedUserAtom)

  async function getAccesories() {
    setError(false)
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.error("no matching documents")
      setAccesories([])
      setLoading(false)
      return null
    }
    const accesoriesData = []
    querySnapshot.forEach((accesory) => {
      accesoriesData.push({ ...accesory.data(), id: accesory.id })
    })
    setAccesories(accesoriesData)
    return accesoriesData
  }

  async function addAccesory(newAccesory) {
    const q = query(collectionRef, where("name", "==", newAccesory.name))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      // eslint-disable-next-line
      console.error("accesory already exists")
      setError("Accesory already exists")
      return false
    }

    setError(false)

    const newRoomWithTimestamp = { ...newAccesory, lastUpdate: serverTimestamp() }
    try {
      const docRef = doc(collectionRef)
      await setDoc(docRef, newRoomWithTimestamp)
      await getAccesories()
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
      setError(e)
      return false
    }
    addAction({
      action: "newAccesory",
      room: newAccesory,
      admin: !!loggedUser.admin,
      email: loggedUser.email,
      fisrt_name: loggedUser.first_name,
      last_name: loggedUser.last_name,
    })
    return true
  }

  async function deleteAccesory(id) {
    setError(false)
    try {
      const docRef = doc(collectionRef, id)
      await deleteDoc(docRef)
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
      setError(e)
    }
    addAction({
      action: "deleteAccesory",
      room: { type: id },
      admin: !!loggedUser.admin,
      email: loggedUser.email,
      fisrt_name: loggedUser.first_name,
      last_name: loggedUser.last_name,
    })
  }

  async function deleteAllAccesories() {
    setError(false)
    try {
      const q = query(collectionRef)
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((roomData) => {
        const docRef = doc(collectionRef, roomData.id)
        deleteDoc(docRef)
      })
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
      setError(e)
    }
    addAction({
      action: "deleteAccesory",
      room: { type: "all" },
      admin: !!loggedUser.admin,
      email: loggedUser.email,
      fisrt_name: loggedUser.first_name,
      last_name: loggedUser.last_name,
    })
  }

  async function getAccesoryByName(accesory) {
    setError(false)
    const q = query(collectionRef, where("name", "==", accesory))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.error("no matching documents")
      return null
    }
    let accesoryData = null
    querySnapshot.forEach((room) => {
      accesoryData = { ...room.data(), id: room.id }
    })
    return accesoryData
  }

  async function getAccesoryByTitle(accesory) {
    setError(false)
    const q = query(collectionRef, where("title", "==", accesory))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.error("no matching documents")
      return null
    }
    let accesoryData = null
    querySnapshot.forEach((room) => {
      accesoryData = { ...room.data(), id: room.id }
    })
    return accesoryData
  }

  async function updateAccesory(updatedAccesory) {
    setError(false)
    setLoading(true)
    const accesoryToUpdate = await getAccesoryByName(updatedAccesory.name)
    if (!accesoryToUpdate) {
      setError("Room not found")
      setLoading(false)
      return
    }
    const updatedAccesoryWithTimestamp = {
      ...accesoryToUpdate,
      ...updatedAccesory,
      lastUpdate: serverTimestamp(),
    }
    try {
      const docRef = doc(collectionRef, accesoryToUpdate.id)
      updateDoc(docRef, updatedAccesoryWithTimestamp)
    } catch (e) {
      // eslint-disable-next-line
      console.error("error:", e)
      setError(e)
    }
    addAction({
      action: "updateAccesory",
      room: updatedAccesory,
      admin: !!loggedUser.admin,
      email: loggedUser.email,
      fisrt_name: loggedUser.first_name,
      last_name: loggedUser.last_name,
    })
    setLoading(false)
  }

  async function deleteAccesoryByName(name) {
    setError(false)
    try {
      const q = query(collectionRef, where("name", "==", name))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((roomData) => {
        const docRef = doc(collectionRef, roomData.id)
        deleteDoc(docRef)
      })
    } catch (e) {
      // eslint-disable-next-line
      console.error("error:", e)
      setError(e)
    }
    addAction({
      action: "deleteAccesory",
      room: { number: name },
      admin: !!loggedUser.admin,
      email: loggedUser.email,
      fisrt_name: loggedUser.first_name,
      last_name: loggedUser.last_name,
    })
    getAccesories()
  }

  useEffect(() => {
    getAccesories()
  }, [])

  return {
    loading,
    accesories,
    addAccesory,
    deleteAccesory,
    getAccesories,
    deleteAccesoryByName,
    updateAccesory,
    getAccesoryByName,
    getAccesoryByTitle,
    deleteAllAccesories,
    roomError: accesoryError,
  }
}

export default useAccesories
