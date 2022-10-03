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

import Contact from "./sections/Contact";
import Header from "./sections/Header";
import Offers from "./components/Offers/offers";
import Map from "./components/Map/map";
import PlacesSwipe from "./sections/PlacesSwipe";

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
            title: "6x5",
            description: "Hospédate con nosotros 6 noches y paga solamente 5.",
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
      <PlacesSwipe />
      <Contact />
    </>
  );
}

export default Reservation;
