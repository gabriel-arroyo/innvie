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
import db from "../firebase"
import useHistory from "./useHistory"

function useRoom() {
  const { addAction } = useHistory()
  const [loading, setLoading] = useState(false)
  const [roomError, setError] = useState(false)
  const [rooms, setRooms] = useState([])
  const [roomsByType, setRoomsByType] = useState([])
  const [roomsAvailable, setRoomsAvailable] = useState([])
  const collectionRef = collection(db, "rooms")
  const [nextRoomNumber, setNextRoomNumber] = useState(1)

  function getMinNotUsed(array) {
    const sortedArray = array.sort((a, b) => a - b)
    let min = 1
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < sortedArray.length; i++) {
      if (sortedArray[i] > min) {
        break
      }
      min = sortedArray[i] + 1
    }
    return min
  }

  async function getNextRoomNumber() {
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      console.log("no data!")
      return 1
    }
    const numbers = []
    let minNumber = 1
    querySnapshot.forEach((room) => {
      numbers.push(room.data().number)
    })
    console.log("🚀 ~ file: useRoom.jsx:49 ~ querySnapshot.forEach ~ numbers", numbers)
    minNumber = getMinNotUsed(numbers) > 0 ? getMinNotUsed(numbers) : 1
    setNextRoomNumber(minNumber)
    return minNumber
  }

  async function getRoomsByType(roomType) {
    if (!roomType) return null
    const q = query(collectionRef, where("type", "==", roomType))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.error("no matching documents")
      setRoomsByType([])
      return null
    }
    const roomsData = []
    querySnapshot.forEach((room) => {
      roomsData.push({ ...room.data(), ...roomType })
    })
    setRoomsByType(roomsData)
    return roomsData
  }

  async function getRoomsByTypesArray(array) {
    setError(false)
    setLoading(true)
    const roomsData = []
    const q = query(collectionRef, where("type", "in", array))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.error("no matching documents")
      setRoomsByType([])
      setLoading(false)
      return null
    }
    querySnapshot.forEach((room) => {
      roomsData.push({ ...room.data(), id: room.id })
    })
    setRoomsByType(roomsData)
    setLoading(false)
    return roomsData
  }

  async function getRoomsNotInArray(_type, array) {
    const type = _type?.type || _type
    setError(false)
    setLoading(true)
    const roomsData = []
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.error("no matching documents")
      setRoomsAvailable([])
      setLoading(false)
      return null
    }
    querySnapshot.forEach((room) => {
      const thisRoom = room.data()
      if (thisRoom.type === type && !array.includes(thisRoom.number)) {
        roomsData.push({ ...thisRoom, id: room.id })
      }
    })
    setRoomsAvailable(roomsData)
    setLoading(false)
    return roomsData
  }

  async function addRoom(newRoom) {
    const q = query(collectionRef, where("number", "==", newRoom.number))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      // eslint-disable-next-line
      console.error("room already exists")
      setError("Room already exists")
      return false
    }

    setError(false)

    const newRoomWithTimestamp = { ...newRoom, lastUpdate: serverTimestamp(), status: "available" }
    try {
      const docRef = doc(collectionRef)
      await setDoc(docRef, newRoomWithTimestamp)
      await getRoomsByType(newRoom.type)
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
      setError(e)
      return false
    }
    addAction({ action: "newRoom", room: newRoom })
    return true
  }

  async function deleteRoom(id) {
    setError(false)
    try {
      const docRef = doc(collectionRef, id)
      await deleteDoc(docRef)
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
      setError(e)
    }
    addAction({ action: "deleteRoom", room: { number: id } })
  }

  async function deleteAllRooms() {
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
    addAction({ action: "deleteRoom", room: { number: "all" } })
  }

  async function getRoomByNumber(roomNumber) {
    setError(false)
    const q = query(collectionRef, where("number", "==", roomNumber))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.error("no matching documents")
      return null
    }
    let roomData = null
    querySnapshot.forEach((room) => {
      roomData = { ...room.data(), id: room.id }
    })
    return roomData
  }

  async function updateRoom(updatedRoom, admin = false) {
    setError(false)
    setLoading(true)
    const roomToUpdate = await getRoomByNumber(updatedRoom.number)
    if (!roomToUpdate) {
      setError("Room not found")
      setLoading(false)
      return
    }
    const updatedRoomWithTimestamp = {
      ...roomToUpdate,
      ...updatedRoom,
      lastUpdate: serverTimestamp(),
    }
    try {
      const docRef = doc(collectionRef, roomToUpdate.id)
      updateDoc(docRef, updatedRoomWithTimestamp)
    } catch (e) {
      // eslint-disable-next-line
      console.error("error:", e)
      setError(e)
    }
    addAction({ action: "updateRoom", room: updatedRoom, admin })
    setLoading(false)
  }

  async function updateRoomStatus(number, status) {
    setError(false)
    setLoading(true)
    const roomToUpdate = await getRoomByNumber(number)
    if (!roomToUpdate) {
      setError("Room not found")
      setLoading(false)
      return
    }
    const updatedRoomWithTimestamp = {
      ...roomToUpdate,
      status,
      lastUpdate: serverTimestamp(),
    }
    try {
      const docRef = doc(collectionRef, roomToUpdate.id)
      updateDoc(docRef, updatedRoomWithTimestamp)
    } catch (e) {
      // eslint-disable-next-line
      console.error("error:", e)
      setError(e)
    }
    addAction({ action: "updateRoom", room: updatedRoomWithTimestamp })
    setLoading(false)
  }

  async function deleteRoomByNumber(roomNumber) {
    setError(false)
    try {
      const q = query(collectionRef, where("number", "==", roomNumber))
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
    addAction({ action: "deleteRoom", room: { number: roomNumber } })
  }

  async function deleteRoomByType(roomType) {
    setError(false)
    try {
      const q = query(collectionRef, where("type", "==", roomType))
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
    addAction({ action: "deleteRoom", room: { type: roomType } })
  }

  async function getRooms() {
    setError(false)
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.error("no matching documents")
      setRooms([])
      setLoading(false)
      return null
    }
    const roomsData = []
    querySnapshot.forEach((room) => {
      roomsData.push({ ...room.data(), id: room.id })
    })
    setRooms(roomsData)
    return roomsData
  }

  useEffect(() => {
    getNextRoomNumber()
  }, [])

  return {
    loading,
    rooms,
    roomsByType,
    nextRoomNumber,
    roomsAvailable,
    getNextRoomNumber,
    addRoom,
    deleteRoom,
    getRooms,
    deleteRoomByNumber,
    getRoomsByTypesArray,
    getRoomsNotInArray,
    deleteRoomByType,
    updateRoom,
    updateRoomStatus,
    getRoomByNumber,
    getRoomsByType,
    deleteAllRooms,
    roomError,
  }
}

export default useRoom
