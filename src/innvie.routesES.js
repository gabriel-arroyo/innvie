import Icon from "@mui/material/Icon"
import Login from "pages/Innvie/AuthenticationES/Login"
import Register from "pages/Innvie/AuthenticationES/Register"
import Checkin from "pages/Innvie/CheckinES"
import InnvieHome from "pages/Innvie/HomeES"
import MyReservations from "pages/Innvie/MyReservationsES"

export const routes = [
  {
    name: "Home",
    icon: <Icon>home</Icon>,
    route: "/es",
    component: <InnvieHome />,
  },
  {
    name: "Checkin/Checkout",
    icon: <Icon>menu</Icon>,
    route: "/es/authentication/checkin",
    component: <Checkin />,
  },
  {
    name: "Ingresar",
    icon: <Icon>person</Icon>,
    collapse: [
      {
        name: "Ingresar",
        route: "/es/authentication",
        component: <Login />,
      },
      {
        name: "Registrarse",
        route: "/es/authentication/register",
        component: <Register />,
      },
    ],
  },
  {
    name: "Idioma",
    icon: <Icon>language</Icon>,
    collapse: [
      {
        name: "English",
        route: "/",
        language: "english",
      },
      {
        name: "Español",
        route: "/es",
        language: "spanish",
      },
    ],
  },
]

export const adminRoutes = [
  {
    name: "Home",
    icon: <Icon>home</Icon>,
    route: "/es",
    component: <InnvieHome />,
  },
  {
    name: "Checkin/Checkout",
    icon: <Icon>menu</Icon>,
    route: "/es/authentication/checkin",
    component: <Checkin />,
  },
  {
    name: "Mis Reservaciones",
    icon: <Icon>check</Icon>,
    route: "/es/myreservations",
    component: <MyReservations />,
  },
  {
    name: "Ingresar",
    icon: <Icon>person</Icon>,
    collapse: [
      {
        name: "Ingresar",
        route: "/es/authentication",
        component: <Login />,
      },
      {
        name: "Registrarse",
        route: "/es/authentication/register",
        component: <Register />,
      },
    ],
  },
  {
    name: "Idioma",
    icon: <Icon>language</Icon>,
    collapse: [
      {
        name: "English",
        route: "/",
        language: "english",
      },
      {
        name: "Español",
        route: "/es",
        language: "spanish",
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
  {
    name: "Idioma",
    icon: <Icon>language</Icon>,
    collapse: [
      {
        name: "English",
        route: "/",
        language: "english",
      },
      {
        name: "Español",
        route: "/es",
        language: "spanish",
      },
    ],
  },
]
