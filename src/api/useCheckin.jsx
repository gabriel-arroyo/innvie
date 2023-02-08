import { useEffect, useState } from "react"
import { collection, doc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore"
import moment from "moment"
import db from "../firebase"
import calendarConverter from "./classCalendar"
import useUser from "./useUser"
import useRoom from "./useRoom"

function useCheckin() {
  const [calendarError, setError] = useState(false)
  const [currentEvent, setCurrentEvent] = useState({})
  const collectionRef = collection(db, "calendar")
  const { currentUser } = useUser()
  const { updateRoomStatus } = useRoom()

  async function getSingle(field, operator, value) {
    setError(false)
    const q = query(collectionRef, where(field, operator, value))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      setError("No matching documents")
      return null
    }
    let roomData = null
    querySnapshot.forEach((_room) => {
      roomData = { ..._room.data(), id: _room.id }
    })
    return roomData
  }

  async function getMany(field, operator, value) {
    setError(false)
    let q = query(collectionRef)
    if (field && value && operator) {
      q = query(collectionRef, where(field, operator, value))
    }
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      setError("No matching documents")
      return null
    }
    const roomData = []
    querySnapshot.forEach((_room) => {
      roomData.push({ ..._room.data(), id: _room.id })
    })
    return roomData
  }

  async function updateEventWithCheckin() {
    if (!currentEvent.id) return
    const { id, ...data } = currentEvent
    const newData = {
      ...data,
      status: "occupied",
      checkin: serverTimestamp(),
    }
    await setDoc(doc(db, "calendar", id), newData)
    await updateRoomStatus(currentEvent.number, "occupied")
  }
  async function updateEventWithCheckout() {
    if (!currentEvent.id) return
    const { id, ...data } = currentEvent
    const newData = {
      ...data,
      status: "dirty",
      checkout: serverTimestamp(),
    }
    await setDoc(doc(db, "calendar", id), newData)
    await updateRoomStatus(currentEvent.number, "available")
  }

  async function getCurrentEvent() {
    setError(false)
    let email = ""
    if (currentUser) {
      email = currentUser.email ?? ""
    } else {
      const item = JSON.parse(localStorage.getItem("user"))
      if (item) {
        email = item.email
      }
    }
    const today = moment().toDate()
    const q = query(
      collectionRef,
      where("endDate", ">", today),
      where("email", "==", email)
    ).withConverter(calendarConverter)
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      setError("No matching documents")
      return []
    }
    const roomData = []
    querySnapshot.forEach((_room) => {
      roomData.push({ ..._room.data(), id: _room.id })
    })
    if (roomData.length === 0) return []
    const near = roomData.filter((room) => {
      const roomDate = new Date(room.startDate)
      const diff = Math.abs(moment(roomDate).diff(today, "hours"))
      // solo permite hacer checkin 24 horas antes o después
      return Math.abs(diff) <= 24
    })
    if (near.length === 0) return []

    const ordered = near.sort((a, b) => {
      const aDate = moment(a.startDate).toDate()
      const bDate = moment(b.startDate).toDate()
      return aDate - bDate
    })
    const selected = ordered[0] ?? []
    setCurrentEvent(selected)

    return selected
  }

  useEffect(() => {
    getCurrentEvent()
  }, [])

  return {
    getMany,
    getSingle,
    getCurrentEvent,
    currentEvent,
    calendarError,
    updateEventWithCheckin,
    updateEventWithCheckout,
  }
}

export default useCheckin
