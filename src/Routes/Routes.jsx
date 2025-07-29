import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Home from "../Pages/Home";
import Root from "../Pages/Root";

import Blogs from "../Pages/Blogs";
import FundDetails from "../Pages/FundDetails";

import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../DashboardPages/DashboardHome";
import UserProfile from "../DashboardPages/UserProfile";
import CreateDonationRequest from "../DashboardPages/CreateDonationRequest";
import MyDonationRequests from "../DashboardPages/MyDonationRequests";
import EditDonation from "../DashboardPages/EditDonation";
import AllUsers from "../DashboardPages/AllUsers";
import AllBloodRequest from "../DashboardPages/AllBloodRequest";
import ContentManagement from "../DashboardPages/ContentManagement";
import AddBlog from "../DashboardPages/AddBlog";
import EditBlog from "../DashboardPages/EditBlog";
import BloodDonationRequest from "../Pages/BloodDonationRequest";
import DonationRequestDetails from "../Pages/DonationRequestDetails";
import BlogDetails from "../Pages/BlogDetails";
import Search from "../Pages/Search";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import MyRequestDetails from "../DashboardPages/MyRequestDetails";
import Error from "../Pages/Error";



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
        path: "/blood-donation-request",
        element: <PrivateRoutes><BloodDonationRequest /></PrivateRoutes>

      },
      {
        path: '/search-donor',
        Component: Search
      },
      {
        path: '/donation-request/:id',
        Component: DonationRequestDetails
      },
      {
        path: "/blogs",
        Component: Blogs,
      },
      {
        path: '/blogs-details/:id',
        element: <PrivateRoutes><BlogDetails /></PrivateRoutes>
      },
      {
        path: "/fund-details",
        element: <PrivateRoutes><FundDetails></FundDetails></PrivateRoutes>

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
  {
    path: '/dashboard',
    Component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        Component: DashboardHome
      },
      {
        path: '/dashboard/profile',
        Component: UserProfile
      },
      {
        path: "/dashboard/my-donation-requests",
        Component: MyDonationRequests
      },
      {
        path: "/dashboard/donation-request-details/:id",
        Component: MyRequestDetails
      },
      {
        path: '/dashboard/edit-donation/:id',
        Component: EditDonation
      },
      {
        path: '/dashboard/create-donation-request',
        Component: CreateDonationRequest
      },
      {
        path: '/dashboard/all-users',
        element: <AdminRoutes><AllUsers /></AdminRoutes>
      },
      {
        path: '/dashboard/all-blood-donation-request',
        Component: AllBloodRequest
      },
      {
        path: '/dashboard/content-management',
        Component: ContentManagement
      },
      {
        path: '/dashboard/add-blog',
        Component: AddBlog
      },
      {
        path: '/dashboard/edit-blog/:id',
        Component: EditBlog
      }
    ]
  }
]);