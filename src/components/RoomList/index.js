import DeleteIcon from "@mui/icons-material/Delete"
import { Card } from "@mui/material"
import MKBox from "components/MKBox"
import PropTypes from "prop-types"

export default function RoomList({ rooms, deleteRoom }) {
  return (
    <Card sx={{ display: "block", wrap: "no-wrap", justifyContent: "space-around" }}>
      {rooms
        .sort((a, b) => a.number - b.number)
        .map((room) => (
          <MKBox
            key={room.number}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            p={1}
            m={1}
          >
            {room.number}
            <DeleteIcon sx={{ cursor: "pointer" }} onClick={() => deleteRoom(room.number)} />
          </MKBox>
        ))}
    </Card>
  )
}
RoomList.defaultProps = {
  rooms: [{ number: "", comment: "" }],
  deleteRoom: () => console.log("test"),
}

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({ number: PropTypes.string, comment: PropTypes.string })
  ),
  deleteRoom: PropTypes.func,
}
