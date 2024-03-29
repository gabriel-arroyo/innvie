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
import Icon from "@mui/material/Icon"

// Otis Kit PRO components
import MKBox from "components/MKBox"
import MKPagination from "components/MKPagination"

// Otis Kit PRO components
import SimpleBookingCard from "examples/Cards/BookingCards/SimpleBookingCard"

// Images
import product1 from "../../../../assets/images/photos/IMG_1.JPG"
import product2 from "../../../../assets/images/photos/IMG_2.JPG"
import product3 from "../../../../assets/images/photos/IMG_3.JPG"
import product4 from "../../../../assets/images/photos/IMG_4.JPG"
import product5 from "../../../../assets/images/photos/IMG_5.JPG"
import product6 from "../../../../assets/images/photos/IMG_6.JPG"

function Places() {
  const actionProps = {
    type: "internal",
    route: "/pages/landing-pages/rental",
    color: "info",
    label: "$123.00",
  }

  return (
    <MKBox component="section" py={3}>
      <Container>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6} lg={4}>
            <MKBox mt={3}>
              <SimpleBookingCard
                image={product1}
                title="Lovely and cosy apartment"
                description="Siri's latest trick is offering a hands-free TV viewing experience, that will allow consumers to turn on or off their television, change inputs, fast forward."
                categories={["Entire Apartment", "3 Guests", "2 Beds"]}
                action={actionProps}
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MKBox mt={3}>
              <SimpleBookingCard
                image={product2}
                title="Single room in the center of the city"
                description="As Uber works through a huge amount of internal management turmoil, the company is also consolidating more of its international business."
                categories={["Private Room", "1 Guest", "1 Sofa"]}
                action={actionProps}
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MKBox mt={3}>
              <SimpleBookingCard
                image={product3}
                title="Independent house bedroom kitchen"
                description="Music is something that every person has his or her own specific opinion about. Different people have different taste, and various types of music."
                categories={["Entire Apartment", "4 Guests", "2 Beds"]}
                action={actionProps}
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MKBox mt={3}>
              <SimpleBookingCard
                image={product4}
                title="Lovely and cosy apartment"
                description="Siri's latest trick is offering a hands-free TV viewing experience, that will allow consumers to turn on or off their television, change inputs, fast forward."
                categories={["Entire Apartment", "3 Guests", "2 Beds"]}
                action={actionProps}
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MKBox mt={3}>
              <SimpleBookingCard
                image={product5}
                title="Single room in the center of the city"
                description="As Uber works through a huge amount of internal management turmoil, the company is also consolidating more of its international business."
                categories={["Private Room", "1 Guest", "1 Sofa"]}
                action={actionProps}
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MKBox mt={3}>
              <SimpleBookingCard
                image={product6}
                title="Independent house bedroom kitchen"
                description="Music is something that every person has his or her own specific opinion about. Different people have different taste, and various types of music."
                categories={["Entire Apartment", "4 Guests", "2 Beds"]}
                action={actionProps}
              />
            </MKBox>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4}>
            <MKBox mt={3}>
              <SimpleBookingCard
                image={product4}
                title="Zen Gateway with pool and garden"
                description="Fast forward, rewind and more, without having to first invoke a specific skill, or even press a button on their remote."
                categories={["Entire Apartment", "2 Guests", "1 Bed"]}
                action={actionProps}
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MKBox mt={3}>
              <SimpleBookingCard
                image={product5}
                title="Cheapest hotels for a luxury vacation"
                description="Today, the company announced it will be combining its rides-on-demand business, specific skill and UberEATS."
                categories={["Entire Flat", "8 Guests", "3 Rooms"]}
                action={actionProps}
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MKBox mt={3}>
              <SimpleBookingCard
                image={product6}
                title="Cozy Double Room Near Station"
                description="Different people have different taste, and various types of music have many ways of leaving an impact on someone."
                categories={["Entire Apartment", "2 Guests", "1 Bed"]}
                action={actionProps}
              />
            </MKBox>
          </Grid> */}
        </Grid>
        <MKBox mt={5}>
          <MKPagination>
            <MKPagination item>
              <Icon>keyboard_arrow_left</Icon>
            </MKPagination>
            <MKPagination item active>
              1
            </MKPagination>
            <MKPagination item>2</MKPagination>
            <MKPagination item>3</MKPagination>
            <MKPagination item>4</MKPagination>
            <MKPagination item>5</MKPagination>
            <MKPagination item>
              <Icon>keyboard_arrow_right</Icon>
            </MKPagination>
          </MKPagination>
        </MKBox>
      </Container>
    </MKBox>
  )
}

export default Places
