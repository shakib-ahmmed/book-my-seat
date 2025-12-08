import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout.jsx";
import AuthLayout from "../Layouts/AuthLayout.jsx";
import PrivetRoute from "./PrivetRoute.jsx"
import Home from "../pages/Home.jsx";
import AllTickets from "../pages/AllTickets.jsx";
import MyTickets from "../pages/MyTickets.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import Register from "../pages/Register.jsx";
import Login from "../Pages/Login.jsx";
import DashboardLayout from "../pages/Dashboard.jsx";



const router = createBrowserRouter([

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
        path: "tickets",
        element: <AllTickets />,
      }
    ]
  },

  // PRIVATE PAGES
  {
    path: "/",
    element: <PrivetRoute />,
    children: [
      {
        path: "my-tickets",
        element: <MyTickets />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      }
    ]
  },

  // AUTH PAGES
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
      }
    ]
  },
  {
    path: '/dashboard',
    element: [
      <PrivetRoute>
        <DashboardLayout />
      </PrivetRoute>
    ],
    children: [
      {
        index: true,
        element: {

        }
      }
    ]
  },

  {
    path: "*",
    element: <ErrorPage />,
  }
]);

export default router;
