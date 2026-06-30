import {
  LayoutDashboard,
  Building2,
  Briefcase,
  ClipboardList,
  Bookmark,
  User,
  Crown,
} from "lucide-react";

import { ROUTES } from "./routes";

export const studentMenu = [
  {
    title: "Dashboard",
    href: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: "Perusahaan",
    href: ROUTES.COMPANIES,
    icon: Building2,
  },
  {
    title: "Magang",
    href: ROUTES.INTERNSHIPS,
    icon: Briefcase,
  },
  {
    title: "Lamaran",
    href: ROUTES.APPLICATIONS,
    icon: ClipboardList,
  },
  {
    title: "Tersimpan",
    href: ROUTES.BOOKMARKS,
    icon: Bookmark,
  },
  {
    title: "Profil",
    href: ROUTES.PROFILE,
    icon: User,
  },
  {
    title: "Berlangganan",
    href: ROUTES.SUBSCRIPTION,
    icon: Crown,
  },
];