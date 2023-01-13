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

import { Fragment, useEffect } from "react";

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Otis Kit PRO components
import useCalendar from "api/useCalendar";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

function SimpleBookingCard({ image, title, description, categories, action, startDate, endDate }) {
  const { available, getAvailableRoom } = useCalendar();

  useEffect(() => {
    getAvailableRoom(title, startDate, endDate).then((room) => {
      console.log("room", room);
    });
  }, []);
  return (
    <Card sx={{ height: "100%" }}>
      <MKBox position="relative" borderRadius="lg" mx={2} mt={-3} height="100%">
        <MKBox
          component="img"
          src={image}
          alt={title}
          borderRadius="lg"
          shadow="md"
          width="100%"
          position="relative"
          zIndex={1}
          height="100%"
        />
        <MKBox
          borderRadius="lg"
          shadow="md"
          width="100%"
          height="100%"
          position="absolute"
          left={0}
          top={0}
          sx={{
            backgroundImage: `url(${image})`,
            transform: "scale(0.94)",
            filter: "blur(12px)",
            backgroundSize: "cover",
          }}
        />
      </MKBox>
      <MKBox p={3} mt={-2} height="100%">
        {categories.length > 0 && (
          <MKTypography
            display="block"
            variant="button"
            color="text"
            fontWeight="regular"
            mb={0.75}
          >
            {categories.map((category) => (
              <Fragment key={category}>{category}&nbsp;&bull;&nbsp;</Fragment>
            ))}
          </MKTypography>
        )}
        <MKTypography display="inline" variant="h5" fontWeight="bold">
          {title}
        </MKTypography>
        <MKBox mt={1} mb={3}>
          <MKTypography variant="body2" component="p" color="text">
            {description}
          </MKTypography>
        </MKBox>
        {action.type === "external" ? (
          <MKButton
            component={Link}
            href={action.route}
            target="_blank"
            rel="noreferrer"
            variant="outlined"
            size="small"
            disabled={action.disabled}
            color={action.color ? action.color : "dark"}
          >
            {action.label}
          </MKButton>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <MKTypography fontWeight="bold" sx={{ color: "#0D283C" }}>
              {action.label}
            </MKTypography>

            <MKButton
              component={Link}
              to={action.route}
              variant="gradient"
              color="error"
              disabled={!available}
              sx={{ height: "100%" }}
            >
              Reservar
            </MKButton>
          </div>
        )}
      </MKBox>
    </Card>
  );
}

// Setting default props for the SimpleBookingCard
SimpleBookingCard.defaultProps = {
  categories: [],
};

// Typechecking props for the SimpleBookingCard
SimpleBookingCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  categories: PropTypes.instanceOf(Array),
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default SimpleBookingCard;
