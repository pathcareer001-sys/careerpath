import { Link } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  FileCheck2,
  Search,
  ShieldCheck,
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
    title: "Temukan yang tepat",
    text: "Filter magang berdasarkan perusahaan, gaya kerja, dan lokasi tanpa berpindah-pindah papan lowongan.",
  },
  {
    icon: FileCheck2,
    title: "Lamar dengan konteks",
    text: "Lihat ulasan, rating, dan detail perusahaan sebelum mengirim lamaran.",
  },
  {
    icon: BarChart3,
    title: "Pantau setiap tahap",
    text: "Simpan tahap terkirim, ditinjau, wawancara, dan ditawarkan dalam satu dashboard yang rapi.",
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
    <div className="min-h-screen bg-background text-heading">
      <SEO />
      <LandingNavbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-accent via-surface to-section">
          <div className="absolute inset-0 bg-dot-pattern" />
          <div className="absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 rounded-full bg-primary/[0.03] blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-40 h-40 md:w-80 md:h-80 rounded-full bg-primary/[0.02] blur-3xl" />
          <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-14 relative z-10">
            <div className="flex flex-col justify-center animate-fade-in-up">
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-lg bg-primary-subtle px-3 py-1.5 text-sm font-medium text-primary backdrop-blur-sm border border-primary/20">
                <ShieldCheck size="15" />
                Magang terverifikasi & perusahaan terpercaya
              </div>

              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight leading-tight text-heading md:text-5xl">
                CareerPath untuk penemuan magang modern
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-body">
                Temukan magang, bandingkan pengalaman perusahaan, dan kelola setiap lamaran dari satu ruang kerja terpadu yang dirancang untuk mahasiswa.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-button transition-all duration-200 hover:bg-primary-hover hover:shadow-button-hover active:bg-primary-active"
                >
                  Mulai
                  <ArrowRight size="16" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-5 text-sm font-medium text-body transition-all duration-200 hover:border-primary/30 hover:bg-primary-subtle hover:text-primary"
                >
                  Masuk
                </Link>
              </div>

              <div className="mt-8 flex gap-8 border-t border-border pt-6 flex-wrap">
                <div>
                  <p className="text-[22px] font-semibold tracking-tight text-heading">{companyCount}+</p>
                  <p className="text-sm text-secondary-text">Perusahaan</p>
                </div>
                <div>
                  <p className="text-[22px] font-semibold tracking-tight text-heading">{internshipCount}+</p>
                  <p className="text-sm text-secondary-text">Lowongan aktif</p>
                </div>
                <div>
                  <p className="text-[22px] font-semibold tracking-tight text-heading">4.8</p>
                  <p className="text-sm text-secondary-text">Rata-rata rating</p>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-full rounded-xl border border-border-light bg-surface shadow-card">
                <div className="flex items-center justify-between border-b border-divider px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-heading tracking-tight">Ruang kerja mahasiswa</p>
                    <p className="text-xs text-secondary-text mt-0.5">Gambaran lowongan terkini</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-success/10 px-2.5 py-1 text-xs font-medium text-success ring-1 ring-success/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    Aktif
                  </span>
                </div>

                <div className="grid gap-4 p-5 md:grid-cols-[1fr_0.78fr]">
                  <div className="space-y-3">
                    {[
                      ["Magang Frontend Developer", "Remote"],
                      ["Magang Product Design", "Hybrid"],
                      ["Magang Data Analyst", "Onsite"],
                    ].map(([role, type]) => (
                      <div key={role} className="rounded-lg border border-border-light bg-surface-alt/50 p-4 shadow-xs">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium text-heading">{role}</p>
                            <p className="mt-0.5 text-xs text-secondary-text">Posisi {type.toLowerCase()}</p>
                          </div>
                          <span className="rounded-md bg-primary px-2 py-0.5 text-[11px] font-medium text-primary-foreground">
                            Baru
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg border border-divider bg-surface p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-heading tracking-tight">Alur lamaran</p>
                      <BriefcaseBusiness size="16" className="text-primary" />
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        ["Disimpan", "88%"],
                        ["Dilamar", "60%"],
                        ["Wawancara", "32%"],
                        ["Ditawarkan", "18%"],
                      ].map(([label, width]) => (
                        <div key={label}>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="text-secondary-text">{label}</span>
                            <span className="font-medium text-body">{width}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-section">
                            <div className="h-1.5 rounded-full bg-primary" style={{ width }} />
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

        {/* Partners */}
        <section className="border-b border-border bg-surface px-6 py-5">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm text-secondary-text">Dipercaya mahasiswa dari <span className="font-medium text-body">{companyCount}+</span> perusahaan</p>
            <div className="flex flex-wrap gap-2">
              {partnerNames.map((name, i) => {
                const tagColors = ["bg-primary-subtle text-primary", "bg-warning/5 text-warning", "bg-info/10 text-info", "bg-success/5 text-success", "bg-error/5 text-error"];
                return (
                  <span key={name} className={`rounded-lg ${tagColors[i]} px-3 py-1.5 text-xs font-medium`}>
                    {name}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-5 md:grid-cols-3">
            {workflow.map((item) => (
              <div key={item.title} className="rounded-xl border border-border-light bg-surface p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-border">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-sm">
                  <item.icon size="22" />
                </div>
                <h3 className="text-base font-semibold tracking-tight text-heading">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary-text">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured companies */}
        <section className="mx-auto max-w-7xl px-6 pb-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider">Perusahaan unggulan</p>
              <h2 className="text-[22px] font-semibold tracking-tight text-heading mt-1">Bandingkan perusahaan sebelum melamar</h2>
            </div>
            <Link to="/companies" className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">Jelajahi perusahaan &rarr;</Link>
          </div>

          {featuredCompanies.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featuredCompanies.map((company) => <CompanyCard key={company.id} company={company} />)}
            </div>
          ) : (
            <EmptyPreview icon={Building2} title="Profil perusahaan akan muncul di sini" text="Setelah perusahaan ditambahkan, mahasiswa dapat membandingkan rating dan ulasan." />
          )}
        </section>

        {/* Latest internships */}
        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">Magang terbaru</p>
                <h2 className="text-[22px] font-semibold tracking-tight text-heading mt-1">Lowongan baru yang patut dicek hari ini</h2>
              </div>
              <Link to="/internships" className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">Jelajahi magang &rarr;</Link>
            </div>

            {latestInternships.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {latestInternships.map((internship) => <InternshipCard key={internship.id} internship={internship} />)}
              </div>
            ) : (
              <EmptyPreview icon={BriefcaseBusiness} title="Magang akan muncul di sini" text="Publikasikan lowongan untuk menampilkannya di halaman beranda." />
            )}
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider">Dibangun untuk keputusan lebih baik</p>
              <h2 className="text-[22px] font-semibold tracking-tight text-heading mt-1">Minimal tebak-tebakan. Maksimal keyakinan.</h2>
              <p className="mt-3 text-sm leading-relaxed text-secondary-text">
                CareerPath menyatukan penemuan peluang, reputasi perusahaan, dan progres lamaran dalam satu alur sehingga mahasiswa dapat melangkah dengan percaya diri.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, label: "Halaman perusahaan terverifikasi" },
                { icon: BarChart3, label: "Sinyal ulasan mahasiswa" },
                { icon: Search, label: "Jelajah berdasarkan tenggat" },
                { icon: FileCheck2, label: "Riwayat status lamaran" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl border border-border-light bg-surface p-4 shadow-card transition-all duration-200 hover:shadow-card-hover hover:border-border">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-white shadow-sm">
                    <Icon size="16" />
                  </div>
                  <p className="text-sm font-medium text-heading">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-accent via-surface-alt to-section px-6 py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-dot-pattern" />
          <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between relative z-10">
            <div>
              <h2 className="text-[22px] font-semibold tracking-tight text-heading">Mulai bangun pipeline lamaranmu.</h2>
              <p className="mt-2 text-sm text-body max-w-2xl leading-relaxed">
                Buat akun mahasiswa, simpan perusahaan menarik, dan jaga setiap peluang magang tetap terorganisir.
              </p>
            </div>
            <Link
              to="/register"
              className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-button transition-all duration-200 hover:bg-primary-hover hover:shadow-button-hover active:bg-primary-active shrink-0"
            >
              Buat akun
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
    <div className="rounded-xl border border-dashed border-border-light bg-surface p-10 text-center shadow-card">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-subtle text-primary">
        <Icon size="18" />
      </div>
      <h3 className="text-sm font-medium text-body">{title}</h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-secondary-text leading-relaxed">{text}</p>
    </div>
  );
}
