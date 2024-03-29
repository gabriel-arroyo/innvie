import { useEffect, useState } from "react"
// import { collection, getDocs, query, where } from "firebase/firestore"
// import db from "../firebase"

function useFirebase(table) {
  //   const [loading, setLoading] = useState(false)
  //   const [error, setError] = useState(false)
  //   const collectionRef = collection(db, table)
  console.log(table)
  const [loading] = useState(false)
  const [error] = useState(false)

  async function getCollection() {
    return []
    // setError(false)
    // const q = query(collectionRef)
    // const querySnapshot = await getDocs(q)
    // if (querySnapshot.empty) {
    //   // eslint-disable-next-line
    //   console.error(collection + ": no matching documents")
    //   setLoading(false)
    //   return null
    // }
    // const collectionData = []
    // querySnapshot.forEach((document) => {
    //   collectionData.push({ ...document.data(), id: document.id })
    // })
    // return collectionData
  }

  // get collection where field = value
  async function getCollectionWhere(field, value) {
    console.log(field, value)
    return []
    // setError(false)
    // const q = query(collectionRef, where(field, "==", value))
    // const querySnapshot = await getDocs(q)
    // if (querySnapshot.empty) {
    //   // eslint-disable-next-line
    //   console.error(collection + ": no matching documents")
    //   setLoading(false)
    //   return null
    // }
    // const collectionData = []
    // querySnapshot.forEach((document) => {
    //   collectionData.push({ ...document.data(), id: document.id })
    // })
    // return collectionData
  }

  useEffect(() => {
    getCollection()
  }, [])

  return {
    loading,
    error,
    getCollection,
    getCollectionWhere,
  }
}

export default useFirebase
