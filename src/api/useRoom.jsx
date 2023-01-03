import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../firebase";

function useRoom(roomId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const collectionRef = collection(db, "rooms");

  async function addRoom(newRoom) {
    const q = query(collectionRef, where("number", "==", newRoom.number));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // eslint-disable-next-line
      console.log("room already exists");
      setError("Room already exists");
      return false;
    }

    setError(false);

    const newRoomWithTimestamp = { ...newRoom, lastUpdate: serverTimestamp() };
    try {
      const docRef = doc(collectionRef);
      await setDoc(docRef, newRoomWithTimestamp);
    } catch (e) {
      // eslint-disable-next-line
      console.log("error:", e);
      setError(e);
      return false;
    }
    return true;
  }

  async function deleteRoom(id) {
    setError(false);
    try {
      const docRef = doc(collectionRef, id);
      await deleteDoc(docRef);
    } catch (e) {
      // eslint-disable-next-line
      console.log("error:", e);
      setError(e);
    }
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
      console.log("error:", e);
      setError(e);
    }
  }

  async function updateRoom(updatedRoom) {
    setError(false);
    const updatedRoomWithTimestamp = { ...updatedRoom, lastUpdate: serverTimestamp() };
    try {
      const docRef = doc(collectionRef, updatedRoom.id);
      updateDoc(docRef, updatedRoomWithTimestamp);
    } catch (e) {
      // eslint-disable-next-line
      console.log("error:", e);
      setError(e);
    }
  }

  async function getRoomByNumber(roomNumber) {
    setError(false);
    const q = query(collectionRef, where("number", "==", roomNumber));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.log("no matching documents");
      return null;
    }
    let roomData = null;
    querySnapshot.forEach((room) => {
      roomData = room.data();
    });
    return roomData;
  }

  useEffect(() => {
    setError(false);
    let q = query(collectionRef);
    if (roomId) {
      q = query(collectionRef, where("id", "==", roomId));
    }
    setLoading(true);
    const unsub = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((room) => {
        items.push({ ...room.data(), id: room.id });
      });
      setData(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);
  return {
    loading,
    data,
    addRoom,
    deleteRoom,
    updateRoom,
    getRoomByNumber,
    deleteAllRooms,
    error,
  };
}

export default useRoom;
