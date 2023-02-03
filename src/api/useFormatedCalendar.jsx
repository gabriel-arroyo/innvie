import { useState } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import db from "../firebase"
import formatedCalendarConverter from "./classFormatedCalendar"
import roomNumberConverter from "./classRoomNumbers"

function useFormatedCalendar() {
  const calendarRef = collection(db, "calendar")
  const roomsRef = collection(db, "rooms")
  const [loading, setLoading] = useState(false)
  const [groups, setGroups] = useState([])
  const [items, setItems] = useState([])

  async function getEvents() {
    const q = query(calendarRef).withConverter(formatedCalendarConverter)
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
    setItems(roomData)
    return roomData
  }

  async function getRooms() {
    const q = query(roomsRef, orderBy("number")).withConverter(roomNumberConverter)
    const querySnapshot = await getDocs(q)
    const roomData = []
    querySnapshot.forEach((_room) => {
      roomData.push(_room.data())
    })
    setGroups(roomData)
    return []
  }

  async function getCalendar() {
    setLoading(true)
    await getEvents()
    await getRooms()
    setLoading(false)
  }

  return {
    loading,
    groups,
    items,
    getCalendar,
  }
}

export default useFormatedCalendar
