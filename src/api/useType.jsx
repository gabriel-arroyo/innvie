import { useEffect, useState } from "react";
import PropTypes from "prop-types";
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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import db, { storage } from "../firebase";

function useType(room) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [cacheRoom, setCacheRoom] = useState(room);
  const collectionRef = collection(db, "types");
  const defaultRoom = {
    name: "",
    accessories: ["microwave", "desk", "tv", "dish", "wifi", "minifridge", "fullbath"],
    beds: { full: 0, queen: 0 },
    photos: [],
    price: 0,
    type: "Habitación",
  };

  function setDefault() {
    setCacheRoom(defaultRoom);
    setPhotos([]);
  }

  async function addType(newType) {
    const q = query(collectionRef, where("name", "==", newType.name));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // eslint-disable-next-line
      console.log("type already exists");
      setError("Type already exists");
      return false;
    }

    setError(false);

    const newTypeWithTimestamp = { ...newType, lastUpdate: serverTimestamp() };
    try {
      const docRef = doc(collectionRef);
      await setDoc(docRef, newTypeWithTimestamp);
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
      setError(e);
      return false;
    }
    return true;
  }

  async function addPhoto(file) {
    try {
      const photoRef = ref(storage, `rooms/${uuid()}`);
      const snapshot = await uploadBytes(photoRef, file);
      const url = await getDownloadURL(photoRef);
      console.log(snapshot);
      return url;
    } catch (e) {
      console.log(e);
      setError(e);
    }
    return "";
  }

  async function deleteType(id) {
    setError(false);
    try {
      const docRef = doc(collectionRef, id);
      await deleteDoc(docRef);
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
      setError(e);
    }
  }

  async function deleteAllTypes() {
    setError(false);
    try {
      const q = query(collectionRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((typeData) => {
        const docRef = doc(collectionRef, typeData.id);
        deleteDoc(docRef);
      });
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
      setError(e);
      return false;
    }
    return true;
  }

  async function updateType(updatedType) {
    setError(false);
    const updatedTypeWithTimestamp = { ...updatedType, lastUpdate: serverTimestamp() };
    try {
      const docRef = doc(collectionRef, updatedType.name);
      updateDoc(docRef, updatedTypeWithTimestamp);
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
      setError(e);
    }
  }

  async function getPhotos(name) {
    setPhotos([]);
    const q = query(collectionRef, where("name", "==", name));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((d) => {
      // doc.data() is never undefined for query doc snapshots
      setPhotos(d.data().photos);
    });
  }

  async function getAll() {
    setLoading(true);
    try {
      const q = query(collectionRef);
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((d) => {
        items.push({ ...d.data(), id: d.id });
      });
      setData(items);
      setLoading(false);
      setError(false);
    } catch (e) {
      setError(e);
    }
  }

  async function getType(typeName) {
    setLoading(true);
    try {
      const q = query(collectionRef, where("name", "==", typeName));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((d) => {
        setCacheRoom({ ...d.data(), id: d.id });
        console.log(d.data());
      });
      setLoading(false);
      setError(false);
    } catch (e) {
      setError(e);
    }
  }

  useEffect(() => {
    const q = query(collectionRef, where("name", "==", room.name));
    setLoading(true);
    const unsub = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((d) => {
        items.push({ ...d.data(), id: d.id });
      });
      setData(items);
      setLoading(false);
      setError(false);
      if (items.length > 0) {
        setCacheRoom(items[0]);
      }
    });
    return () => unsub();
  }, []);
  return {
    loading,
    data,
    photos,
    setPhotos,
    cacheRoom,
    setCacheRoom,
    setDefault,
    getType,
    getAll,
    addType,
    addPhoto,
    getPhotos,
    deleteType,
    updateType,
    deleteAllTypes,
    error,
    setError,
  };
}
useType.defaultProps = {
  room: {
    name: "",
    accessories: ["microwave", "desk", "tv", "dish", "wifi", "minifridge", "fullbath"],
    beds: { full: 0, queen: 0 },
    photos: [],
    price: 0,
    type: "Habitación",
  },
};
useType.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string,
    accessories: PropTypes.arrayOf(PropTypes.string),
    beds: PropTypes.shape({ full: PropTypes.number, queen: PropTypes.number }),
    photos: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number,
    type: PropTypes.string,
  }),
};
export default useType;
