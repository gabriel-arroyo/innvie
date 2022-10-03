import Icon from "@mui/material/Icon";
import Login from "pages/Innvie/Authentication/Login";
import Register from "pages/Innvie/Authentication/Register";
import Checkin from "pages/Innvie/Checkin";
import MyReservations from "pages/Innvie/MyReservations";

const routes = [
  {
    name: "Checkin/Checkout",
    icon: <Icon>menu</Icon>,
    route: "/authentication/checkin",
    component: <Checkin />,
  },
  {
    name: "Mis Reservaciones",
    icon: <Icon>menu</Icon>,
    route: "/myreservations",
    component: <MyReservations />,
  },
  // {
  //   name: "Blog",
  //   icon: <Icon>book</Icon>,
  //   route: "/authentication/sign-in/basic",
  //   component: <MyReservations />,
  // },
  // {
  //   name: "Login",
  //   icon: <Icon>person</Icon>,
  //   collapse: [
  //     {
  //       name: "Login",
  //       route: "/authentication/sign-in/basic",
  //       component: <MyReservations />,
  //     },
  //     {
  //       name: "Register",
  //       route: "/authentication/sign-up/cover",
  //       component: <MyReservations />,
  //     },
  //   ],
  // },
  {
    name: "Ingresar",
    icon: <Icon>person</Icon>,
    collapse: [
      {
        name: "Ingresar",
        route: "/authentication",
        component: <Login />,
      },
      {
        name: "Registrarse",
        route: "/authentication/register",
        component: <Register />,
      },
    ],
  },
];

export default routes;
