import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout.jsx";
import AuthLayout from "../Layouts/AuthLayout.jsx";
import PrivetRoute from "./PrivetRoute.jsx";

import Home from "../pages/Home.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";

import Statistics from "../pages/dashboard/common/Statistics.jsx";
import VendorRoute from "./VendorRoute.jsx";
import AddTickets from "../pages/dashboard/vendor/AddTickets.jsx";
import AllTickets from "../pages/AllTickets.jsx";
import AdminRoute from "./AdminRoute.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import ManageUsers from "../pages/dashboard/admin/ManageUsers.jsx";
import PrivateRoute from "./PrivetRoute.jsx";




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
        path: "all-tickets",
        element: <AllTickets />
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

  // DASHBOARD 
  {
    path: "/dashboard",
    element: (
      <PrivetRoute>
        <DashboardLayout />
      </PrivetRoute>
    ),
    children: [
      {
        path: "add-tickets",
        element: (
          <PrivetRoute>
            <VendorRoute>
              <AddTickets />
            </VendorRoute>
          </PrivetRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },

    ],
  },

  {
    path: "*",
    element: <ErrorPage />
  },
]);

export default router;
