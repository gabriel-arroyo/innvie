const getToken = async () => {
  try {
    const response = await fetch(
      "https://fastapi-production-104e.up.railway.app/get_passcode?roomNo=1&startDate=2023-08-05&endDate=2023-08-06"
    )

    if (response.status === 200) {
      const data = await response.json()
      console.log(data)
      return data.Passcode
    }
    throw new Error(`Error getting passcode. Status: ${response.status}`)
  } catch (error) {
    throw new Error(`Error getting passcode: ${error.message}`)
  }
}

export default getToken
