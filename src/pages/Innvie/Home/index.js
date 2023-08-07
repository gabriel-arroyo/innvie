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
      <OffersSwipe />
      <GoogleMap />
      <PlacesSwipe />
      <Contact />
    </>
  )
}

export default InnvieHome
