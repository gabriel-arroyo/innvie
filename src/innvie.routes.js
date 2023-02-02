import Icon from "@mui/material/Icon"
import Login from "pages/Innvie/Authentication/Login"
import Register from "pages/Innvie/Authentication/Register"
import Checkin from "pages/Innvie/Checkin"
import InnvieHome from "pages/Innvie/Home"
import MyReservations from "pages/Innvie/MyReservations"

export const routes = [
  {
    name: "Home",
    icon: <Icon>home</Icon>,
    route: "/",
    component: <InnvieHome />,
  },
  {
    name: "Checkin/Checkout",
    icon: <Icon>menu</Icon>,
    route: "/authentication/checkin",
    component: <Checkin />,
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
]

export const adminRoutes = [
  {
    name: "Home",
    icon: <Icon>home</Icon>,
    route: "/",
    component: <InnvieHome />,
  },
  {
    name: "Checkin/Checkout",
    icon: <Icon>menu</Icon>,
    route: "/authentication/checkin",
    component: <Checkin />,
  },
  {
    name: "Mis Reservaciones",
    icon: <Icon>check</Icon>,
    route: "/myreservations",
    component: <MyReservations />,
  },
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
]

export const mobileLoggedRoutes = [
  {
    name: "Home",
    icon: <Icon>home</Icon>,
    route: "/",
    component: <InnvieHome />,
  },
  {
    name: "Checkin/Checkout",
    icon: <Icon>menu</Icon>,
    route: "/authentication/checkin",
    component: <Checkin />,
  },
  {
    name: "Mis Reservaciones",
    icon: <Icon>check</Icon>,
    route: "/myreservations",
    component: <MyReservations />,
  },
  {
    name: "Salir",
    route: "/authentication",
    component: <Login />,
  },
]
