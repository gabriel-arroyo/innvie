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
import Map from "./components/Map/map";
import PlacesSwipe from "./sections/PlacesSwipe";
import Description from "./sections/Description";
import OffersSwipe from "./sections/OffersSwipe";

function InnvieHome() {
  return (
    <>
      <Header />
      <Description />
      <OffersSwipe
        cards={[
          {
            variant: "gradient",
            color: "primary",
            icon: "local_offer",
            title: "7x6",
            description: "Paga 6 noches y la séptima es gratis. ",
            description2: "Válido solamente al pagar 6 noches por adelantado.",
            description3: "Ahorra 90 USD o más.",
          },
          {
            variant: "gradient",
            color: "primary",
            icon: "local_offer",
            title: "Oferta 2",
            description: "Paga 2 semanas y obtén 3 noches gratis.",
            description2: "Válido solamente al pagar 2 semanas por adelantado.",
            description3: "Ahorra 195 USD",
          },
        ]}
      />
      <Map />
      <PlacesSwipe />
      <Contact />
    </>
  );
}

export default InnvieHome;
