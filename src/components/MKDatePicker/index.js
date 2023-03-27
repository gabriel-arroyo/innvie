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
import { getCurrentDate, getTomorrowDate } from "tools/getDate"

function MKDatePicker({ input, minDate, maxDate, mode, startDate, endDate, ...rest }) {
  return (
    <Flatpickr
      {...rest}
      options={{
        defaultDate: [startDate, endDate],
        mode,
        minDate,
        maxDate,
      }}
      render={({ defaultValue }, ref) => (
        <MKInput
          {...input}
          defaultValue={defaultValue}
          inputRef={ref}
          style={{ width: "200px" }}
          disabled={rest?.disabled ?? false}
        />
      )}
    />
  )
}

// Setting default values for the props of MKDatePicker
MKDatePicker.defaultProps = {
  input: {},
  minDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
  maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  startDate: getCurrentDate(),
  endDate: getTomorrowDate(),
  mode: "range",
}

// Typechecking props for the MKDatePicker
MKDatePicker.propTypes = {
  input: PropTypes.instanceOf(Object),
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  mode: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
}

export default MKDatePicker
