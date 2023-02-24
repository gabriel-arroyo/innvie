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

import GoogleMap from "./components/Map/map"
import Contact from "./sections/Contact"
import Description from "./sections/Description"
import Header from "./sections/Header"
import OffersSwipe from "./sections/OffersSwipe"
import PlacesSwipe from "./sections/PlacesSwipe"

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
            description: "Pay 6 nights and get the 7th free.",
            description2: "Only valid when paying 6 nights in advance.",
            description3: "Save 90 USD or more.",
          },
          {
            variant: "gradient",
            color: "primary",
            icon: "local_offer",
            title: "3 free nights",
            description: "Pay 2 weeks and get 3 free nights.",
            description2: "Only valid when paying 2 weeks in advance.",
            description3: "Save 195 USD",
          },
        ]}
      />
      <GoogleMap />
      <PlacesSwipe />
      <Contact />
    </>
  )
}

export default InnvieHome
