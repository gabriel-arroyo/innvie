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
import PropTypes from "prop-types";

// Otis Kit PRO components
import MKBox from "components/MKBox";

function Background({ image }) {
  return (
    <MKBox
      minHeight="75vh"
      width="100%"
      sx={{
        backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
          `${linearGradient(
            rgba(gradients.dark.main, 0.8),
            rgba(gradients.dark.state, 0.8)
          )}, url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "grid",
        placeItems: "center",
      }}
    />
  );
}

// Typechecking props for the Header
Background.propTypes = {
  image: PropTypes.string.isRequired,
};

export default Background;
