import { createBrowserRouter } from "react-router-dom";

import HomePage from "@/features/dashboard/pages/HomePage";
import ErrorPage from "@/pages/ErrorPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";

import StudentDashboardPage from "@/features/dashboard/pages/StudentDashboardPage";

import CompanyLayout from "@/layouts/CompanyLayout";

import CompanyDashboardPage from "@/features/companies/pages/CompanyDashboardPage";

import RoleRoute from "./RoleRoute";

import { ROLES } from "@/constants/roles";
import CompanyInternshipsPage from "@/features/companies/pages/CompanyInternshipsPage";
import CompanyListPage from "@/features/companies/pages/CompanyListPage";
import CompanyDetailPage from "@/features/companies/pages/CompanyDetailPage";
import CompanyManagePage from "@/features/companies/pages/CompanyManagePage";

import InternshipListPage from "@/features/internships/pages/InternshipListPage";
import InternshipDetailPage from "@/features/internships/pages/InternshipDetailPage";
import InternshipManagePage from "@/features/internships/pages/InternshipManagePage";

import MyApplicationsPage from "@/features/applications/pages/MyApplicationsPage";
import ManageApplicationsPage from "@/features/applications/pages/ManageApplicationsPage";

import BookmarkPage from "@/features/bookmarks/pages/BookmarkPage";

import ProfilePage from "@/features/users/pages/ProfilePage";

import ProtectedRoute from "./ProtectedRoute";

import StudentLayout from "@/layouts/StudentLayout";
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboardPage from "@/features/admin/pages/AdminDashboardPage";
import CompanyProfilePage from "@/features/companies/pages/CompanyProfilePage";
import CompanyApplicationsPage from "@/features/applications/pages/CompanyApplicationPage";
import AuthLayout from "@/layouts/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },

  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },

      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <StudentLayout />,
        children: [
          {
            path: "/dashboard",
            element: <StudentDashboardPage />,
          },

          {
            path: "/companies",
            element: <CompanyListPage />,
          },

          {
            path: "/companies/:id",
            element: <CompanyDetailPage />,
          },

          {
            path: "/internships",
            element: <InternshipListPage />,
          },

          {
            path: "/internships/:id",
            element: <InternshipDetailPage />,
          },

          {
            path: "/applications",
            element: <MyApplicationsPage />,
          },

          {
            path: "/bookmarks",
            element: <BookmarkPage />,
          },

          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
      },

      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboardPage />,
          },

          {
            path: "companies",
            element: <CompanyManagePage />,
          },

          {
            path: "internships",
            element: <InternshipManagePage />,
          },

          {
            path: "applications",
            element: <ManageApplicationsPage />,
          },
        ],
      },

      {
        path: "/company",

        element: (
          <RoleRoute role={ROLES.COMPANY}>
            <CompanyLayout />
          </RoleRoute>
        ),

        children: [
          {
            index: true,
            element: <CompanyDashboardPage />,
          },
          {
            path: "internships",
            element: <CompanyInternshipsPage />,
          },

          {
            path: "profile",
            element: <CompanyProfilePage />,
          },

          {
            path: "applicants",
            element: <CompanyApplicationsPage />,
          },
          {
            path: "*",
            element: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);
