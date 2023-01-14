import { Grid } from "@mui/material";
import MKBox from "components/MKBox";
import PropTypes from "prop-types";
import BookingCard from "./BoockingCard";

function RoomType({ type, startDate, endDate }) {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <MKBox mt={3}>
        <BookingCard
          image={type.photos[0] ?? "https://picsum.photos/200/300"}
          title={type.type}
          description={type.description}
          categories={type.accessories}
          startDate={startDate}
          endDate={endDate}
          action={{
            type: "internal",
            route: "/reserve/2022-01-01/2022-01-02/1",
            color: "info",
            label: `$${type.price}.00`,
            disabled: false,
          }}
        />
      </MKBox>
    </Grid>
  );
}

RoomType.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  type: PropTypes.object.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

export default RoomType;
