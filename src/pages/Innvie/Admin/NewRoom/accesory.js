/* eslint-disable react/prop-types */
import { Checkbox, FormControlLabel, IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import MKBox from "components/MKBox"

function Accesory({ item, cacheRoom, setAccesory, deleteAccesoryByName }) {
  return (
    <MKBox sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={cacheRoom?.accessories?.includes(item.name)}
            onChange={(e) => setAccesory(e, item.name)}
          />
        }
        name={item.name}
        label={item.title}
      />
      <IconButton edge="end" aria-label="delete" onClick={() => deleteAccesoryByName(item.name)}>
        <DeleteIcon />
      </IconButton>
    </MKBox>
  )
}

export default Accesory
