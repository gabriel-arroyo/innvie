// prop-types is a library for typechecking of props
import PropTypes from "prop-types"
import MKBox from "components/MKBox"
// Material Kit 2 PRO React examples
import useRoom from "api/useRoom"
import useType from "api/useType"
import { useEffect, useState } from "react"
import CreateTable from "./CreateTable"

function Rooms({ setTab, setHistoryFilter }) {
  const { getRooms, loading, updateRoom } = useRoom()
  const { types, loading: loadingtypes } = useType()
  const [rooms, setRooms] = useState()

  // update rooms when loading changes
  useEffect(() => {
    if (!loading) {
      getRooms().then((res) => {
        setRooms(res)
      })
    }
  }, [loading])

  return (
    <MKBox component="section" pt={0}>
      <CreateTable
        types={types}
        rooms={rooms}
        loading={loading && loadingtypes}
        updateRoom={updateRoom}
        setTab={setTab}
        setHistoryFilter={setHistoryFilter}
      />
    </MKBox>
  )
}

Rooms.propTypes = {
  setTab: PropTypes.func.isRequired,
  setHistoryFilter: PropTypes.func.isRequired,
}

export default Rooms
