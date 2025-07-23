import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Home from "../Pages/Home";
import Root from "../Pages/Root";
import Error from "../Pages/Error";
import DonationRequest from "../Pages/DonationRequest";
import Blogs from "../Pages/Blogs";
import FundDetails from "../Pages/FundDetails";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Error />,

    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/donation-request",
        Component: DonationRequest,
      },
      {
        path: "/blogs",
        Component: Blogs,
      },
      {
        path: "/fund-details",
        Component: FundDetails,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: '/sign-up',
        Component: SignUp,
      },
    ]
  },
]);