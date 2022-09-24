import Icon from "@mui/material/Icon";
import Reservation from "pages/Innvie/Reservation/components/reservation";

const routes = [
  {
    name: "Checkin/Checkout",
    icon: <Icon>menu</Icon>,
    collapse: [
      {
        name: "Checkin",
        route: "/authentication/sign-in/basic",
        component: <Reservation />,
      },
      {
        name: "Checkout",
        route: "/authentication/sign-in/basic",
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
  {
    name: "Blog",
    icon: <Icon>book</Icon>,
    route: "/authentication/sign-in/basic",
    component: <Reservation />,
  },
  {
    name: "Login",
    icon: <Icon>person</Icon>,
    collapse: [
      {
        name: "Login",
        route: "/authentication/sign-in/basic",
        component: <Reservation />,
      },
      {
        name: "Register",
        route: "/authentication/sign-up/cover",
        component: <Reservation />,
      },
    ],
  },
];

export default routes;
