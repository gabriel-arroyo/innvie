import PropTypes from "prop-types";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase";
import useRoom from "./useRoom";

function useCalendar({ type, startDate, endDate }) {
  const [calendar, setCalendar] = useState([]);
  const [calendarError, setError] = useState(false);
  const collectionRef = collection(db, "calendar");
  const { roomsAvailable, getRoomsNotInArray, updateRoomStatus } = useRoom();
  const [available, setAvailable] = useState(false);
  const [room, setRoom] = useState({});

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
    querySnapshot.forEach((_room) => {
      roomData = { ..._room.data(), id: _room.id };
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
    querySnapshot.forEach((_room) => {
      roomData.push({ ..._room.data(), id: _room.id });
    });
    return roomData;
  }

  function checkIntersection(range1, range2) {
    return range1.startDate < range2.endDate && range2.startDate < range1.endDate;
  }

  async function getAvailability(_type, _startDate, _endDate) {
    const range = {
      startDate: new Date(_startDate ?? startDate),
      endDate: new Date(_endDate ?? endDate),
    };
    const results = [];
    const today = new Date();
    const q = query(
      collectionRef,
      where("type", "==", _type ?? type),
      where("endDate", ">=", today)
    );
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
      _type ?? type,
      results.map((r) => r.room)
    );
    setAvailable(roomsfound.length > 0);
    return roomsfound;
  }

  async function getAvailableRoom(_type, _startDate, _endDate) {
    const avail = await getAvailability(_type, _startDate, _endDate);

    if (avail.length > 0) {
      const r = avail.sort((a, b) => a.number - b.number)[0];
      setRoom(r);
      return r;
    }
    return {};
  }

  async function getCalendar() {
    const cal = await getMany();
    if (cal) {
      setCalendar(cal);
    }
  }

  async function getReservationsByEmail(email) {
    const cal = await getMany("email", "==", email);
    if (cal) {
      setCalendar(cal);
    }
  }

  async function saveReservation(reservation) {
    let id = null;
    const newReservationWithTimestamp = {
      ...reservation,
      lastUpdate: serverTimestamp(),
    };
    try {
      const docRef = doc(collectionRef);
      await setDoc(docRef, newReservationWithTimestamp);
      id = docRef.id;
    } catch (e) {
      // eslint-disable-next-line
      console.log("error:", e);
      setError(e);
      return null;
    }
    return id;
  }

  async function addReservation(_email, _room, _startDate, _endDate) {
    // eslint-disable-next-line no-console
    console.log("reserving", _email, _room, _startDate, _endDate);
    let start = new Date();
    let end = new Date();
    try {
      start = new Date(`${_startDate}, 14:45:00`);
      end = new Date(`${_endDate}, 11:30:00`);
      if (start > end) {
        setError("Start date must be before end date");
        return null;
      }
    } catch (e) {
      setError("Invalid date format");
      return null;
    }

    if (!_room) {
      // eslint-disable-next-line no-console
      console.log("no room");
      setError("No room");
      return null;
    }

    if (!_room.number) {
      // eslint-disable-next-line no-console
      console.error("No room number");
      setError("No room number");
      return null;
    }
    if (!_room.type) {
      // eslint-disable-next-line no-console
      console.error("No room type");
      setError("No room type");
      return null;
    }

    setError(false);
    const newReservationWithTimestamp = {
      type: _room.type,
      startDate: start,
      endDate: end,
      room: _room.number,
      email: _email,
      lastUpdate: serverTimestamp(),
    };
    const id = await saveReservation(newReservationWithTimestamp);
    await updateRoomStatus(_room.number, "ocuppied");
    return id;
  }

  useEffect(() => {
    if (type && startDate && endDate) {
      getAvailableRoom(type, startDate, endDate);
    }
  }, []);

  return {
    room,
    calendar,
    roomsAvailable,
    available,
    addReservation,
    getReservationsByEmail,
    getAvailability,
    getAvailableRoom,
    getCalendar,
    getMany,
    getSingle,
    calendarError,
  };
}

useCalendar.defaultProps = {
  type: "null",
  startDate: "null",
  endDate: "null",
};

useCalendar.propTypes = {
  type: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

export default useCalendar;
