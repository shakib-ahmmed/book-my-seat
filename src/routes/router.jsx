import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout.jsx";
import AuthLayout from "../Layouts/AuthLayout.jsx";
import PrivetRoute from "./PrivetRoute.jsx"
import Home from "../Pages/Home.jsx";
import AllTickets from "../Pages/AllTickets.jsx";
import MyTickets from "../Pages/MyTickets.jsx";
import Dashboard from "../Pages/Dashboard.jsx";
import { LogIn } from "lucide-react";
import ErrorPage from "../Pages/ErrorPage.jsx";
import Register from "../Pages/Register.jsx";



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
        element: <LogIn />
      },
      {
        path: "registration",
        element: <Register />
      }
    ]
  },

  {
    path: "*",
    element: <ErrorPage />,
  }
]);

export default router;
