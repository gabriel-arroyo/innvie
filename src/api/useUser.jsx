import { useEffect, useState } from "react";
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

import { useAtom } from "jotai";
import loggedUser from "states/loggedUser";
import db from "../firebase";

function useUser() {
  const [loading, setLoading] = useState(false);
  const [insertError, setInsertError] = useState(false);
  const [data, setData] = useState([]);
  const collectionRef = collection(db, "users");
  const [currentUser, setCurrentUser] = useAtom(loggedUser);
  const [logged, setLogged] = useState(false);

  async function getAllUsers() {
    const q = query(collectionRef);
    setLoading(true);
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.log("no users found");
      return null;
    }
    const items = [];
    querySnapshot.forEach((user) => {
      items.push({ ...user.data(), id: user.id });
    });
    setData(items);
    setLoading(false);
    return items;
  }

  async function getUserByEmail(userEmail) {
    let q = query(collectionRef);
    if (userEmail) {
      q = query(collectionRef, where("email", "==", userEmail));
    }
    setLoading(true);
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.log("wrong email");
      return null;
    }
    let foundUser = {};
    querySnapshot.forEach((user) => {
      foundUser = { ...user.data(), id: user.id };
    });
    setData([foundUser]);
    setCurrentUser(foundUser);
    setLoading(false);
    return foundUser;
  }

  async function getUserById(userId) {
    const q = query(collectionRef, where("id", "==", userId));
    setLoading(true);
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.log("wrong id");
      return null;
    }
    let foundUser = {};
    querySnapshot.forEach((user) => {
      foundUser = { ...user.data(), id: user.id };
    });
    setData([foundUser]);
    setCurrentUser(foundUser);
    setLoading(false);
    return foundUser;
  }

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

  async function getAndUpdateUser(updatedUser) {
    let foundUser = {};
    if (!updatedUser) return;
    if (updatedUser.id) {
      foundUser = getUserById(updatedUser.id);
    } else if (updatedUser.email) {
      foundUser = getUserByEmail(updatedUser.email);
    }
    if (!foundUser) {
      foundUser = updatedUser;
    }
    const updatedUserWithTimestamp = {
      ...foundUser,
      ...updatedUser,
      lastUpdate: serverTimestamp(),
    };
    try {
      const docRef = doc(collectionRef, foundUser.id);
      updateDoc(docRef, updatedUserWithTimestamp);
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  }

  async function addOrUpdateUser(newUser) {
    const q = query(collectionRef, where("email", "==", newUser.email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // eslint-disable-next-line
      console.log("user already exists, updating");
      await updateUser(newUser);
      setInsertError(false);
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

  function saveLocalUser(selectedUser) {
    if (selectedUser) {
      localStorage.setItem("user", selectedUser);
      setCurrentUser(selectedUser);
    }
    setData([selectedUser]);
  }

  async function logout() {
    localStorage.removeItem("user");
    setData([]);
    setCurrentUser(null);
  }

  function getCurrentUser() {
    if (currentUser) {
      setLogged(true);
      return currentUser;
    }

    const item = JSON.parse(localStorage.getItem("user"));
    if (item) {
      setLogged(true);
      setCurrentUser(item);
      return item;
    }
    setLogged(false);
    return null;
  }

  useEffect(() => {
    getCurrentUser();
  }, []);
  return {
    loading,
    data,
    logged,
    currentUser,
    addUser,
    addOrUpdateUser,
    deleteUser,
    updateUser,
    getAndUpdateUser,
    deleteAllUsers,
    insertError,
    login,
    logout,
    getCurrentUser,
    getAllUsers,
    getUserByEmail,
    saveLocalUser,
    getUserById,
  };
}

export default useUser;
