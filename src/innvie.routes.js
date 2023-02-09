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
  {
    name: "Login",
    icon: <Icon>person</Icon>,
    collapse: [
      {
        name: "Login",
        route: "/authentication",
        component: <Login />,
      },
      {
        name: "Register",
        route: "/authentication/register",
        component: <Register />,
      },
    ],
  },
  {
    name: "Language",
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
    name: "My Reservations",
    icon: <Icon>check</Icon>,
    route: "/myreservations",
    component: <MyReservations />,
  },
  {
    name: "Login",
    icon: <Icon>person</Icon>,
    collapse: [
      {
        name: "Login",
        route: "/authentication",
        component: <Login />,
      },
      {
        name: "Register",
        route: "/authentication/register",
        component: <Register />,
      },
    ],
  },
  {
    name: "Language",
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
    name: "My Reservations",
    icon: <Icon>check</Icon>,
    route: "/myreservations",
    component: <MyReservations />,
  },
  {
    name: "Logout",
    route: "/authentication",
    component: <Login />,
  },
  {
    name: "Language",
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
