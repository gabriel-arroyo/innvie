import Icon from "@mui/material/Icon";
import Login from "pages/Innvie/Authentication/Login";
import Checkin from "pages/Innvie/Checkin";
import InnvieHome from "pages/Innvie/Home";
import MyReservations from "pages/Innvie/MyReservations";

const routes = [
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
    name: "Logout",
    icon: <Icon>person</Icon>,
    route: "/authentication",
    component: <Login />,
  },
];

export default routes;
