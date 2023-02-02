import { Grid } from "@mui/material"
import MKBox from "components/MKBox"
import PropTypes from "prop-types"
import BookingCard from "./BoockingCard"

function RoomType({ typeObject }) {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <MKBox mt={3}>
        <BookingCard
          type={typeObject}
          action={{
            type: "internal",
            route: "/reserve",
            color: "info",
            price: typeObject.price,
            disabled: false,
          }}
        />
      </MKBox>
    </Grid>
  )
}

RoomType.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  typeObject: PropTypes.object.isRequired,
}

export default RoomType
