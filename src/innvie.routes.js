import Icon from "@mui/material/Icon";
import Login from "pages/Innvie/Authentication/Login";
import Register from "pages/Innvie/Authentication/Register";
import MyReservations from "pages/Innvie/MyReservations";

const routes = [
  // {
  //   name: "Checkin/Checkout",
  //   icon: <Icon>menu</Icon>,
  //   collapse: [
  //     {
  //       name: "Checkin",
  //       route: "/authentication/sign-in/basic",
  //       component: <MyReservations />,
  //     },
  //     {
  //       name: "Checkout",
  //       route: "/authentication/sign-in/basic",
  //       component: <MyReservations />,
  //     },
  //   ],
  // },
  {
    name: "My Reservation",
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
