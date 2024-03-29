import { useAtom } from "jotai"
import loggedUserAtom from "states/loggedUser"
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
} from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import db, { storage } from "../firebase"
import useHistory from "./useHistory"

function useType(room) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [types, setTypes] = useState([])
  const [photos, setPhotos] = useState([])
  const [cacheRoom, setCacheRoom] = useState(room)
  const [price, setPrice] = useState(0)
  const { addAction } = useHistory()
  const collectionRef = collection(db, "types")
  const [loggedUser] = useAtom(loggedUserAtom)
  const defaultRoom = {
    type: "",
    accessories: ["microwave", "desk", "tv", "dish", "wifi", "minifridge", "fullbath"],
    beds: { full: 0, queen: 0 },
    photos: [],
    price: 0,
    category: "Habitación",
  }

  function setDefault() {
    setCacheRoom(defaultRoom)
    setPhotos([])
  }

  async function getType(typeName) {
    setLoading(true)
    let type = {}
    try {
      const q = query(collectionRef, where("type", "==", typeName))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((d) => {
        type = { ...d.data(), id: d.id }
        setCacheRoom(type)
      })
      setLoading(false)
      setError(false)
    } catch (e) {
      setError(e)
      return {}
    }
    return type
  }

  async function addType(newType) {
    const q = query(collectionRef, where("type", "==", newType.type))
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      // eslint-disable-next-line
      console.log("type already exists")
      setError("Type already exists")
      return false
    }

    setError(false)

    const newTypeWithTimestamp = { ...newType, lastUpdate: serverTimestamp() }
    try {
      const docRef = doc(collectionRef)
      await setDoc(docRef, newTypeWithTimestamp)
      await getType(newType.type)
    } catch (e) {
      // eslint-disable-next-line
      console.log(e)
      setError(e)
      return false
    }
    return true
  }

  async function addPhoto(file) {
    const id = uuid()
    try {
      const photoRef = ref(storage, `rooms/${id}`)
      await uploadBytes(photoRef, file)
      const url = await getDownloadURL(photoRef)
      console.log(url)
      return url
    } catch (e) {
      console.log(e)
      setError(e)
    }
    return ""
  }

  async function deleteType(id) {
    setError(false)
    try {
      const docRef = doc(collectionRef, id)
      await deleteDoc(docRef)
    } catch (e) {
      // eslint-disable-next-line
      console.log(e)
      setError(e)
    }
  }

  // delete type by name
  async function deleteTypeByName(name) {
    setError(false)
    try {
      const q = query(collectionRef, where("type", "==", name))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((d) => {
        deleteType(d.id)
      })
    } catch (e) {
      // eslint-disable-next-line
      console.log(e)
      setError(e)
    }
  }

  async function deleteAllTypes() {
    setError(false)
    try {
      const q = query(collectionRef)
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((typeData) => {
        const docRef = doc(collectionRef, typeData.id)
        deleteDoc(docRef)
      })
    } catch (e) {
      // eslint-disable-next-line
      console.log(e)
      setError(e)
      return false
    }
    return true
  }

  async function updateType(updatedType) {
    setError(false)
    const updatedTypeWithTimestamp = { ...updatedType, lastUpdate: serverTimestamp() }
    try {
      const docRef = doc(collectionRef, updatedType.id)
      updateDoc(docRef, updatedTypeWithTimestamp)
      addAction({
        action: "updateType",
        room: updatedType,
        admin: !!loggedUser.admin,
        email: loggedUser.email,
        fisrt_name: loggedUser.first_name,
        last_name: loggedUser.last_name,
      })
    } catch (e) {
      // eslint-disable-next-line
      console.log(e)
      setError(e)
    }
  }

  async function getPhotos(name) {
    setPhotos([])
    const q = query(collectionRef, where("type", "==", name))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((d) => {
      // doc.data() is never undefined for query doc snapshots
      setPhotos(d.data().photos)
    })
  }

  async function getAll() {
    const items = []
    setLoading(true)
    try {
      const q = query(collectionRef)
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((d) => {
        items.push({ ...d.data(), id: d.id })
      })
      setTypes(items)
      setLoading(false)
      setError(false)
    } catch (e) {
      setError(e)
    }
    return items
  }

  async function getByName(name) {
    setLoading(true)
    const items = []
    try {
      const q = query(collectionRef, where("type", "==", name))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((d) => {
        items.push({ ...d.data(), id: d.id })
      })
      setTypes(items)
      setLoading(false)
      setError(false)
    } catch (e) {
      setError(e)
    }
    if (items.length > 0) {
      return items[0]
    }
    return []
  }

  async function getPriceByName(name) {
    const type = await getByName(name)
    if (type?.price) {
      setPrice(type.price)
      console.log("🚀 ~ file: useType.jsx:218 ~ getPriceByName ~ type.price", type.price)

      return type.price
    }
    return 0
  }

  useEffect(() => {
    const q = query(collectionRef)
    setLoading(true)
    const unsub = onSnapshot(q, (querySnapshot) => {
      const items = []
      querySnapshot.forEach((d) => {
        items.push({ ...d.data(), id: d.id })
      })
      setTypes(items)
      setLoading(false)
      setError(false)
      if (items.length > 0) {
        setCacheRoom(items[0])
      }
    })
    return () => unsub()
  }, [])
  return {
    loading,
    types,
    photos,
    price,
    setPhotos,
    cacheRoom,
    setCacheRoom,
    setDefault,
    getType,
    getPriceByName,
    getByName,
    getAll,
    addType,
    addPhoto,
    getPhotos,
    deleteType,
    deleteTypeByName,
    updateType,
    deleteAllTypes,
    error,
    setError,
  }
}
useType.defaultProps = {
  room: {
    type: "",
    accessories: ["microwave", "desk", "tv", "dish", "wifi", "minifridge", "fullbath"],
    beds: { full: 0, queen: 0 },
    photos: [],
    price: 0,
    category: "Habitación",
  },
}
useType.propTypes = {
  room: PropTypes.shape({
    type: PropTypes.string,
    accessories: PropTypes.arrayOf(PropTypes.string),
    beds: PropTypes.shape({ full: PropTypes.number, queen: PropTypes.number }),
    photos: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number,
    category: PropTypes.string,
  }),
}
export default useType
