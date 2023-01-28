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
import { Provider } from "jotai";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// @mui material components
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

// Otis Kit PRO themes
import theme from "assets/theme";
import Home from "pages/Innvie/Home";

// Otis Kit PRO routes
// import routes from "innvie.routes";
import Confirmation from "pages/Innvie/Confirmation";
import Options from "pages/Innvie/Options";
import Reserve from "pages/Innvie/Reserve";
// import Layout from "pages/Innvie/Layouts/BasicLayout";
// import Login from "pages/Innvie/Authentication/Login";
// import Register from "pages/Innvie/Authentication/Register";
import bgImage from "assets/images/bg-sign-in-cover.jpeg";
import Admin from "pages/Innvie/Admin";
import History from "pages/Innvie/Admin/History";
import NewRoom from "pages/Innvie/Admin/NewRoom";
import Rooms from "pages/Innvie/Admin/Rooms";
import Login from "pages/Innvie/Authentication/Login";
import Register from "pages/Innvie/Authentication/Register";
import Checkin from "pages/Innvie/Checkin";
import Layout from "pages/Innvie/Layouts/BasicLayout";
import CoverLayout from "pages/Innvie/Layouts/CoverLayout";
import NavbarLayout from "pages/Innvie/Layouts/NavbarLayout";
import MyReservations from "pages/Innvie/MyReservations";
import Terms from "pages/Innvie/TermsAndConditions";
import ApiTest from "pages/Tests/apitest";
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

              <Route path="/options/" element={<Options />} />
              <Route path="/reserve/" element={<Reserve />} />

              {/* {getRoutes(routes)} */}
              <Route path="/myreservations" element={<MyReservations />} />
            </Route>
            <Route path="/admin" element={<NavbarLayout />}>
              <Route index element={<Admin />} />

              <Route path="/admin/rooms" element={<Rooms />} />
              <Route path="/admin/newroom" element={<NewRoom />} />
              <Route path="/admin/history" element={<History />} />
              <Route path="/admin/terms" element={<Terms />} />
            </Route>
            <Route path="/authentication" element={<CoverLayout image={bgImage} />}>
              <Route index element={<Login />} />
              <Route path="/authentication/register" element={<Register />} />
              <Route path="/authentication/checkin" element={<Checkin />} />
            </Route>
            <Route path="/confirmation/:code" element={<Confirmation />} />
            <Route path="/test/api" element={<ApiTest />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Provider>
      </div>
    </ThemeProvider>
  );
}
