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
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import TermsModal from "./modal"

// Otis Kit PRO examples
// import DefaultNavbar from "examples/Navbars/DefaultNavbar";
// import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
// import routes from "routes";
// import footerRoutes from "footer.routes";

function Terms() {
  return (
    <>
      <MKBox component="section" pt={35} pb={12}>
        <TermsModal />
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <Card>
                <MKBox
                  variant="gradient"
                  bgColor="dark"
                  borderRadius="lg"
                  coloredShadow="dark"
                  p={3}
                  mt={-3}
                  mx={2}
                >
                  <MKTypography variant="h3" color="white">
                    Terms and conditions
                  </MKTypography>
                </MKBox>
                <MKBox pb={6} px={6}>
                  <MKTypography variant="h5" mt={6} mb={3}>
                    Occupancy at Innvie Motel
                  </MKTypography>
                  <MKTypography variant="body2" color="text">
                    The number of adults should include all occupants 21 years of age and older. All
                    guests registering must be 21 years of age and must present photo identification
                    upon check-in. Children 17 years of age and under are free when occupying the
                    same room with an adult family member. Occupancy may be restricted by local
                    ordinance. Generally, one or two persons may occupy a room with one bed. No more
                    than four persons may occupy a room with two beds. Check-in and Check-out Dates
                    You may book up to one year in advance, based on availability. The maximum
                    number of days that you may book online is 28. All guests registering must be 18
                    years of age or older (19-21 years of age required at some locations) and must
                    present photo identification upon check-in. Payment for your accommodations
                    required at check-in with an accepted credit card or cash. For third-party
                    credit card payments, contact the location.
                  </MKTypography>
                  <MKTypography variant="h5" mt={6} mb={3}>
                    Check-in and Check-out times
                  </MKTypography>
                  <MKTypography variant="h6" mt={6} mb={3}>
                    Check-in time
                  </MKTypography>
                  <MKTypography variant="body2" color="text">
                    Anytime based on availability (This may vary by location and on special event
                    dates and /or weekends). Rooms are typically available after 3 pm. Guest should
                    contact location on day of arrival for specific times if needed.
                  </MKTypography>
                  <MKTypography variant="h6" mt={6} mb={3}>
                    Check-out time
                  </MKTypography>
                  <MKTypography variant="body2" color="text">
                    12 noon (Time varies by location). Late check-outs must be approved and arranged
                    with front desk personnel prior to check-out time.
                  </MKTypography>
                  <MKTypography variant="h5" mt={6} mb={3}>
                    Clean request service
                  </MKTypography>
                  <MKTypography variant="body2" color="text">
                    Weekly rate includes one cleaning service per week
                  </MKTypography>
                </MKBox>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </MKBox>
      {/* <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox> */}
    </>
  )
}

export default Terms
