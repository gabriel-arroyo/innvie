import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase";

function useHistory(roomId) {
  const [loading, setLoading] = useState(false);
  const [roomError, setError] = useState(false);
  const [history, setHistory] = useState([]);
  const collectionRef = collection(db, "history");

  function createActionName(action, room) {
    const statusName = room.status ?? "available";
    let status = "";
    if (room.status) {
      status += ` to ${statusName}`;
    }
    const commentsOptions = {
      checkIn: `Check in`,
      checkOut: `Check out`,
      clean: `Clean room`,
      dirty: `Dirty room`,
      maintenance: `Maintenance room`,
      newRoom: `New room created`,
      newType: `New type created`,
      deleteRoom: `Room deleted`,
      deleteType: `Type deleted`,
      updateRoom: `Room updated${status}`,
      updateType: `Type updated`,
    };
    return commentsOptions[action];
  }

  async function addAction(action, room) {
    setError(false);
    const actionId = action.includes("Type") ? room.type : room.number;
    const acitonWithTimestamp = {
      action: createActionName(action, room),
      lastUpdate: serverTimestamp(),
      actionId,
      number: room.number ?? "",
      type: room.type ?? "",
      category: room.category ?? "",
    };
    try {
      const docRef = doc(collectionRef);
      await setDoc(docRef, acitonWithTimestamp);
    } catch (e) {
      // eslint-disable-next-line
      console.log("error:", e);
      setError(e);
      return false;
    }
    return true;
  }

  async function deletePast() {
    setError(false);
    const monthsAgo = new Date();
    monthsAgo.setMonth(monthsAgo.getMonth() - 3);
    const date = Timestamp.fromDate(monthsAgo);
    try {
      const q = query(collectionRef, where("lastUpdate", "<", date));
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
      console.log("error:", e);
      setError(e);
    }
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
      console.log("error:", e);
      setError(e);
    }
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
      console.log("error:", e);
      setError(e);
    }
  }

  useEffect(() => {
    setError(false);
    let q = query(collectionRef);
    if (roomId && roomId !== "all") {
      q = query(collectionRef, where("number", "==", roomId));
    }
    setLoading(true);
    const unsub = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((room) => {
        items.push({ ...room.data(), id: room.id });
        console.log(room.id, " => ", room.data());
      });
      setHistory(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);
  return {
    loading,
    history,
    addAction,
    deletePast,
    deleteRoomByNumber,
    deleteRoomByType,
    updateRoom,
    getRoomByNumber,
    roomError,
  };
}

export default useHistory;
