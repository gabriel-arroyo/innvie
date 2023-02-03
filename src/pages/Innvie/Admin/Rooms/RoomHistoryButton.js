import { Button } from "@mui/material"
import PropTypes from "prop-types"
import { useAtom } from "jotai"
import historyFilterAtom from "states/historyFilter"

export default function RoomHistoryButton({ number, setTab }) {
  const [, setHistoryFilter] = useAtom(historyFilterAtom)
  const filter = () => {
    setTab(2)
    setHistoryFilter(number)
  }
  return <Button onClick={filter}>History</Button>
}
RoomHistoryButton.propTypes = {
  number: PropTypes.number.isRequired,
  setTab: PropTypes.func.isRequired,
}
