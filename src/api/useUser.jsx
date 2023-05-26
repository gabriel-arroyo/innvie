import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
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

import { useAtom } from "jotai"
import loggedUser from "states/loggedUser"
import db from "../firebase"

function useUser() {
  const [loading, setLoading] = useState(false)
  const [insertError, setInsertError] = useState(false)
  const [data, setData] = useState([])
  const collectionRef = collection(db, "users")
  const [currentUser, setCurrentUser] = useAtom(loggedUser)
  const [logged, setLogged] = useState(false)
  const [mailExists, setMailExists] = useState(false)
  const [checkedIn, setCheckedIn] = useState(false)

  async function getAllUsers() {
    const q = query(collectionRef)
    setLoading(true)
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.log("no users found")
      return null
    }
    const items = []
    querySnapshot.forEach((user) => {
      items.push({ ...user.data(), id: user.id })
    })
    setData(items)
    setLoading(false)
    return items
  }

  async function getUserByEmail(userEmail) {
    let q = query(collectionRef)
    if (userEmail) {
      q = query(collectionRef, where("email", "==", userEmail))
    }
    setLoading(true)
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.log("wrong email")
      return null
    }
    let foundUser = {}
    querySnapshot.forEach((user) => {
      foundUser = { ...user.data(), id: user.id }
    })
    setData([foundUser])
    setLoading(false)
    return foundUser
  }

  async function getUserById(userId) {
    const q = query(collectionRef, where("id", "==", userId))
    setLoading(true)
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.log("wrong id")
      return null
    }
    let foundUser = {}
    querySnapshot.forEach((user) => {
      foundUser = { ...user.data(), id: user.id }
    })
    setData([foundUser])
    setCurrentUser(foundUser)
    setLoading(false)
    return foundUser
  }

  async function addUser(newUser) {
    const q = query(collectionRef, where("email", "==", newUser.email))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      // eslint-disable-next-line
      console.log("user already exists")
      setInsertError(true)
      return false
    }

    setInsertError(false)

    const newUserWithTimestamp = { ...newUser, lastUpdate: serverTimestamp() }
    try {
      const docRef = doc(collectionRef, newUser.id)
      await setDoc(docRef, newUserWithTimestamp)
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return false
    }
    return true
  }

  async function checkEmail(userEmail) {
    const q = query(collectionRef, where("email", "==", userEmail))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.log("wrong email")
      setMailExists(false)
      return false
    }
    console.log(`email ${userEmail} exists`)
    setMailExists(true)
    return true
  }

  async function updateUser(updatedUser) {
    const updatedUserWithTimestamp = { ...updatedUser, lastUpdate: serverTimestamp() }
    try {
      const docRef = doc(collectionRef, updatedUser.id)
      await updateDoc(docRef, updatedUserWithTimestamp)
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  }

  async function updateLoggedUser(updatedUser) {
    const updatedUserWithTimestamp = { ...updatedUser, lastUpdate: serverTimestamp() }
    try {
      const docRef = doc(collectionRef, updatedUser.id)
      await updateDoc(docRef, updatedUserWithTimestamp)
      setCurrentUser(updatedUserWithTimestamp)
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  }

  async function getAndUpdateUser(updatedUser) {
    console.log("updating user", updatedUser)
    let foundUser = {}
    if (!updatedUser) return
    if (updatedUser.id) {
      foundUser = await getUserById(updatedUser.id)
      console.log("found user with id:", foundUser)
      if (!foundUser) {
        foundUser = await getUserByEmail(updatedUser.email)
        console.log("found user with email", foundUser)
      }
    } else if (updatedUser.email) {
      foundUser = await getUserByEmail(updatedUser.email)
      console.log("found user with email", foundUser)
    }
    if (!foundUser) {
      console.log("No found user")
      foundUser = { ...updatedUser, id: uuidv4() }
    }
    const updatedUserWithTimestamp = {
      ...foundUser,
      ...updatedUser,
      lastUpdate: serverTimestamp(),
    }
    console.log(
      "🚀 ~ file: useUser.jsx:137 ~ getAndUpdateUser ~ updatedUserWithTimestamp",
      updatedUserWithTimestamp
    )
    try {
      const docRef = doc(collectionRef, foundUser.id)
      await updateDoc(docRef, updatedUserWithTimestamp)
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  }

  async function addOrUpdateUser(newUser) {
    const q = query(collectionRef, where("email", "==", newUser.email))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      // eslint-disable-next-line
      console.log("user already exists, updating")
      await updateUser(newUser)
      setInsertError(false)
      return false
    }

    setInsertError(false)

    const newUserWithTimestamp = { ...newUser, lastUpdate: serverTimestamp() }
    try {
      const docRef = doc(collectionRef, newUser.id)
      await setDoc(docRef, newUserWithTimestamp)
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      return false
    }
    return true
  }

  async function deleteUser(id) {
    try {
      const docRef = doc(collectionRef, id)
      await deleteDoc(docRef)
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  }

  async function deleteAllUsers() {
    try {
      const q = query(collectionRef)
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((userData) => {
        const docRef = doc(collectionRef, userData.id)
        deleteDoc(docRef)
      })
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
    }
  }

  async function checkPassword(email, password) {
    const q = query(collectionRef, where("email", "==", email), where("password", "==", password))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      // eslint-disable-next-line
      console.log("wrong email or password")
      return null
    }
    return querySnapshot.docs[0].data()
  }

  async function login(myemail, password) {
    const result = await checkPassword(myemail, password)
    if (!result) return false
    localStorage.setItem("user", JSON.stringify(result))
    setCurrentUser(result)
    return true
  }

  function saveLocalUser(selectedUser) {
    if (selectedUser) {
      localStorage.setItem("user", selectedUser)
      setCurrentUser(selectedUser)
    }
    setData([selectedUser])
  }

  async function logout() {
    localStorage.removeItem("user")
    setData([])
    setCurrentUser(null)
  }

  function getCurrentUser() {
    if (currentUser) {
      setLogged(true)
      setCheckedIn(Boolean(currentUser.checkin))
      return currentUser
    }

    const item = JSON.parse(localStorage.getItem("user"))
    if (item) {
      setLogged(true)
      setCurrentUser(item)
      setCheckedIn(Boolean(item.checkin) && !item.checkout)
      return item
    }
    setCheckedIn(false)
    setLogged(false)
    return null
  }

  async function checkinUser() {
    const user = getCurrentUser()
    if (!user) return
    const updatedUser = { ...user, lastCheckin: serverTimestamp(), checkin: true }
    await updateLoggedUser(updatedUser)
    setCheckedIn(true)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  async function checkoutUser() {
    const user = getCurrentUser()
    if (!user) return
    const updatedUser = { ...user, lastCheckin: serverTimestamp(), checkin: false, checkout: true }
    await updateLoggedUser(updatedUser)
    setCheckedIn(false)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  useEffect(() => {
    getCurrentUser()
  }, [])
  return {
    loading,
    data,
    logged,
    currentUser,
    mailExists,
    addUser,
    addOrUpdateUser,
    deleteUser,
    updateLoggedUser,
    updateUser,
    getAndUpdateUser,
    deleteAllUsers,
    insertError,
    login,
    logout,
    checkEmail,
    getCurrentUser,
    getAllUsers,
    getUserByEmail,
    saveLocalUser,
    getUserById,
    checkoutUser,
    checkinUser,
    checkedIn,
  }
}

export default useUser
