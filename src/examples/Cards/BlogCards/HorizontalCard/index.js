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

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MuiLink from "@mui/material/Link";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function HorizontalCard({ image, title, description, action }) {
  const cardActionStyles = {
    display: "flex",
    alignItems: "center",

    "& .material-icons, .material-icons-round,": {
      transform: `translateX(2px)`,
      transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
    },

    "&:hover .material-icons, &:focus .material-icons, &:hover .material-icons-round, &:focus .material-icons-round":
      {
        transform: `translateX(6px)`,
      },
  };

  return (
    <Card sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
      <MKBox position="relative" borderRadius="lg" ml={-2}>
        <MKBox
          component="img"
          src={image}
          alt={title}
          borderRadius="lg"
          shadow="md"
          width="12vw"
          height="12vw"
          position="relative"
          zIndex={1}
        />
      </MKBox>
      <MKBox p={3} mt={-4}>
        <MKTypography display="inline" variant="h4" textTransform="capitalize">
          {title}
        </MKTypography>
        <MKBox mt={1} mb={0}>
          <MKTypography variant="body2" component="p" color="text">
            {description}
          </MKTypography>
          <MKTypography
            component="a"
            href="#"
            variant="button"
            fontWeight="bold"
            color="info"
            textGradient
          >
            https://goo.gl/maps/Kttg1XnZgsSEyZH28
          </MKTypography>
        </MKBox>
        {action.type === "external" ? (
          <MKTypography
            component={MuiLink}
            href={action.route}
            target="_blank"
            rel="noreferrer"
            variant="body2"
            fontWeight="regular"
            color={action.color ? action.color : "dark"}
            sx={cardActionStyles}
          >
            {action.label}
            <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
          </MKTypography>
        ) : (
          <MKTypography
            component={Link}
            to={action.route}
            variant="body2"
            fontWeight="regular"
            color={action.color ? action.color : "dark"}
            sx={cardActionStyles}
          >
            {action.label}
            {action.label && <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>}
          </MKTypography>
        )}
      </MKBox>
    </Card>
  );
}

// Typechecking props for the RaisedBlogCard
HorizontalCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
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

export default HorizontalCard;
