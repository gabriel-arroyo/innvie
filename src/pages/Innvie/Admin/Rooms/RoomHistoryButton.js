import { Button } from "@mui/material"
import PropTypes from "prop-types"

export default function RoomHistoryButton({ number, setTab, setHistoryFilter }) {
  const filter = () => {
    setTab(2)
    setHistoryFilter(number)
  }
  return <Button onClick={filter}>History</Button>
}
RoomHistoryButton.propTypes = {
  number: PropTypes.number.isRequired,
  setTab: PropTypes.func.isRequired,
  setHistoryFilter: PropTypes.func.isRequired,
}
