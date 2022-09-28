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

// Otis Kit PRO components
import MKBox from "components/MKBox";
// Otis Kit PRO examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Routes
import routes from "innvie.routes";
import footerRoutes from "footer.routes";
import CenteredFooter from "examples/Footers/CenteredFooter";
import Contact from "pages/Blogs/Author/sections/Contact";
import Places from "./sections/Places";
import Header from "./sections/Header";
import Offers from "../../../components/Offers/offers";
import Map from "./components/Map/map";

function Reservation() {
  return (
    <>
      <MKBox bgColor="white" shadow="sm" py={0.25}>
        <DefaultNavbar
          routes={routes}
          logoUrl="https://firebasestorage.googleapis.com/v0/b/innvie-6e09a.appspot.com/o/logo-blanco.png?alt=media&token=e4c69723-59be-4dfc-b1b7-b1d5c3f2513f"
          transparent
          relative
          sticky
        />
      </MKBox>
      <Header />
      <Offers
        cards={[
          {
            variant: "gradient",
            color: "pink",
            icon: "shuffle_on",
            title: "Oferta 1",
            description:
              "The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer, and that process will continue whatever.",
          },
          {
            variant: "gradient",
            color: "pink",
            icon: "beenhere",
            title: "Oferta 2",
            description:
              "The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer, and that process will continue whatever.",
          },
          {
            variant: "gradient",
            color: "primary",
            icon: "ballot",
            title: "Oferta 3",
            description:
              "The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer, and that process will continue whatever.",
          },
        ]}
      />
      <Map />
      <Places />
      <Contact />
      <MKBox pt={6} px={1} mt={6} sx={{ backgroundColor: "#bc2f2c" }}>
        <CenteredFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Reservation;
