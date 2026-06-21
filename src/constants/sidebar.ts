import {
  LayoutDashboard,
  Building2,
  Briefcase,
  ClipboardList,
  Bookmark,
  User,
} from "lucide-react";

import { ROUTES } from "./routes";

export const studentMenu = [
  {
    title: "Dashboard",
    href: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: "Companies",
    href: ROUTES.COMPANIES,
    icon: Building2,
  },
  {
    title: "Internships",
    href: ROUTES.INTERNSHIPS,
    icon: Briefcase,
  },
  {
    title: "Applications",
    href: ROUTES.APPLICATIONS,
    icon: ClipboardList,
  },
  {
    title: "Bookmarks",
    href: ROUTES.BOOKMARKS,
    icon: Bookmark,
  },
  {
    title: "Profile",
    href: ROUTES.PROFILE,
    icon: User,
  },
];