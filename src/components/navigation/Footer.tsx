import { Link } from "react-router-dom";
import { BriefcaseBusiness, Mail, MapPin, Phone } from "lucide-react";

const navigation = [
  { to: "/", label: "Home" },
  { to: "/companies", label: "Companies" },
  { to: "/internships", label: "Internships" },
  { to: "/about", label: "About" },
];

const resources = [
  { to: "/contact", label: "Contact" },
  { to: "/login", label: "Login" },
  { to: "/register", label: "Register" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-gradient-to-br from-white to-accent">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_0.75fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-white shadow-sm">
                <BriefcaseBusiness size="18" />
              </div>
              <h3 className="text-sm font-medium text-heading">CareerPath</h3>
            </div>
            <p className="mt-3 max-w-sm text-sm text-secondary-text leading-relaxed">
              Discover internships, explore company reviews, and track applications from one organized workspace.
            </p>
          </div>

          <FooterColumn title="Navigation" items={navigation} />
          <FooterColumn title="Resources" items={resources} />

          <div>
            <h4 className="text-sm font-medium text-heading">Contact</h4>
            <div className="mt-3 space-y-2 text-sm text-secondary-text">
              <div className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail size="14" />
                support@careerpath.id
              </div>
              <div className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone size="14" />
                +62 812-3456-7890
              </div>
              <div className="flex items-center gap-2 hover:text-primary transition-colors">
                <MapPin size="14" />
                Indonesia
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-divider pt-6 text-sm text-secondary-text">
          Copyright 2026 CareerPath. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: Array<{ to: string; label: string }> }) {
  return (
    <div>
      <h4 className="text-sm font-medium text-heading">{title}</h4>
      <div className="mt-3 flex flex-col gap-2 text-sm text-secondary-text">
        {items.map((item) => (
          <Link key={item.to} to={item.to} className="hover:text-primary transition-colors duration-200">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
