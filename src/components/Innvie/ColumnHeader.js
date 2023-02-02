import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import React from "react"
import PropTypes from "prop-types"

function ColumnHeader({ title }) {
  return (
    <MKBox display="flex" flexDirection="column">
      <MKTypography variant="caption" fontWeight="medium" color="text">
        {title}
      </MKTypography>
    </MKBox>
  )
}

ColumnHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

export default ColumnHeader
