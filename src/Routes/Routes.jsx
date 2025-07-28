import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Home from "../Pages/Home";
import Root from "../Pages/Root";
import Error from "../Pages/Error";
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
        Component: BloodDonationRequest,
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
        Component: BlogDetails
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
        path: '/dashboard/edit-donation/:id',
        Component: EditDonation
      },
      {
        path: '/dashboard/create-donation-request',
        Component: CreateDonationRequest
      },
      {
        path: '/dashboard/all-users',
        Component: AllUsers
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