import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout.jsx";
import AuthLayout from "../Layouts/AuthLayout.jsx";
import PrivetRoute from "./PrivetRoute.jsx";

import Home from "../pages/Home.jsx";
import AllTickets from "../pages/AllTickets.jsx";
import MyTickets from "../pages/MyTickets.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";

// Dashboard layout + dashboard pages
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import DashboardHome from "../pages/Dashboard/DashboardHome.jsx";

const router = createBrowserRouter([
  // PUBLIC ROUTES
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "tickets", element: <AllTickets /> },
    ],
  },

  // AUTH ROUTES
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "registration", element: <Register /> },
    ],
  },

  // PRIVATE ROUTES
  {
    path: "/",
    element: <PrivetRoute />,
    children: [
      { path: "my-tickets", element: <MyTickets /> },
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
      { index: true, element: <DashboardHome /> },
      // Add more dashboard pages here
    ],
  },

  { path: "*", element: <ErrorPage /> },
]);

export default router;
