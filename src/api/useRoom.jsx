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
} from "firebase/firestore";
import { useState } from "react";
import db from "../firebase";
import useHistory from "./useHistory";

function useRoom() {
  const { addAction } = useHistory();
  const [loading, setLoading] = useState(false);
  const [roomError, setError] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [roomsByType, setRoomsByType] = useState([]);
  const [roomsAvailable, setRoomsAvailable] = useState([]);
  const collectionRef = collection(db, "rooms");

  async function getRoomsByType(roomType) {
    if (!roomType) return null;
    const q = query(collectionRef, where("type", "==", roomType));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.error("no matching documents");
      setRoomsByType([]);
      return null;
    }
    const roomsData = [];
    querySnapshot.forEach((room) => {
      roomsData.push({ ...room.data(), ...roomType });
    });
    setRoomsByType(roomsData);
    return roomsData;
  }

  async function getRoomsByTypesArray(array) {
    setError(false);
    setLoading(true);
    const roomsData = [];
    const q = query(collectionRef, where("type", "in", array));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.error("no matching documents");
      setRoomsByType([]);
      setLoading(false);
      return null;
    }
    querySnapshot.forEach((room) => {
      roomsData.push({ ...room.data(), id: room.id });
    });
    setRoomsByType(roomsData);
    setLoading(false);
    return roomsData;
  }

  async function getRoomsNotInArray(type, array) {
    setError(false);
    setLoading(true);
    const roomsData = [];
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.error("no matching documents");
      setRoomsAvailable([]);
      setLoading(false);
      return null;
    }
    querySnapshot.forEach((room) => {
      if (room.data().type === type && !array.includes(room.data().number)) {
        roomsData.push({ ...room.data(), id: room.id });
      }
    });
    setRoomsAvailable(roomsData);
    setLoading(false);
    return roomsData;
  }

  async function addRoom(newRoom) {
    const q = query(collectionRef, where("number", "==", newRoom.number));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // eslint-disable-next-line
      console.error("room already exists");
      setError("Room already exists");
      return false;
    }

    setError(false);

    const newRoomWithTimestamp = { ...newRoom, lastUpdate: serverTimestamp(), status: "available" };
    try {
      const docRef = doc(collectionRef);
      await setDoc(docRef, newRoomWithTimestamp);
      await getRoomsByType(newRoom.type);
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
      setError(e);
      return false;
    }
    addAction("newRoom", newRoom);
    return true;
  }

  async function deleteRoom(id) {
    setError(false);
    try {
      const docRef = doc(collectionRef, id);
      await deleteDoc(docRef);
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
      setError(e);
    }
    addAction("deleteRoom", { number: id });
  }

  async function deleteAllRooms() {
    setError(false);
    try {
      const q = query(collectionRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((roomData) => {
        const docRef = doc(collectionRef, roomData.id);
        deleteDoc(docRef);
      });
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
      setError(e);
    }
    addAction("deleteRoom", { number: "all" });
  }

  async function getRoomByNumber(roomNumber) {
    setError(false);
    const q = query(collectionRef, where("number", "==", roomNumber));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.error("no matching documents");
      return null;
    }
    let roomData = null;
    querySnapshot.forEach((room) => {
      roomData = { ...room.data(), id: room.id };
    });
    return roomData;
  }

  async function updateRoom(updatedRoom) {
    setError(false);
    setLoading(true);
    const roomToUpdate = await getRoomByNumber(updatedRoom.number);
    if (!roomToUpdate) {
      setError("Room not found");
      setLoading(false);
      return;
    }
    const updatedRoomWithTimestamp = {
      ...roomToUpdate,
      ...updatedRoom,
      lastUpdate: serverTimestamp(),
    };
    try {
      const docRef = doc(collectionRef, roomToUpdate.id);
      updateDoc(docRef, updatedRoomWithTimestamp);
    } catch (e) {
      // eslint-disable-next-line
      console.error("error:", e);
      setError(e);
    }
    addAction("updateRoom", updatedRoom);
    setLoading(false);
  }

  async function updateRoomStatus(number, status) {
    setError(false);
    setLoading(true);
    const roomToUpdate = await getRoomByNumber(number);
    if (!roomToUpdate) {
      setError("Room not found");
      setLoading(false);
      return;
    }
    const updatedRoomWithTimestamp = {
      ...roomToUpdate,
      status,
      lastUpdate: serverTimestamp(),
    };
    try {
      const docRef = doc(collectionRef, roomToUpdate.id);
      updateDoc(docRef, updatedRoomWithTimestamp);
    } catch (e) {
      // eslint-disable-next-line
      console.error("error:", e);
      setError(e);
    }
    addAction("updateRoom", updatedRoomWithTimestamp);
    setLoading(false);
  }

  async function deleteRoomByNumber(roomNumber) {
    setError(false);
    try {
      const q = query(collectionRef, where("number", "==", roomNumber));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((roomData) => {
        const docRef = doc(collectionRef, roomData.id);
        deleteDoc(docRef);
      });
    } catch (e) {
      // eslint-disable-next-line
      console.error("error:", e);
      setError(e);
    }
    addAction("deleteRoom", { number: roomNumber });
  }

  async function deleteRoomByType(roomType) {
    setError(false);
    try {
      const q = query(collectionRef, where("type", "==", roomType));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((roomData) => {
        const docRef = doc(collectionRef, roomData.id);
        deleteDoc(docRef);
      });
    } catch (e) {
      // eslint-disable-next-line
      console.error("error:", e);
      setError(e);
    }
    addAction("deleteRoom", { type: roomType });
  }

  async function getRooms() {
    setError(false);
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.error("no matching documents");
      setRooms([]);
      setLoading(false);
      return null;
    }
    const roomsData = [];
    querySnapshot.forEach((room) => {
      roomsData.push({ ...room.data(), id: room.id });
    });
    setRooms(roomsData);
    return roomsData;
  }

  return {
    loading,
    rooms,
    roomsByType,
    roomsAvailable,
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
  };
}

export default useRoom;
