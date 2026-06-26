import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import { ROLES } from "@/constants/roles";

import AuthLayout from "@/layouts/AuthLayout";
import StudentLayout from "@/layouts/StudentLayout";
import AdminLayout from "@/layouts/AdminLayout";
import CompanyLayout from "@/layouts/CompanyLayout";
import ErrorPage from "@/pages/ErrorPage";

import AuthFormSkeleton from "@/components/common/AuthFormSkeleton";
import PageSkeleton from "@/components/common/PageSkeleton";

const HomePage = lazy(() => import("@/features/dashboard/pages/HomePage"));
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("@/features/auth/pages/ForgotPasswordPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));

const StudentDashboardPage = lazy(() => import("@/features/dashboard/pages/StudentDashboardPage"));
const CompanyListPage = lazy(() => import("@/features/companies/pages/CompanyListPage"));
const CompanyDetailPage = lazy(() => import("@/features/companies/pages/CompanyDetailPage"));
const InternshipListPage = lazy(() => import("@/features/internships/pages/InternshipListPage"));
const InternshipDetailPage = lazy(() => import("@/features/internships/pages/InternshipDetailPage"));
const MyApplicationsPage = lazy(() => import("@/features/applications/pages/MyApplicationsPage"));
const BookmarkPage = lazy(() => import("@/features/bookmarks/pages/BookmarkPage"));
const ProfilePage = lazy(() => import("@/features/profile/pages/ProfilePage"));

const AdminDashboardPage = lazy(() => import("@/features/admin/pages/AdminDashboardPage"));
const AdminCompaniesPage = lazy(() => import("@/features/admin/pages/AdminCompaniesPage"));
const InternshipManagePage = lazy(() => import("@/features/internships/pages/InternshipManagePage"));
const ManageApplicationsPage = lazy(() => import("@/features/applications/pages/ManageApplicationsPage"));
const ReviewManagePage = lazy(() => import("@/features/reviews/pages/ReviewManagePage"));
const CompanyReviewPage = lazy(() => import("@/features/reviews/pages/CompanyReviewPage"));
const UserManagePage = lazy(() => import("@/features/admin/pages/UserManagePage"));

const StaffLayout = lazy(() => import("@/layouts/StaffLayout"));
const StaffDashboardPage = lazy(() => import("@/features/staff/pages/StaffDashboardPage"));
const ReviewModerationPage = lazy(() => import("@/features/staff/pages/ReviewModerationPage"));
const CompanyVerificationPage = lazy(() => import("@/features/staff/pages/CompanyVerificationPage"));
const ReportManagementPage = lazy(() => import("@/features/staff/pages/ReportManagementPage"));

const CompanyDashboardPage = lazy(() => import("@/features/companies/pages/CompanyDashboardPage"));
const CompanyInternshipsPage = lazy(() => import("@/features/companies/pages/CompanyInternshipsPage"));
const CompanyProfilePage = lazy(() => import("@/features/companies/pages/CompanyProfilePage"));
const CompanyApplicantsPage = lazy(() => import("@/features/applications/pages/CompanyApplicantsPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<PageSkeleton />}>
        <HomePage />
      </Suspense>
    ),
  },

  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: (
          <Suspense fallback={<AuthFormSkeleton />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<AuthFormSkeleton />}>
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <Suspense fallback={<AuthFormSkeleton />}>
            <ForgotPasswordPage />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<AuthFormSkeleton />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<AuthFormSkeleton />}>
            <ContactPage />
          </Suspense>
        ),
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: (
          <RoleRoute role={ROLES.STUDENT}>
            <StudentLayout />
          </RoleRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <StudentDashboardPage />
              </Suspense>
            ),
          },
          {
            path: "/companies",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <CompanyListPage />
              </Suspense>
            ),
          },
          {
            path: "/companies/:id",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <CompanyDetailPage />
              </Suspense>
            ),
          },
          {
            path: "/companies/:id/reviews",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <CompanyReviewPage />
              </Suspense>
            ),
          },
          {
            path: "/internships",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <InternshipListPage />
              </Suspense>
            ),
          },
          {
            path: "/internships/:id",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <InternshipDetailPage />
              </Suspense>
            ),
          },
          {
            path: "/applications",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <MyApplicationsPage />
              </Suspense>
            ),
          },
          {
            path: "/bookmarks",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <BookmarkPage />
              </Suspense>
            ),
          },
          {
            path: "/profile",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <ProfilePage />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: "/admin",
        element: (
          <RoleRoute role={ROLES.ADMIN}>
            <AdminLayout />
          </RoleRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <AdminDashboardPage />
              </Suspense>
            ),
          },
          {
            path: "companies",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <AdminCompaniesPage />
              </Suspense>
            ),
          },
          {
            path: "internships",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <InternshipManagePage />
              </Suspense>
            ),
          },
          {
            path: "applications",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <ManageApplicationsPage />
              </Suspense>
            ),
          },
          {
            path: "reviews",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <ReviewManagePage />
              </Suspense>
            ),
          },
          {
            path: "users",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <UserManagePage />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: "/staff",
        element: (
          <RoleRoute role={ROLES.STAFF}>
            <StaffLayout />
          </RoleRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <StaffDashboardPage />
              </Suspense>
            ),
          },
          {
            path: "reviews",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <ReviewModerationPage />
              </Suspense>
            ),
          },
          {
            path: "verification",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <CompanyVerificationPage />
              </Suspense>
            ),
          },
          {
            path: "reports",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <ReportManagementPage />
              </Suspense>
            ),
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
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <CompanyDashboardPage />
              </Suspense>
            ),
          },
          {
            path: "internships",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <CompanyInternshipsPage />
              </Suspense>
            ),
          },
          {
            path: "profile",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <CompanyProfilePage />
              </Suspense>
            ),
          },
          {
            path: "applicants/:internshipId",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <CompanyApplicantsPage />
              </Suspense>
            ),
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
