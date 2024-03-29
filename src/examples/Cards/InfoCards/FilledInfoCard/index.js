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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types"

// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
import Icon from "@mui/material/Icon"
import MuiLink from "@mui/material/Link"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"

function FilledInfoCard({ variant, color, icon, title, text, subtitle, action }) {
  const buttonStyles = {
    width: "max-content",
    display: "flex",
    alignItems: "center",

    "& .material-icons-round": {
      fontSize: "1.125rem",
      transform: `translateX(3px)`,
      transition: "transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)",
    },

    "&:hover .material-icons-round, &:focus .material-icons-round": {
      transform: `translateX(6px)`,
    },
  }

  // let iconColor = color;
  // const iconColor = "white";

  if (variant === "gradient" && color !== "secondary") {
    // iconColor = "white";
  } else if (variant === "gradient" && color === "secondary") {
    // iconColor = "dark";
  }

  return (
    <MKBox
      display={{ xs: "block", md: "flex", cursor: "pointer" }}
      variant={variant}
      bgColor="secondary"
      borderRadius="xl"
      pt={3.5}
      pb={3}
      px={3}
      sx={{ height: "100%" }}
    >
      <MKTypography
        display="block"
        variant="h3"
        color="warning"
        textGradient={variant === "contained"}
        mt={-0.625}
      >
        {typeof icon === "string" ? <Icon>{icon}</Icon> : icon}
      </MKTypography>
      <MKBox pt={{ xs: 3, md: 0 }} pl={{ xs: 0, md: 2 }} lineHeight={1}>
        <MKTypography display="block" variant="5" color="white" fontWeight="bold" mb={1}>
          {title}
        </MKTypography>
        <MKTypography display="block" variant="body2" color="white">
          {text}
        </MKTypography>
        <MKTypography
          display="block"
          variant="body2"
          color="white"
          mt={2}
          sx={{ fontWeight: "bold" }}
        >
          {subtitle}
        </MKTypography>
        {action && action.type === "external" ? (
          <MKTypography
            component={MuiLink}
            href={action.route}
            target="_blank"
            rel="noreferrer"
            variant="body2"
            fontWeight="regular"
            color="white"
            sx={buttonStyles}
          >
            {action.label} <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
          </MKTypography>
        ) : null}
      </MKBox>
    </MKBox>
  )
}

// Setting default props for the FilledInfoCard
FilledInfoCard.defaultProps = {
  variant: "contained",
  color: "info",
  action: false,
  subtitle: "",
}

// Typechecking props for the FilledInfoCard
FilledInfoCard.propTypes = {
  variant: PropTypes.oneOf(["contained", "gradient"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ]),
}

export default FilledInfoCard
