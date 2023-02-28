/* eslint-disable react/forbid-prop-types */
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import PropTypes from "prop-types"
// import {
//   collection,
//   doc,
//   getDocs,
//   query,
//   serverTimestamp,
//   setDoc,
//   where,
// } from "firebase/firestore";
import { useEffect, useState } from "react"
import spreadTypesToRooms from "tools/spreadTypesToRooms"
// import db from "../firebase";
// import useRoom from "./useRoom";
import { parseDate } from "tools/getDate"
import RoomHistoryButton from "pages/Innvie/Admin/Rooms/RoomHistoryButton"
import RoomTypeItem from "pages/Innvie/Admin/Rooms/RoomType"
import RoomMenu from "pages/Innvie/Admin/Rooms/RoomMenu"
import RoomId from "pages/Innvie/Admin/Rooms/RoomId"
import columns from "./tableColumns"
import db from "../firebase"
import calendarConverter from "./classCalendar"

function useTable({ rooms, types, setTab, updateRoom }) {
  const calendarRef = collection(db, "calendar")
  const [cols, setCols] = useState(columns)
  const [rows, setRows] = useState()

  async function getNextRelevantEvent(number) {
    const today = new Date()
    const q = query(
      calendarRef,
      where("number", "==", number),
      where("startDate", ">", today),
      orderBy("startDate", "asc"),
      limit(1)
    ).withConverter(calendarConverter)
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.log("no matching documents")
      return null
    }
    const roomData = []
    querySnapshot.forEach((room) => {
      roomData.push({ ...room.data(), id: room.id })
    })
    return roomData[0]
  }

  async function spredEventToRoom(room) {
    const event = await getNextRelevantEvent(room.number)
    return { ...room, ...event }
  }

  async function calculateRows() {
    const allRoomsWitTypes = spreadTypesToRooms(rooms, types)
    if (!allRoomsWitTypes?.length) return
    const updatedRooms = allRoomsWitTypes.map((room) => spredEventToRoom(room))
    Promise.all(updatedRooms)
      .then((results) => {
        const roomsWithEvents = allRoomsWitTypes.map((room, i) => ({ ...room, ...results[i] }))
        const calculatedRows = roomsWithEvents.map((r) => ({
          ID: <RoomId name={r.number} />,
          Type: <RoomTypeItem category={r.type} subCategory={r.category} />,
          Rooms: r.rooms ?? "",
          Queen: r.beds.queen ?? "",
          Full: r.beds.fill ?? "",
          Single: r.beds.single ?? "",
          Status: <RoomMenu room={r} updateRoom={updateRoom} />,
          Date_in: parseDate(r.startDate),
          Date_out: parseDate(r.endDate),
          Check_in: parseDate(r.checkin),
          Check_out: parseDate(r.checkout),
          User: r.first_name && r.last_name && `${r.first_name} ${r.last_name}`,
          Comments: r.comment,
          History: <RoomHistoryButton number={r.number} setTab={setTab} />,
        }))
        setRows(calculatedRows)
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
  }

  useEffect(() => {
    calculateRows()
  }, [rooms, types])

  return { cols, rows, setCols, setRows, calculateRows, getNextRelevantEvent }
}

useTable.propTypes = {
  rooms: PropTypes.array.isRequired,
  types: PropTypes.array.isRequired,
  setTab: PropTypes.func.isRequired,
  setHistoryFilter: PropTypes.func.isRequired,
  updateRoom: PropTypes.func.isRequired,
}

export default useTable
