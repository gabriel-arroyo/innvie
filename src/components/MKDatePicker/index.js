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

// react-flatpickr components
import Flatpickr from "react-flatpickr"

// react-flatpickr styles
import "flatpickr/dist/flatpickr.css"

// Otis Kit PRO components
import MKInput from "components/MKInput"

function MKDatePicker({ input, ...rest }) {
  return (
    <Flatpickr
      {...rest}
      render={({ defaultValue }, ref) => (
        <MKInput {...input} defaultValue={defaultValue} inputRef={ref} style={{ width: "200px" }} />
      )}
    />
  )
}

// Setting default values for the props of MKDatePicker
MKDatePicker.defaultProps = {
  input: {},
}

// Typechecking props for the MKDatePicker
MKDatePicker.propTypes = {
  input: PropTypes.instanceOf(Object),
}

export default MKDatePicker
