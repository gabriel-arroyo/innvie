import MKTypography from "components/MKTypography";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function RoomAction({ id }) {
  return (
    <MKTypography
      component={Link}
      to="/admin/newroom"
      variant="caption"
      color="secondary"
      fontWeight="medium"
    >
      {id}
    </MKTypography>
  );
}
RoomAction.propTypes = {
  id: PropTypes.string.isRequired,
};
