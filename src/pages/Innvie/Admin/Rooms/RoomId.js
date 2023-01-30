import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import PropTypes from "prop-types";

export default function RoomId({ name }) {
  return (
    <MKBox display="flex" alignItems="center" px={1} py={0.5}>
      <MKBox display="flex" flexDirection="column">
        <MKTypography variant="button" fontWeight="medium">
          {name}
        </MKTypography>
      </MKBox>
    </MKBox>
  );
}
// Typechecking props for the Author
RoomId.propTypes = {
  name: PropTypes.string.isRequired,
};
