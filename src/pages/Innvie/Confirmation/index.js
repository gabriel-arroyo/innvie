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

// @mui material components
import Grid from "@mui/material/Grid"
// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import { useParams } from "react-router-dom"
// Otis Kit PRO examples
import { useAtom } from "jotai"
import loggedUser from "states/loggedUser"
import { reservedDays, reservedEndDate, reservedStartDate } from "states/reservedDate"
import selectedPrice from "states/selectedPrice"
import { selectedType } from "states/selectedType"
import modifiedPrice from "states/modifiedPrice"
import reservedAdultsAtom from "states/reservedAdults"
import taxes from "constants/taxes"
import roundTo from "tools/round"
import reservedKidsAtom from "states/reservedKids"
import CustomLayout from "../../../layouts/sections/components/CustomLayout"
import GoogleMap from "../Home/components/Map/map"
import PlacesGrid from "../Home/sections/PlacesGrid"

function Confirmation() {
  const params = useParams()
  const [user] = useAtom(loggedUser)
  const [startDate] = useAtom(reservedStartDate)
  const [endDate] = useAtom(reservedEndDate)
  const [days] = useAtom(reservedDays)
  const [type] = useAtom(selectedType)
  const [price] = useAtom(selectedPrice)
  const [newPrice] = useAtom(modifiedPrice)
  const [reservedAdults] = useAtom(reservedAdultsAtom)
  const [reservedKids] = useAtom(reservedKidsAtom)
  return (
    <CustomLayout
      title="Booking Confirmed"
      subtitle="Thank you for your payment. Your payment has been successfully completed, and a receipt for your purchase has been emailed to you. You may log into your account at www.paypal.com/us to view details of this transaction."
    >
      <MKBox position="relative" zIndex={10} px={{ xs: 1, sm: 0 }} mt={8}>
        <MKTypography
          variant="h5"
          fontWeight="normal"
          mb={8}
          justifyContent="center"
          textAlign="center"
          fullwidth
        >
          You will receive an email shortly with detailed instructions on how to access the room
          upon
        </MKTypography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={4}>
            <MKBox>
              <MKTypography variant="h6" fontWeight="bold" mb={2}>
                {`${user?.first_name ? user.first_name : ""} ${
                  user?.last_name ? user.last_name : ""
                }`}
              </MKTypography>
              <MKTypography variant="h4">{`Room: ${type}`}</MKTypography>
              <br />
              <MKTypography>{`Adults: ${reservedAdults}`}</MKTypography>
              <MKTypography>{`Kids: ${reservedKids}`}</MKTypography>
              <MKTypography>{`Check-in: ${startDate} at 3:00 pm`}</MKTypography>
              <MKTypography>{`Check-out: ${endDate} at 12:00 pm`}</MKTypography>
              <MKTypography>{`${days} day${days > 1 ? "s" : ""}`}</MKTypography>
              <MKBox pt={3} pb={2} px={2} textAlign="center">
                <MKBox my={1}>
                  <MKTypography>Room rate: ${price * days}.00</MKTypography>
                  <MKTypography>Tax: ${roundTo(taxes * days * price, 2)}</MKTypography>
                  <MKTypography variant="h1" color="text">
                    Total:{" "}
                    <MKTypography
                      display="inline"
                      component="small"
                      variant="h5"
                      color="inherit"
                      verticalAlign="top"
                    >
                      $
                    </MKTypography>
                    {roundTo(price * days + price * days * taxes, 2)}
                  </MKTypography>
                  {newPrice && (
                    <MKTypography variant="h1" color="error">
                      Difference Payable:{" "}
                      <MKTypography
                        display="inline"
                        component="small"
                        variant="h5"
                        color="inherit"
                        verticalAlign="top"
                      >
                        $
                      </MKTypography>
                      {newPrice}
                    </MKTypography>
                  )}
                </MKBox>
              </MKBox>
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={4} display="flex" flexDirection="column" alignItems="center">
            <MKTypography variant="h6" fontWeight="bold" mb={2}>
              {user?.email ? user.email : ""}
            </MKTypography>
            <MKTypography>Reservation code</MKTypography>
            <MKTypography variant="h3">{params.code.substring(0, 6)}</MKTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={5} justifyContent="center">
          <GoogleMap />
          <Grid item xs={12} lg={4} display="flex" flexDirection="column" justifyContent="center">
            <MKTypography sx={{ lineHeight: "2.5" }}>
              18732 Dix Toledo HWY Brownstown MI 48193
            </MKTypography>

            <MKTypography
              component="a"
              href="#"
              variant="button"
              fontWeight="bold"
              color="info"
              textGradient
            >
              https://goo.gl/maps/FSwxYwTz11N4b7828
            </MKTypography>
          </Grid>
        </Grid>
        <PlacesGrid />
      </MKBox>
    </CustomLayout>
  )
}

export default Confirmation
