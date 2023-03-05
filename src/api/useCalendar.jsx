/* eslint-disable camelcase */
import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import {
  collection,
  doc,
  documentId,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore"
import roundTo from "tools/round"
import moment from "moment/moment"
import db from "../firebase"
import useRoom from "./useRoom"
import useUser from "./useUser"
import { sendReservationChange } from "./mail"
import useNotifications from "./useNotifications"
import useType from "./useType"

function useCalendar({ type, startDate, endDate }) {
  const [calendar, setCalendar] = useState([])
  const [calendarError, setError] = useState(false)
  const collectionRef = collection(db, "calendar")
  const { roomsAvailable, getRoomsNotInArray, updateRoomStatus } = useRoom()
  const { getUserByEmail } = useUser()
  const [available, setAvailable] = useState(false)
  const [room, setRoom] = useState({})
  const [typesNames, setTypesNames] = useState([])
  const { getRooms } = useRoom()
  const [ocupancy, setOcupancy] = useState(0)
  const { addNotification } = useNotifications()
  const defaultRoom = {
    type: "",
    accessories: ["microwave", "desk", "tv", "dish", "wifi", "minifridge", "fullbath"],
    beds: { full: 0, queen: 0 },
    photos: [],
    price: 0,
    category: "Habitación",
  }
  const { getAll } = useType(defaultRoom)

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

  function checkIntersection(range1, range2) {
    return range1.startDate < range2.endDate && range2.startDate < range1.endDate
  }

  async function getOcupancy() {
    const rooms = await getRooms()
    const today = new Date()
    const q = query(collectionRef, where("endDate", ">=", today))
    const querySnapshot = await getDocs(q)
    const ocup = []
    querySnapshot.forEach((d) => {
      const dateRange = {
        ...d.data(),
        startDate: d.data().startDate.toDate(),
        endDate: d.data().endDate.toDate(),
      }
      ocup.push(dateRange)
    })
    if (ocup.length === 0) return 0
    const started = ocup.filter((o) => o.startDate <= today)
    const percentage = roundTo((started.length / rooms.length) * 100)
    setOcupancy(percentage)
    return percentage
  }

  async function getRoomAvailability(_room, _startDate, _endDate, _id = null) {
    const range = {
      startDate: new Date(_startDate ?? startDate),
      endDate: new Date(_endDate ?? endDate),
    }
    const results = []
    const today = new Date()
    let q = query(collectionRef, where("number", "==", _room), where("endDate", ">=", today))
    if (_id) {
      q = query(
        collectionRef,
        where("number", "==", _room),
        where("endDate", ">=", today),
        where(documentId(), "!=", _id)
      )
    }
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((d) => {
      const dateRange = {
        ...d.data(),
        startDate: d.data().startDate.toDate(),
        endDate: d.data().endDate.toDate(),
      }
      if (checkIntersection(range, dateRange)) {
        results.push({
          ...d.data(),
          startDate: d.data().startDate.toDate(),
          endDate: d.data().endDate.toDate(),
        })
      }
    })
    const found = results.find((r) => r.room === _room).length > 0
    setAvailable(!found)
    return !found
  }

  async function getAvailableTypes(_startDate, _endDate, _default) {
    const range = {
      startDate: new Date(_startDate ?? startDate),
      endDate: new Date(_endDate ?? endDate),
    }
    const results = []
    const today = new Date()
    const q = query(collectionRef, where("endDate", ">=", today))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((d) => {
      const dateRange = {
        ...d.data(),
        startDate: d.data().startDate.toDate(),
        endDate: d.data().endDate.toDate(),
      }
      if (checkIntersection(range, dateRange)) {
        results.push({
          ...d.data(),
          startDate: d.data().startDate.toDate(),
          endDate: d.data().endDate.toDate(),
        })
      }
    })
    const types = results.map((r) => r.type)
    const unique = [...new Set(types)]
    const typesList = await getAll()
    const availableTypes = typesList.filter((t) => !unique.includes(t.type))
    const typeNames = availableTypes.map((t) => t.type)
    if (!typeNames.includes(_default)) {
      typeNames.push(_default)
    }
    setTypesNames(typeNames)
    return typeNames
  }

  async function getAvailability(_type, _startDate, _endDate, currentId = null) {
    const typeString = _type?.type || _type
    const range = {
      startDate: new Date(_startDate ?? startDate),
      endDate: new Date(_endDate ?? endDate),
    }
    const results = []
    const today = new Date()
    const q = query(collectionRef, where("type", "==", typeString), where("endDate", ">=", today))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((d) => {
      const dateRange = {
        ...d.data(),
        startDate: d.data().startDate.toDate(),
        endDate: d.data().endDate.toDate(),
      }
      if (checkIntersection(range, dateRange)) {
        results.push({
          ...d.data(),
          id: d.id,
          startDate: d.data().startDate.toDate(),
          endDate: d.data().endDate.toDate(),
        })
      }
    })
    if (currentId) {
      results.pop((r) => r.id === currentId)
    }

    const roomsfound = await getRoomsNotInArray(
      typeString,
      results.map((r) => r.number)
    )
    setAvailable(roomsfound.length > 0)
    return roomsfound
  }

  async function getAvailableRoom(_type, _startDate, _endDate, currentId = null) {
    const avail = await getAvailability(_type, _startDate, _endDate, currentId)

    if (avail.length > 0) {
      const r = avail.sort((a, b) => a.number - b.number)[0]
      setRoom(r)
      return r
    }
    return {}
  }

  async function getCalendar() {
    const cal = await getMany()
    if (cal) {
      setCalendar(cal)
    }
    return cal
  }

  async function getReservationsByEmail(email) {
    const cal = await getMany("email", "==", email)
    if (cal) {
      setCalendar(cal)
    }
  }

  async function saveReservation(reservation) {
    let id = null
    let newReservationWithTimestamp = {
      ...reservation,
      lastUpdate: serverTimestamp(),
    }
    const hasPassed = moment(reservation.startDate).isBefore(moment())
    const hours = Math.abs(moment().diff(moment(reservation.startDate), "hours"))
    if (hasPassed || hours < 24) {
      newReservationWithTimestamp = {
        ...newReservationWithTimestamp,
        checkin: moment().toDate(),
      }
    }
    try {
      const docRef = doc(collectionRef)
      await setDoc(docRef, newReservationWithTimestamp)
      id = docRef.id
    } catch (e) {
      // eslint-disable-next-line
      console.log("error:", e)
      setError(e)
      return null
    }
    return id
  }

  async function addReservation(_email, _room, _startDate, _endDate, _price, _adults, _kids) {
    // eslint-disable-next-line no-console
    console.log("reserving", _email, _room, _startDate, _endDate)
    let start = moment().toDate()
    let end = moment().toDate()
    try {
      start = moment(_startDate).set({ hour: 15 }).toDate()
      end = moment(_endDate).set({ hour: 11, minute: 30 }).toDate()
      if (start > end) {
        setError("Start date must be before end date")
        return null
      }
    } catch (e) {
      setError("Invalid date format")
      return null
    }

    if (!_room || Object.keys(_room).length === 0 || Array.isArray(_room)) {
      // eslint-disable-next-line no-console
      console.log("no room")
      setError("No room")
      return null
    }

    if (!_room.number) {
      // eslint-disable-next-line no-console
      console.error("No room number")
      setError("No room number")
      return null
    }
    if (!_room.type) {
      // eslint-disable-next-line no-console
      console.error("No room type")
      setError("No room type")
      return null
    }

    const foundUser = await getUserByEmail(_email)

    setError(false)
    const newReservationWithTimestamp = {
      type: _room.type,
      startDate: start,
      endDate: end,
      number: _room.number,
      email: _email,
      price: _price,
      first_name: foundUser.first_name,
      last_name: foundUser.last_name,
      lastUpdate: serverTimestamp(),
    }
    if (_adults) {
      newReservationWithTimestamp.adults = _adults
    }
    if (_kids) {
      newReservationWithTimestamp.kids = _kids
    }
    const id = await saveReservation(newReservationWithTimestamp)
    await updateRoomStatus({ room: _room.number, status: "occupied" })
    return id
  }

  async function updateCalendarEntry(_id, _startDate, _endDate, number, status) {
    let foundCalendar = calendar
    if (calendar.length === 0) {
      foundCalendar = await getCalendar()
    }
    const start_time = moment(_startDate).set("hour", 15).set("minute", 0)
    const end_time = moment(_endDate).set("hour", 11).set("minute", 30)
    const item = foundCalendar.find((i) => i.id === _id)
    const updatedItem = {
      ...item,
      start_time,
      end_time,
      number: number ?? item.number,
      status,
    }

    console.log(updatedItem.email)
    const updatedItemList = foundCalendar.map((i) => (i.id === _id ? updatedItem : i))
    setCalendar(updatedItemList)
    const docRef = doc(db, "calendar", _id)
    const data = {
      startDate: start_time.toDate(),
      endDate: end_time.toDate(),
      number: number ?? item.number,
      lastUpdate: serverTimestamp(),
      status,
      type: item.type,
    }
    await updateDoc(docRef, data)
    await sendReservationChange({
      name: updatedItem.title,
      email: updatedItem.email,
      check_in: updatedItem.start_time,
      check_out: updatedItem.end_time,
      room: updatedItem.group,
      access_key: updatedItem.id.substr(0, 6),
      type: updatedItem.type,
    })
    await addNotification({
      email: updatedItem.email,
      text: `Your reservation ${_id.substring(0, 6)} has been updated to room ${
        updatedItem.group
      } from ${updatedItem.start_time.format("DD.MM.YYYY")} to ${updatedItem.end_time.format(
        "DD.MM.YYYY"
      )}`,
    })
  }

  useEffect(() => {
    if (type && startDate && endDate) {
      getAvailableRoom(type, startDate, endDate)
    }
  }, [])

  return {
    room,
    calendar,
    roomsAvailable,
    available,
    typesNames,
    addReservation,
    updateCalendarEntry,
    getReservationsByEmail,
    getAvailableTypes,
    getAvailability,
    getRoomAvailability,
    getAvailableRoom,
    getCalendar,
    getMany,
    getSingle,
    getOcupancy,
    ocupancy,
    calendarError,
  }
}

useCalendar.defaultProps = {
  type: "null",
  startDate: "null",
  endDate: "null",
}

useCalendar.propTypes = {
  type: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
}

export default useCalendar
