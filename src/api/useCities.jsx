import useFirebase from "./useFirebase"

function useCities() {
  const { loading, error, getCollectionWhere } = useFirebase("cities")

  async function getCities(country, state) {
    const cities = await getCollectionWhere("state-name", state)
    if (!cities) return []
    const filteredCities = cities.filter((city) => city["country-name"] === country)
    const sortedCities = filteredCities.sort((a, b) => {
      if (a["city-name"] < b["city-name"]) {
        return -1
      }
      if (a["city-name"] > b["city-name"]) {
        return 1
      }
      return 0
    })
    return sortedCities
  }

  return {
    loading,
    error,
    getCities,
  }
}

export default useCities
