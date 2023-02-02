/* eslint-disable react/forbid-prop-types */
/**
=========================================================
* Otis Kit PRO - v2.0.1
=========================================================

* Product Page: https://material-ui.com/store/items/otis-kit-pro-material-kit-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types"
import Grid from "@mui/material/Grid"
// @mui material components
import Icon from "@mui/material/Icon"
import Collapse from "@mui/material/Collapse"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import { getStatus, parseDate } from "tools/getDate"

// Otis Kit PRO components
import borders from "assets/theme/base/borders"
import { useEffect, useState } from "react"
import Reservation from "./reservation"

function FaqCollapse({ title, user, event, open, ...rest }) {
  const { borderWidth, borderColor } = borders
  const [status, setStatus] = useState("Pending")

  useEffect(() => {
    const calculatedStatus = getStatus(event.startDate, event.endDate)
    setStatus(calculatedStatus)
  }, [])

  return (
    <MKBox mb={2}>
      <MKBox
        {...rest}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={2}
        borderBottom={`${borderWidth[1]} solid ${borderColor}`}
        sx={{ cursor: "pointer" }}
      >
        <Grid
          container
          item
          xs={12}
          lg={12}
          justifyContent="space-between"
          sx={{ mx: "auto", textAlign: "left", display: "flex" }}
        >
          <Grid item xs={12} lg={7}>
            <MKTypography variant="h5" color={open ? "dark" : "text"} sx={{ userSelect: "none" }}>
              {title}
            </MKTypography>
          </Grid>
          <Grid item xs={12} lg={2}>
            <MKTypography variant="h5" color={open ? "dark" : "text"} sx={{ userSelect: "none" }}>
              {status}
            </MKTypography>
          </Grid>
          <Grid item xs={12} lg={3}>
            <MKTypography variant="h5" color={open ? "dark" : "text"} sx={{ userSelect: "none" }}>
              {parseDate(event.startDate)} - {parseDate(event.endDate)}
            </MKTypography>
          </Grid>
        </Grid>
        <MKBox color={open ? "dark" : "text"}>
          <Icon sx={{ fontWeight: "bold" }} fontSize="small">
            {open ? "remove" : "add"}
          </Icon>
        </MKBox>
      </MKBox>
      <Collapse timeout={400} in={open}>
        <MKBox py={2} lineHeight={1}>
          <MKTypography variant="button" color="text" opacity={0.8} fontWeight="regular">
            <Reservation user={user} event={event} />
          </MKTypography>
        </MKBox>
      </Collapse>
    </MKBox>
  )
}

// Typechecking props for the FaqCollapse
FaqCollapse.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
}

export default FaqCollapse
