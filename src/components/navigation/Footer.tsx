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
    <footer className="border-t border-blue-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_0.75fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                <BriefcaseBusiness size={20} />
              </div>
              <h3 className="text-lg font-semibold text-slate-950">
                CareerPath
              </h3>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
              Discover internships, explore company reviews, and track
              applications from one organized student workspace.
            </p>
          </div>

          <FooterColumn title="Navigation" items={navigation} />
          <FooterColumn title="Resources" items={resources} />

          <div>
            <h4 className="text-sm font-semibold text-slate-950">Contact</h4>

            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                support@careerpath.id
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                +62 812-3456-7890
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                Indonesia
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-blue-100 pt-6 text-sm text-slate-500">
          Copyright 2026 CareerPath. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: Array<{ to: string; label: string }>;
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-slate-950">{title}</h4>
      <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
        {items.map((item) => (
          <Link key={item.to} to={item.to} className="hover:text-blue-700">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
