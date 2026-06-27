import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, BriefcaseBusiness, Building2, FileCheck2, Search, ShieldCheck } from "lucide-react";
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

export default function HomePage() {
  const { data: companies } = useCompanies();
  const { data: internships } = useInternships();

  const featuredCompanies = companies?.sort((a, b) => b.avgRating - a.avgRating).slice(0, 3) || [];
  const latestInternships = internships?.slice(0, 6) || [];
  const companyCount = companies?.length || 120;
  const internshipCount = internships?.length || 500;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <LandingNavbar />

      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-blue-600 via-blue-600 to-purple-700">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-14 relative z-10">
            <div className="flex flex-col justify-center animate-fade-in-up">
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-lg bg-white/15 px-3 py-1.5 text-sm font-medium text-blue-100 backdrop-blur-sm border border-white/10">
                <ShieldCheck size="15" />
                Verified internships and reviewed companies
              </div>

              <h1 className="max-w-3xl text-4xl font-medium leading-tight text-white md:text-5xl">
                CareerPath for modern internship discovery
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100">
                Discover internships, compare company experiences, and manage every application from one focused workspace built for students.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-50"
                >
                  Get started
                  <ArrowRight size="16" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 text-sm font-medium text-white transition-colors hover:bg-white/20"
                >
                  Sign in
                </Link>
              </div>

              <div className="mt-8 flex gap-8 border-t border-white/20 pt-6 flex-wrap">
                <div>
                  <p className="text-[22px] font-medium text-white">{companyCount}+</p>
                  <p className="text-sm text-blue-200">Companies</p>
                </div>
                <div>
                  <p className="text-[22px] font-medium text-white">{internshipCount}+</p>
                  <p className="text-sm text-blue-200">Open roles</p>
                </div>
                <div>
                  <p className="text-[22px] font-medium text-white">4.8</p>
                  <p className="text-sm text-blue-200">Avg rating</p>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-full rounded-xl border border-slate-200 bg-white border-blue-100/30">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Student workspace</p>
                    <p className="text-xs text-slate-500 mt-0.5">Live opportunities snapshot</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600 ring-1 ring-green-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                    Active
                  </span>
                </div>

                <div className="grid gap-4 p-5 md:grid-cols-[1fr_0.78fr]">
                  <div className="space-y-3">
                    {[
                      ["Frontend Developer Intern", "Remote"],
                      ["Product Design Intern", "Hybrid"],
                      ["Data Analyst Intern", "Onsite"],
                    ].map(([role, type]) => (
                      <div key={role} className="rounded-lg border border-slate-100 bg-blue-50/50 p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium text-slate-900">{role}</p>
                            <p className="mt-0.5 text-xs text-slate-500">{type} role</p>
                          </div>
                          <span className="rounded-md bg-blue-600 px-2 py-0.5 text-[11px] font-medium text-white">
                            New
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg border border-slate-100 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-900">Application flow</p>
                      <BriefcaseBusiness size="16" className="text-blue-600" />
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        ["Saved", "88%"],
                        ["Applied", "60%"],
                        ["Interview", "32%"],
                        ["Offer", "18%"],
                      ].map(([label, width]) => (
                        <div key={label}>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="text-slate-500">{label}</span>
                            <span className="font-medium text-slate-700">{width}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-slate-100">
                            <div className="h-1.5 rounded-full bg-blue-600" style={{ width }} />
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

        <section className="border-b border-slate-200 bg-white px-6 py-5">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm text-slate-500">Trusted by students exploring <span className="font-medium text-slate-700">{companyCount}+</span> companies</p>
            <div className="flex flex-wrap gap-2">
              {partnerNames.map((name, i) => {
                const tagColors = ["bg-blue-50 text-blue-600", "bg-amber-50 text-amber-600", "bg-purple-50 text-purple-600", "bg-emerald-50 text-emerald-600", "bg-rose-50 text-rose-600"];
                return (
                  <span key={name} className={`rounded-lg ${tagColors[i]} px-3 py-1.5 text-xs font-medium`}>
                    {name}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-4 md:grid-cols-3">
            {workflow.map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-blue-200">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                  <item.icon size="22" />
                </div>
                <h2 className="text-base font-medium text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-12">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">Featured companies</p>
              <h2 className="text-[22px] font-medium text-slate-900 mt-1">Compare companies before you apply</h2>
            </div>
            <Link to="/companies" className="text-sm font-medium text-blue-600 hover:text-blue-700">Browse companies &rarr;</Link>
          </div>

          {featuredCompanies.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredCompanies.map((company) => <CompanyCard key={company.id} company={company} />)}
            </div>
          ) : (
            <EmptyPreview icon={Building2} title="Company profiles will appear here" text="Once companies are added, students can compare ratings and reviews." />
          )}
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">Latest internships</p>
                <h2 className="text-[22px] font-medium text-slate-900 mt-1">New roles worth checking today</h2>
              </div>
              <Link to="/internships" className="text-sm font-medium text-blue-600 hover:text-blue-700">Browse internships &rarr;</Link>
            </div>

            {latestInternships.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {latestInternships.map((internship) => <InternshipCard key={internship.id} internship={internship} />)}
              </div>
            ) : (
              <EmptyPreview icon={BriefcaseBusiness} title="Internships will appear here" text="Publish roles to surface them on the landing page." />
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-medium text-blue-600 uppercase tracking-wider">Built for better decisions</p>
              <h2 className="text-[22px] font-medium text-slate-900 mt-1">Less guessing. More signal.</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                CareerPath brings opportunity discovery, company reputation, and application progress into the same flow so students can move with confidence.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, label: "Verified company pages" },
                { icon: BarChart3, label: "Student review signals" },
                { icon: Search, label: "Deadline-aware browsing" },
                { icon: FileCheck2, label: "Application status history" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-200 transition-colors">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                    <Icon size="16" />
                  </div>
                  <p className="text-sm font-medium text-slate-800">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-blue-600 to-purple-700 px-6 py-12 text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-[22px] font-medium">Start building your application pipeline.</h2>
              <p className="mt-2 text-sm text-blue-100 max-w-2xl">
                Create a student account, save interesting companies, and keep every internship opportunity organized.
              </p>
            </div>
            <Link
              to="/register"
              className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-50"
            >
              Create account
              <ArrowRight size="16" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function EmptyPreview({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size="18" />
      </div>
      <h3 className="text-sm font-medium text-slate-700">{title}</h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">{text}</p>
    </div>
  );
}
