/* eslint-disable react/forbid-prop-types */
/*
=========================================================
* Otis Kit PRO - v2.0.1
=========================================================

* Product Page: https://material-ui.com/store/items/otis-kit-pro-material-kit-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import useType from "api/useType";
import PropTypes from "prop-types";
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import Icon from "@mui/material/Icon";

// Otis Kit PRO components
import MKBox from "components/MKBox";
// import MKPagination from "components/MKPagination";

// Images
import RoomType from "./RoomType";

function Places({ startDate, endDate }) {
  const { types } = useType();
  return (
    <MKBox component="section" py={3}>
      <Container>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {types.map((type) => (
            <RoomType type={type} startDate={startDate} endDate={endDate} />
          ))}
        </Grid>
      </Container>
    </MKBox>
  );
}

Places.defaultProps = {
  startDate: new Date(),
  endDate: new Date(),
};

Places.propTypes = {
  startDate: PropTypes.any,
  endDate: PropTypes.any,
};

export default Places;
