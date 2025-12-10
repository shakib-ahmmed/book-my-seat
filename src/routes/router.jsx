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
import RevenueOverview from "../pages/dashboard/vendor/RevenueOverview.jsx";
import VendorRequests from "../pages/dashboard/admin/VendorRequests.jsx";
import Profile from "../pages/dashboard/common/Profile.jsx";
import MyTickets from "../pages/dashboard/user/MyTickets.jsx";
import MyAddedTickets from "../pages/dashboard/vendor/MyAddedTickets.jsx";




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
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
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
        path: "my-added-tickets",
        element: (
          <PrivetRoute>
            <VendorRoute>
              <MyAddedTickets />
            </VendorRoute>
          </PrivetRoute>
        ),
      },
      {
        path: 'revenue-overview',
        element: (
          <PrivetRoute>
            <VendorRoute>
              <RevenueOverview />
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
      {
        path: 'Vendor-Request',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <VendorRequests />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'Profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-tickets',
        element: (
          <PrivateRoute>
            <MyTickets />
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
