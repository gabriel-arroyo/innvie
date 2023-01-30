import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import PropTypes from "prop-types";

export default function RoomTypeItem({ category, subCategory }) {
  return (
    <MKBox display="flex" flexDirection="column">
      <MKTypography variant="caption" fontWeight="medium" color="text">
        {category}
      </MKTypography>
      <MKTypography variant="caption" color="secondary">
        {subCategory}
      </MKTypography>
    </MKBox>
  );
}
// Typechecking props for the Role
RoomTypeItem.propTypes = {
  category: PropTypes.string.isRequired,
  subCategory: PropTypes.string.isRequired,
};
