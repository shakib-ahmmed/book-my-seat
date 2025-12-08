import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout.jsx";
import AuthLayout from "../Layouts/AuthLayout.jsx";
import PrivetRoute from "./PrivetRoute.jsx";

import Home from "../pages/Home.jsx";
import AllTickets from "../pages/AllTickets.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import TicketDetails from "../pages/TicketDetails.jsx";
import Statistics from "../pages/dashboard/common/Statistics.jsx";




const router = createBrowserRouter([
  // PUBLIC ROUTES
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "tickets/:id",
        element: <TicketDetails />
      },
    ],
  },

  // AUTH ROUTES
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "registration",
        element: <Register />
      },
    ],
  },

  // PRIVATE ROUTES
  {
    path: "/",
    element: <PrivetRoute />,
    children: [
      {
        path: "all-tickets",
        element: <AllTickets />
      },
    ],
  },

  // DASHBOARD (PRIVATE)
  {
    path: "/dashboard",
    element: (
      <PrivetRoute>
        <DashboardLayout />
      </PrivetRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivetRoute>
            <Statistics />
          </PrivetRoute>
        )
      },
      {

      },
    ],
  },

  {
    path: "*",
    element: <ErrorPage />
  },
]);

export default router;
