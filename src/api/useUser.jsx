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

import { useAtom } from "jotai";
import loggedUser from "states/loggedUser";
import db from "../firebase";

function useUser(email) {
  const [loading, setLoading] = useState(false);
  const [insertError, setInsertError] = useState(false);
  const [data, setData] = useState([]);
  const collectionRef = collection(db, "users");
  const [currentUser, setCurrentUser] = useAtom(loggedUser);

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
      querySnapshot.forEach((userData) => {
        const docRef = doc(collectionRef, userData.id);
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

  async function login(myemail, password) {
    const q = query(
      collectionRef,
      where("email", "==", myemail),
      where("password", "==", password)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.log("wrong email or password");
      return false;
    }
    localStorage.setItem("user", JSON.stringify(querySnapshot.docs[0].data()));
    setCurrentUser(querySnapshot.docs[0].data());
    return true;
  }

  async function logout() {
    localStorage.removeItem("user");
    setData(null);
    setCurrentUser(null);
  }

  function getCurrentUser() {
    if (currentUser) {
      return currentUser;
    }

    const item = JSON.parse(localStorage.getItem("user"));
    if (item) {
      setCurrentUser(item);
      return item;
    }
    return null;
  }

  useEffect(() => {
    let q = query(collectionRef);
    if (email) {
      q = query(collectionRef, where("email", "==", email));
    }
    setLoading(true);
    const unsub = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((user) => {
        items.push({ ...user.data(), id: user.id });
      });
      setData(items);
      if (email) {
        setCurrentUser(items);
      }
      if (!email) {
        const item = JSON.parse(localStorage.getItem("user"));
        if (item) {
          setCurrentUser(item);
          setData(item);
        }
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);
  return {
    loading,
    data,
    addUser,
    deleteUser,
    updateUser,
    deleteAllUsers,
    insertError,
    login,
    logout,
    getCurrentUser,
  };
}

export default useUser;
