import { Link, NavLink } from "react-router-dom";
import { ArrowRight, House, Info, LogIn, Mail, Menu } from "lucide-react";

import logo from "@/assets/images/logo.png";

const navItems = [
  { to: "/", label: "Home", icon: House },
  { to: "/about", label: "About", icon: Info },
  { to: "/contact", label: "Contact", icon: Mail },
];

export default function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="CareerPath" className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 rounded-lg border border-blue-100 bg-blue-50/70 p-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium transition",
                  isActive
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-blue-700",
                ].join(" ")
              }
            >
              <item.icon size={15} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Link
            to="/login"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-blue-100 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
          >
            <LogIn size={16} />
            Login
          </Link>

          <Link
            to="/register"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Get started
            <ArrowRight size={16} />
          </Link>
        </div>

        <Link
          to="/login"
          aria-label="Open login"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 text-blue-700 sm:hidden"
        >
          <Menu size={18} />
        </Link>
      </div>
    </header>
  );
}
