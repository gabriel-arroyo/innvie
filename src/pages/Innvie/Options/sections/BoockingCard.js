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

import { Fragment, useEffect, useState } from "react";

// react-router components
import { useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Otis Kit PRO components
import { v4 as uuid } from "uuid";
// import useCalendar from "api/useCalendar";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { useAtom } from "jotai";
// import { reservedEndDate, reservedStartDate } from "states/reservedDate";
import selectedPrice from "states/selectedPrice";
import { selectedType, maxOccupantsInType } from "states/selectedType";
import SwipeImages from "./SwipeImages";

function BookingCard({ type, action }) {
  // const [startDate] = useAtom(reservedStartDate);
  // const [endDate] = useAtom(reservedEndDate);
  // const { available } = useCalendar({ type, startDate, endDate });
  const [, setType] = useAtom(selectedType);
  const [, setMax] = useAtom(maxOccupantsInType);
  const [, setPrice] = useAtom(selectedPrice);
  const navigate = useNavigate();
  const [photos, setPhotos] = useState(["http://via.placeholder.com/640x360"]);

  const [data, setData] = useState([]);

  const handleReserve = () => {
    setType(type.type);
    setMax(type.maxOccupants);
    setPrice(action.price);
    navigate("/reserve/");
  };

  useEffect(() => {
    let tempData = [];
    const copyOfBeds = Object.entries(type.beds);
    const bedsDifferentToZero = copyOfBeds.filter((t) => Number(t[1]) !== 0);
    const beds = bedsDifferentToZero.map(
      (t) =>
        `${t[1]} ${t[0][0].toUpperCase() + t[0].substring(1)} bed${Number(t[1]) > 1 ? "s" : ""}`
    );
    tempData = [...beds];
    if (type?.accessories?.find((a) => a === "minifridge")) {
      tempData.push("You can ask for a mini fridge");
    }
    if (typeof type?.sofas !== "undefined") {
      tempData.push(`${type.sofas} Sofa cama`);
    }
    let temp = [];
    if (type?.photos && type.photos.length > 0) {
      temp = [...type.photos];
    } else {
      temp.push("http://via.placeholder.com/640x360");
    }
    setData(tempData);
    setPhotos(temp);
  }, []);

  return (
    <Card sx={{ height: "480px" }}>
      <MKBox position="relative" borderRadius="lg" mx={2} mt={-3} mb={5} height="100%">
        <SwipeImages type={type} photos={photos} />
      </MKBox>
      <MKBox p={3} mt={-8} height="100%">
        {type.accessories.length > 0 && (
          <MKTypography
            display="block"
            variant="button"
            color="text"
            fontWeight="regular"
            mb={0.75}
          >
            {type.accessories
              .filter((a) => a !== "minifridge")
              .map((category) => (
                <Fragment key={category}>{category}&nbsp;&bull;&nbsp;</Fragment>
              ))}
          </MKTypography>
        )}
        <MKTypography display="inline" variant="h5" fontWeight="bold">
          {type.type}
        </MKTypography>
        <MKBox mt={1} mb={3} ml={4} sx={{ fontSize: "1rem" }}>
          <ul>
            {data.map((item) => (
              <li key={uuid()}>{item}</li>
            ))}
          </ul>
        </MKBox>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <MKTypography fontWeight="bold" sx={{ color: "#0D283C" }}>
            ${parseFloat(action.price).toFixed(2)}
          </MKTypography>

          <MKButton
            variant="gradient"
            color="error"
            disabled={Math.random() >= 0.5}
            sx={{ height: "100%" }}
            onClick={handleReserve}
          >
            Reservar
          </MKButton>
        </div>
      </MKBox>
    </Card>
  );
}

// Typechecking props for the SimpleBookingCard
BookingCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  type: PropTypes.object.isRequired,
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
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookingCard;
