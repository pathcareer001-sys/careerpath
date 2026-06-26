import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  Compass,
  FileCheck2,
  Search,
  ShieldCheck,
  Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import LandingNavbar from "@/components/navigation/LandingNavbar";
import Footer from "@/components/navigation/Footer";
import CompanyCard from "@/features/companies/components/CompanyCard";
import InternshipCard from "@/features/internships/components/InternshipCard";
import { useCompanies } from "@/features/companies/hooks/useCompanies";
import { useInternships } from "@/features/internships/hooks/useInternships";

const partnerNames = ["Google", "Tokopedia", "Shopee", "Traveloka", "Telkom"];

const workflow = [
  {
    icon: Search,
    title: "Find the right fit",
    text: "Filter internships by company, work style, and location without jumping between job boards.",
  },
  {
    icon: FileCheck2,
    title: "Apply with context",
    text: "See reviews, ratings, and company details before you send your application.",
  },
  {
    icon: BarChart3,
    title: "Track every step",
    text: "Keep submitted, reviewed, interview, and offer stages in one tidy dashboard.",
  },
];

const decisionSignals: Array<{ icon: LucideIcon; label: string }> = [
  { icon: BadgeCheck, label: "Verified company pages" },
  { icon: Star, label: "Student review signals" },
  { icon: Clock3, label: "Deadline-aware browsing" },
  { icon: CheckCircle2, label: "Application status history" },
];

export default function HomePage() {
  const { data: companies } = useCompanies();
  const { data: internships } = useInternships();

  const featuredCompanies =
    companies?.sort((a, b) => b.avgRating - a.avgRating).slice(0, 3) || [];
  const latestInternships = internships?.slice(0, 6) || [];

  const companyCount = companies?.length || 120;
  const internshipCount = internships?.length || 500;

  return (
    <div className="min-h-screen bg-blue-50/40 text-slate-950">
      <LandingNavbar />

      <main>
        <section className="relative overflow-hidden border-b border-blue-100 bg-white">
          <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-blue-100/80 to-transparent" />
          <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-14">
            <div className="relative flex flex-col justify-center">
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                <ShieldCheck size={16} />
                Verified internships and reviewed companies
              </div>

              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-normal text-slate-950 md:text-6xl lg:text-7xl">
                CareerPath for modern internship discovery
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Discover internships, compare company experiences, and manage
                every application from one focused workspace built for students.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Get started
                  <ArrowRight size={17} />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Sign in
                </Link>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 border-y border-blue-100">
                <div className="py-5 pr-4">
                  <p className="text-3xl font-semibold text-blue-700">
                    {companyCount}+
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Companies</p>
                </div>
                <div className="border-x border-blue-100 px-4 py-5">
                  <p className="text-3xl font-semibold text-blue-700">
                    {internshipCount}+
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Open roles</p>
                </div>
                <div className="py-5 pl-4">
                  <p className="text-3xl font-semibold text-blue-700">4.8</p>
                  <p className="mt-1 text-sm text-slate-500">Avg rating</p>
                </div>
              </div>
            </div>

            <div className="relative flex items-center">
              <div className="w-full overflow-hidden rounded-lg border border-blue-100 bg-white text-slate-950 shadow-2xl shadow-blue-200/60">
                <div className="flex items-center justify-between border-b border-blue-100 bg-blue-600 px-5 py-4 text-white">
                  <div>
                    <p className="text-sm font-semibold">Student workspace</p>
                    <p className="mt-1 text-xs text-blue-100">
                      Live opportunities snapshot
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                    <span className="h-2 w-2 rounded-full bg-cyan-200" />
                    Active
                  </span>
                </div>

                <div className="grid gap-5 p-5 md:grid-cols-[1fr_0.78fr]">
                  <div className="space-y-3">
                    {[
                      ["Frontend Developer Intern", "Remote", "Reviewed"],
                      ["Product Design Intern", "Hybrid", "Interviewing"],
                      ["Data Analyst Intern", "Onsite", "New"],
                    ].map(([role, type, status]) => (
                      <div
                        key={role}
                        className="rounded-lg border border-blue-100 bg-blue-50/60 p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-semibold">{role}</p>
                            <p className="mt-1 text-sm text-slate-500">
                              {type} role
                            </p>
                          </div>
                          <span className="rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                            {status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg border border-blue-100 bg-white p-4 text-slate-950">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Application flow</p>
                      <BriefcaseBusiness size={18} className="text-blue-600" />
                    </div>
                    <div className="mt-5 space-y-4">
                      {[
                        ["Saved", "24"],
                        ["Applied", "12"],
                        ["Interview", "4"],
                        ["Offer", "2"],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span className="text-slate-500">{label}</span>
                            <span className="font-semibold">{value}</span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-100">
                            <div
                              className="h-2 rounded-full bg-blue-600"
                              style={{
                                width:
                                  label === "Saved"
                                    ? "88%"
                                    : label === "Applied"
                                      ? "60%"
                                      : label === "Interview"
                                        ? "32%"
                                        : "18%",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-blue-100 bg-white px-6 py-5">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm font-semibold text-slate-500">
              Students explore opportunities from trusted company profiles
            </p>
            <div className="flex flex-wrap gap-3">
              {partnerNames.map((name) => (
                <span
                  key={name}
                  className="rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2 text-sm font-semibold text-blue-700"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {workflow.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-blue-100 bg-white p-6 shadow-sm shadow-blue-100/60"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <item.icon size={20} />
                </div>
                <h2 className="text-lg font-semibold text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                <Building2 size={16} />
                Featured companies
              </div>
              <h2 className="text-3xl font-semibold tracking-normal text-slate-950 md:text-4xl">
                Compare companies before you apply
              </h2>
            </div>
            <Link
              to="/companies"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-950"
            >
              Browse companies
              <ArrowRight size={16} />
            </Link>
          </div>

          {featuredCompanies.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          ) : (
            <EmptyPreview
              icon={Building2}
              title="Company profiles will appear here"
              text="Once companies are added, students can compare ratings, locations, and review counts."
            />
          )}
        </section>

        <section className="border-y border-blue-100 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
              <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                  <Compass size={16} />
                  Latest internships
                </div>
                <h2 className="text-3xl font-semibold tracking-normal text-slate-950 md:text-4xl">
                  New roles worth checking today
                </h2>
              </div>
              <Link
                to="/internships"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-950"
              >
                Browse internships
                <ArrowRight size={16} />
              </Link>
            </div>

            {latestInternships.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {latestInternships.map((internship) => (
                  <InternshipCard
                    key={internship.id}
                    internship={internship}
                  />
                ))}
              </div>
            ) : (
              <EmptyPreview
                icon={BriefcaseBusiness}
                title="Internships will appear here"
                text="Publish roles to surface them on the landing page for students."
              />
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
                <BookOpenCheck size={16} />
                Built for better decisions
              </div>
              <h2 className="text-3xl font-semibold tracking-normal text-slate-950 md:text-4xl">
                Less guessing. More signal.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                CareerPath brings opportunity discovery, company reputation,
                and application progress into the same flow so students can move
                with confidence.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {decisionSignals.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-lg border border-blue-100 bg-white p-4 shadow-sm shadow-blue-100/60"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                    <Icon size={18} />
                  </div>
                  <p className="font-semibold text-slate-800">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-blue-700 px-6 py-16 text-white lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-normal md:text-4xl">
                Start building your application pipeline.
              </h2>
              <p className="mt-3 max-w-2xl text-blue-100">
                Create a student account, save interesting companies, and keep
                every internship opportunity organized.
              </p>
            </div>
            <Link
              to="/register"
              className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Create account
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function EmptyPreview({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        <Icon size={22} />
      </div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {text}
      </p>
    </div>
  );
}
