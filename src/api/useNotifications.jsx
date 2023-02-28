/* eslint-disable camelcase */
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore"
import { useState } from "react"

import db from "../firebase"

function useNotifications() {
  const [loading, setLoading] = useState(false)
  const [reservationError, setError] = useState(false)
  const [notifications, setNotifications] = useState([])
  const collectionRef = collection(db, "notifications")

  async function addNotification({ email, text }) {
    setLoading(true)
    setError(false)
    const notificationWithTimestamp = {
      timestamp: serverTimestamp(),
      email,
      text,
    }
    try {
      const docRef = doc(collectionRef)
      await setDoc(docRef, notificationWithTimestamp)
    } catch (e) {
      // eslint-disable-next-line
      console.log("error:", e)
      setError(e)
      setLoading(false)
      return false
    }
    setLoading(false)
    return true
  }

  async function deletePast() {
    setLoading(true)
    setError(false)
    const monthsAgo = new Date()
    monthsAgo.setMonth(monthsAgo.getMonth() - 3)
    const date = Timestamp.fromDate(monthsAgo)
    try {
      const q = query(collectionRef, where("timestamp", "<", date))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((roomData) => {
        const docRef = doc(collectionRef, roomData.id)
        deleteDoc(docRef)
      })
    } catch (e) {
      // eslint-disable-next-line
      console.log("error:", e)
      setError(e)
    }
    setLoading(false)
  }

  async function getNotificationsByEmail(email) {
    setLoading(true)
    setError(false)
    const q = query(collectionRef, where("email", "==", email))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.log("no matching documents")
      setLoading(false)
      return null
    }
    const notificationsData = []
    querySnapshot.forEach((room) => {
      notificationsData.push({ ...room.data(), id: room.id })
    })
    setLoading(false)
    return notificationsData
  }

  async function deleteNotificationsByEmail(email) {
    setLoading(true)
    setError(false)
    try {
      const q = query(collectionRef, where("email", "==", email))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((roomData) => {
        const docRef = doc(collectionRef, roomData.id)
        setLoading(false)
        deleteDoc(docRef)
      })
    } catch (e) {
      // eslint-disable-next-line
      console.log("error:", e)
      setLoading(false)
      setError(e)
    }
  }

  async function getAllNotifications() {
    const historyData = []
    setLoading(true)
    setError(false)
    try {
      const q = query(collectionRef, orderBy("timestamp", "desc"), limit(10))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((roomData) => {
        historyData.push({ ...roomData.data(), id: roomData.id })
      })
      setNotifications(historyData)
      setLoading(false)
    } catch (e) {
      // eslint-disable-next-line
      console.log("error:", e)
      setError(e)
      setLoading(false)
    }
    return historyData
  }

  return {
    loading,
    notifications,
    addNotification,
    getAllNotifications,
    deletePast,
    deleteNotificationsByEmail,
    getNotificationsByEmail,
    roomError: reservationError,
  }
}

export default useNotifications
