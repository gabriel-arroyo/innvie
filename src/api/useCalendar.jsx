import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import db from "../firebase";
import useRoom from "./useRoom";

function useCalendar() {
  const [calendar, setCalendar] = useState([]);
  const [calendarError, setError] = useState(false);
  const collectionRef = collection(db, "calendar");
  const { roomsAvailable, getRoomsNotInArray } = useRoom();
  const [available, setAvailable] = useState(false);

  async function getSingle(field, operator, value) {
    setError(false);
    const q = query(collectionRef, where(field, operator, value));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      setError("No matching documents");
      return null;
    }
    let roomData = null;
    querySnapshot.forEach((room) => {
      roomData = { ...room.data(), id: room.id };
    });
    return roomData;
  }

  async function getMany(field, operator, value) {
    setError(false);
    let q = query(collectionRef);
    if (field && value && operator) {
      q = query(collectionRef, where(field, operator, value));
    }
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      setError("No matching documents");
      return null;
    }
    const roomData = [];
    querySnapshot.forEach((room) => {
      roomData.push({ ...room.data(), id: room.id });
    });
    return roomData;
  }

  function checkIntersection(range1, range2) {
    return range1.startDate < range2.endDate && range2.startDate < range1.endDate;
  }

  async function getAvailability(type, startDate, endDate) {
    const range = { startDate: new Date(startDate), endDate: new Date(endDate) };
    const results = [];
    const today = new Date();
    const q = query(collectionRef, where("type", "==", type), where("endDate", ">=", today));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((d) => {
      const dateRange = {
        ...d.data(),
        startDate: d.data().startDate.toDate(),
        endDate: d.data().endDate.toDate(),
      };
      if (checkIntersection(range, dateRange)) {
        results.push({
          ...d.data(),
          startDate: d.data().startDate.toDate(),
          endDate: d.data().endDate.toDate(),
        });
      }
    });
    const roomsfound = await getRoomsNotInArray(
      type,
      results.map((r) => r.room)
    );
    setAvailable(roomsfound.length > 0);
    return roomsfound;
  }

  async function getAvailableRoom(type, startDate, endDate) {
    const avail = await getAvailability(type, startDate, endDate);

    if (avail.length > 0) {
      return avail.sort((a, b) => a.number - b.number)[0];
    }
    return {};
  }

  async function getCalendar() {
    const cal = await getMany();
    if (cal) {
      setCalendar(cal);
    }
  }

  async function saveReservation(reservation) {
    const newReservationWithTimestamp = {
      ...reservation,
      lastUpdate: serverTimestamp(),
    };
    try {
      const docRef = doc(collectionRef);
      await setDoc(docRef, newReservationWithTimestamp);
    } catch (e) {
      // eslint-disable-next-line
      console.log("error:", e);
      setError(e);
      return false;
    }
    return true;
  }

  async function addReservation(room, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!room.number) {
      // eslint-disable-next-line no-console
      console.error("No room number");
      setError("No room number");
      return;
    }
    if (!room.type) {
      // eslint-disable-next-line no-console
      console.error("No room type");
      setError("No room type");
      return;
    }

    const reserved = await getAvailability(room.type, start, end);
    const found = reserved.find((r) => r.room === room.number);
    if (!found) {
      console.error("Room not available");
      setError("Room not available");
      return;
    }

    setError(false);
    const newReservationWithTimestamp = {
      type: room.type,
      startDate: start,
      endDate: end,
      room: room.number,
      lastUpdate: serverTimestamp(),
    };
    await saveReservation(newReservationWithTimestamp);
  }

  return {
    calendar,
    roomsAvailable,
    available,
    addReservation,
    getAvailability,
    getAvailableRoom,
    getCalendar,
    getMany,
    getSingle,
    calendarError,
  };
}

export default useCalendar;
