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

function useUser() {
  const [loading, setLoading] = useState(false);
  const [insertError, setInsertError] = useState(false);
  const [data, setData] = useState([]);
  const collectionRef = collection(db, "users");

  async function addUser(newUser) {
    const q = query(collectionRef, where("email", "==", newUser.email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // eslint-disable-next-line
      console.log("user already exists");
      setInsertError(true);
      return false;
    }

    setInsertError(false);

    const newUserWithTimestamp = { ...newUser, lastUpdate: serverTimestamp() };
    try {
      const docRef = doc(collectionRef, newUser.id);
      await setDoc(docRef, newUserWithTimestamp);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
      return false;
    }
    return true;
  }

  async function deleteUser(id) {
    try {
      const docRef = doc(collectionRef, id);
      await deleteDoc(docRef);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  }

  async function deleteAllUsers() {
    try {
      const q = query(collectionRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((user) => {
        const docRef = doc(collectionRef, user.id);
        deleteDoc(docRef);
      });
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  }

  async function updateUser(updatedUser) {
    const updatedUserWithTimestamp = { ...updatedUser, lastUpdate: serverTimestamp() };
    try {
      const docRef = doc(collectionRef, updatedUser.id);
      updateDoc(docRef, updatedUserWithTimestamp);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  }

  useEffect(() => {
    const q = query(collectionRef, where("name", "==", "test2"));
    setLoading(true);
    const unsub = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((user) => {
        items.push({ ...user.data(), id: user.id });
      });
      setData(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);
  return { loading, data, addUser, deleteUser, updateUser, deleteAllUsers, insertError };
}

export default useUser;
