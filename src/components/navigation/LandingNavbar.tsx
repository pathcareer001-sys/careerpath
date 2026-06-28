import { Link, NavLink } from "react-router-dom";
import { ArrowRight, House, Info, LogIn, Mail, Menu } from "lucide-react";

import logo from "@/assets/images/logo.png";
import ThemeToggle from "@/components/ui/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { to: "/", label: "Home", icon: House },
  { to: "/about", label: "About", icon: Info },
  { to: "/contact", label: "Contact", icon: Mail },
];

export default function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-border">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="CareerPath" className="h-9 w-auto md:h-12" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `inline-flex h-9 items-center gap-2 rounded-lg px-3.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary-subtle text-primary"
                    : "text-body hover:bg-primary-subtle/50 hover:text-primary"
                }`
              }
            >
              <item.icon size="15" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <ThemeToggle />
          <Link
            to="/login"
            className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-4 text-sm font-medium text-body transition-all duration-200 hover:border-primary/30 hover:bg-primary-subtle hover:text-primary"
          >
            <LogIn size="15" />
            Login
          </Link>

          <Link
            to="/register"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-button transition-all duration-200 hover:bg-primary-hover hover:shadow-button-hover active:bg-primary-active"
          >
            Get started
            <ArrowRight size="15" />
          </Link>
        </div>

        <Sheet>
          <SheetTrigger className="inline-flex md:hidden h-9 w-9 items-center justify-center rounded-lg border border-border text-body hover:bg-primary-subtle transition-colors">
            <Menu size="18" />
          </SheetTrigger>
          <SheetContent side="right" className="w-64 p-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-4 h-14 border-b border-border">
                <img src={logo} alt="CareerPath" className="h-9 w-auto" />
              </div>
              <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-primary-subtle text-primary font-medium"
                          : "text-body hover:bg-primary-subtle hover:text-primary"
                      }`
                    }
                  >
                    <item.icon size="18" />
                    {item.label}
                  </NavLink>
                ))}
                <div className="pt-3 border-t border-border space-y-2">
                  <Link
                    to="/login"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-body hover:bg-primary-subtle hover:text-primary transition-colors"
                  >
                    <LogIn size="18" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground"
                  >
                    Get started
                    <ArrowRight size="15" />
                  </Link>
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
