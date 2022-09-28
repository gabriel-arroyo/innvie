import Icon from "@mui/material/Icon";
import Login from "pages/Innvie/Login";
import Register from "pages/Innvie/Register";
import Reservation from "pages/Innvie/Reservation/components/reservation";

const routes = [
  {
    name: "Checkin/Checkout",
    icon: <Icon>menu</Icon>,
    collapse: [
      {
        name: "Checkin",
        route: "/authentication/sign-in/cover",
        component: <Reservation />,
      },
      {
        name: "Checkout",
        route: "/authentication/sign-in/cover",
        component: <Reservation />,
      },
    ],
  },
  {
    name: "My Reservation",
    icon: <Icon>menu</Icon>,
    route: "/innvie/reservation",
    component: <Reservation />,
  },
  // {
  //   name: "Blog",
  //   icon: <Icon>book</Icon>,
  //   route: "/authentication/sign-in/cover",
  //   component: <Reservation />,
  // },
  {
    name: "Login",
    icon: <Icon>person</Icon>,
    collapse: [
      {
        name: "Login",
        route: "/login",
        component: <Login />,
      },
      {
        name: "Register",
        route: "/register",
        component: <Register />,
      },
    ],
  },
];

export default routes;
