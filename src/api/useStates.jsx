import useFirebase from "./useFirebase"

function useStates() {
  const { loading, error, getCollectionWhere } = useFirebase("states")

  async function getStates(country) {
    const states = await getCollectionWhere("country-name", country)
    const sortedStates = states.sort((a, b) => {
      if (a["state-name"] < b["state-name"]) {
        return -1
      }
      if (a["state-name"] > b["state-name"]) {
        return 1
      }
      return 0
    })
    return sortedStates
  }

  return {
    loading,
    error,
    getStates,
  }
}

export default useStates
