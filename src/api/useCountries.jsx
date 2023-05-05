import useFirebase from "./useFirebase"

function useCountries() {
  const { loading, error, getCollection } = useFirebase("countries")

  async function getCountries() {
    const countries = await getCollection()
    const sortedCountries = countries.sort((a, b) => {
      if (a["country-name"] < b["country-name"]) {
        return -1
      }
      if (a["country-name"] > b["country-name"]) {
        return 1
      }
      return 0
    })
    return sortedCountries
  }

  return {
    loading,
    error,
    getCountries,
  }
}

export default useCountries
