import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore"
import moment from "moment"
import { useState } from "react"
import db from "../firebase"
import formatedCalendarConverter from "./classFormatedCalendar"
import roomNumberConverter from "./classRoomNumbers"
import { sendReservationChange } from "./mail"
import useNotifications from "./useNotifications"
/* eslint-disable camelcase */

function useFormatedCalendar() {
  const calendarRef = collection(db, "calendar")
  const roomsRef = collection(db, "rooms")
  const [loading, setLoading] = useState(true)
  const [groups, setGroups] = useState([])
  const [items, setItems] = useState([])
  const { addNotification } = useNotifications()

  const getStatusByDate = (start_time, end_time) => {
    const now = moment()
    if (now.isBefore(moment(start_time))) return "available"
    if (now.isAfter(moment(end_time))) return "done"
    return "occupied"
  }
  async function updateCalendarEntry(_id, _startDate, _endDate, group, status) {
    const start_time = moment(_startDate).set("hour", 15).set("minute", 0)
    const end_time = moment(_endDate).set("hour", 11).set("minute", 30)
    const calculatedStatus = status ?? getStatusByDate(start_time, end_time)
    const item = items.find((i) => i.id === _id)
    const updatedItem = {
      ...item,
      start_time,
      end_time,
      group: group ?? item.group,
      status: calculatedStatus,
    }
    console.log(updatedItem.email)
    const updatedItemList = items.map((i) => (i.id === _id ? updatedItem : i))
    setItems(updatedItemList)
    const docRef = doc(db, "calendar", _id)
    const data = {
      startDate: start_time.toDate(),
      endDate: end_time.toDate(),
      number: group ?? item.group,
      lastUpdate: serverTimestamp(),
      status: calculatedStatus,
    }
    await updateDoc(docRef, data)
    await sendReservationChange({
      name: updatedItem.title,
      email: updatedItem.email,
      check_in: updatedItem.start_time,
      check_out: updatedItem.end_time,
      room: updatedItem.group,
      access_key: updatedItem.id.substr(0, 6),
    })
    await addNotification({
      email: updatedItem.email,
      text: `Your reservation has been updated to room ${
        updatedItem.group
      } from ${updatedItem.start_time.format("DD.MM.YYYY")} to ${updatedItem.end_time.format(
        "DD.MM.YYYY"
      )}`,
    })
  }

  async function getEvents() {
    const start = moment().subtract(12, "months").startOf("day").toDate()
    const q = query(calendarRef, where("startDate", ">", start)).withConverter(
      formatedCalendarConverter
    )
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      setError("No matching documents")
      return null
    }
    const roomData = []
    querySnapshot.forEach((_room) => {
      roomData.push({
        ..._room.data(),
        id: _room.id,
      })
    })
    setItems(roomData)
    return roomData
  }

  async function getRooms() {
    const q = query(roomsRef, orderBy("number")).withConverter(roomNumberConverter)
    const querySnapshot = await getDocs(q)
    const roomData = []
    querySnapshot.forEach((_room) => {
      const group = {
        id: _room.data().id ?? 0,
        title: _room.data().title ?? "",
        rightTitle: _room.data().rightTitle ?? "ND",
        tip: _room.data().rightTitle ?? "ND",
        root: _room.data().id === 1,
      }
      roomData.push(group)
    })
    setGroups(roomData)
    return roomData
  }

  async function getCalendar() {
    setLoading(true)
    const events = await getEvents()
    const rooms = await getRooms()
    setLoading(false)
    return { events, rooms }
  }

  const filterItems = async (status, room, email) => {
    // if filter is empty, return
    if (!(status || room || email)) return
    const { events, rooms } = await getCalendar()
    let filteredItems = events
    if (room) {
      filteredItems = events.filter((i) => i.group === room)
      const filteredGroups = rooms.filter((i) => i.id === room)
      setGroups(filteredGroups)
    } else if (email) {
      filteredItems = events.filter((i) => i.email === email)
    }
    const filteredStatus = []
    status.forEach((s) => {
      const statusFilter = filteredItems.filter((i) => i.status === s)
      filteredStatus.push(...statusFilter)
    })
    if (status.size === 0 && !room && !email) {
      setItems(events)
      setGroups(rooms)
      return
    }

    setItems(status.size > 0 ? filteredStatus : filteredItems)
  }

  return {
    loading,
    groups,
    items,
    getCalendar,
    updateCalendarEntry,
    filterItems,
  }
}

export default useFormatedCalendar
