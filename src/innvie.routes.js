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
    name: "",
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
    name: "",
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
    name: "",
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
  {
    name: "Logout",
    route: "/authentication",
    component: <Login />,
  },
]
