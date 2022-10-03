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

import { useEffect } from "react";

// react-router components
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Provider } from "jotai";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Otis Kit PRO themes
import theme from "assets/theme";
import Home from "pages/Innvie/Home";

// Otis Kit PRO routes
// import routes from "innvie.routes";
import Reserve from "pages/Innvie/Reserve";
import Options from "pages/Innvie/Options";
import Confirmation from "pages/Innvie/Confirmation";
// import Layout from "pages/Innvie/Layouts/BasicLayout";
// import Login from "pages/Innvie/Authentication/Login";
// import Register from "pages/Innvie/Authentication/Register";
import Layout from "pages/Innvie/Layouts/BasicLayout";
import Login from "pages/Innvie/Authentication/Login";
import Register from "pages/Innvie/Authentication/Register";
import CoverLayout from "pages/Innvie/Layouts/CoverLayout";
import bgImage from "assets/images/bg-sign-in-cover.jpeg";
import MyReservations from "pages/Innvie/MyReservations";
import Rooms from "pages/Innvie/Admin/Rooms";
import NewRoom from "pages/Innvie/Admin/NewRoom";
import NavbarLayout from "pages/Innvie/Layouts/NavbarLayout";
import Checkin from "pages/Innvie/Checkin";
import img from "./assets/images/shapes/bg-tile1.svg";
// Images

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // const getRoutes = (allRoutes) =>
  //   allRoutes.map((route) => {
  //     if (route.collapse) {
  //       return getRoutes(route.collapse);
  //     }

  //     if (route.route) {
  //       return <Route exact path={route.route} element={route.component} key={route.route} />;
  //     }

  //     return null;
  //   });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "100px auto",
        }}
      >
        <Provider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/options/:startDate/:endDate" element={<Options />} />
              <Route path="/reserve" element={<Reserve />} />
              <Route path="/confirmation" element={<Confirmation />} />
              {/* {getRoutes(routes)} */}
              <Route path="/myreservations" element={<MyReservations />} />
            </Route>
            <Route path="/admin" element={<NavbarLayout />}>
              <Route index element={<Rooms />} />
              <Route path="/admin/newroom" element={<NewRoom />} />
            </Route>
            <Route path="/authentication" element={<CoverLayout image={bgImage} />}>
              <Route index element={<Login />} />
              <Route path="/authentication/register" element={<Register />} />
              <Route path="/authentication/checkin" element={<Checkin />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Provider>
      </div>
    </ThemeProvider>
  );
}
