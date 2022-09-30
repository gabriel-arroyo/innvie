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

import Contact from "pages/Blogs/Author/sections/Contact";
import Places from "./sections/Places";
import Header from "./sections/Header";
import Offers from "./components/Offers/offers";
import Map from "./components/Map/map";

function Reservation() {
  return (
    <>
      <Header />
      <Offers
        cards={[
          {
            variant: "gradient",
            color: "primary",
            icon: "shuffle_on",
            title: "Oferta 1",
            description:
              "The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer, and that process will continue whatever.",
          },
          {
            variant: "gradient",
            color: "primary",
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
    </>
  );
}

export default Reservation;
