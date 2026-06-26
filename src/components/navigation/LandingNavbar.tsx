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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="CareerPath" className="h-8 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                }`
              }
            >
              <item.icon size="15" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Link
            to="/login"
            className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
          >
            <LogIn size="15" />
            Login
          </Link>

          <Link
            to="/register"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 text-sm font-medium text-white transition-all duration-200 hover:from-blue-700 hover:to-purple-700 shadow-sm"
          >
            Get started
            <ArrowRight size="15" />
          </Link>
        </div>

        <Link
          to="/login"
          aria-label="Open login"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 sm:hidden"
        >
          <Menu size="18" />
        </Link>
      </div>
    </header>
  );
}
