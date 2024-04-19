import React from "react";
import {
  createBrowserRouter,
  BrowserRouter as Router,
  Routes,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "../Pages/Home";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import CartPage from "../Pages/CartPage";
import ApiSuccess from "../Pages/ApiSuccess";
import ApiFail from "../Pages/ApiFail";

const UserRoutes = () => {
  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: <Dashboard />,

    //   children: [
    //     {
    //       path: "employee",

    //       index: true,
    //       element: <Employess />,
    //     },

    //     {
    //       path: "dashboardmain",

    //       index: true,
    //       element: <Dashboard />,
    //     },
    //   ],
    // },

    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Signin />,
    },
    {
      path: "/signin",
      element: <Signup />,
    },
    {
      path: "/cartpage",
      element: <CartPage />,
    },

    {
      path: "/success",
      element: <ApiSuccess />,
    },

    {
      path: "/cancel",
      element: <ApiFail />,
    },

    // {
    //   path: "/admin",

    //   element: <AdminLayout />,
    //   children: [
    //     {
    //       index: true,
    //       element: <Home />,
    //       title: "Home",
    //     },

    //     {
    //       path: "home",
    //       index: true,
    //       element: <Home />,
    //       title: "Home",
    //     },
    //     // {
    //     //   element: <Home />,
    //     // },
    //     {
    //       title: "contact",
    //       path: "contact",
    //       element: <Contact />,
    //     },
    //   ],
    // },
  ]);
  return <RouterProvider router={router} />;
};

export default UserRoutes;
