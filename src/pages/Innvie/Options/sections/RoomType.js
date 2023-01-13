import { Grid } from "@mui/material";
import MKBox from "components/MKBox";
import SimpleBookingCard from "examples/Cards/BookingCards/SimpleBookingCard";
import PropTypes from "prop-types";

function RoomType({ type, startDate, endDate }) {
  console.log(startDate, endDate);

  return (
    <Grid item xs={12} md={6} lg={4}>
      <MKBox mt={3}>
        <SimpleBookingCard
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
