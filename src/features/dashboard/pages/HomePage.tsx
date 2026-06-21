import { Link } from "react-router-dom";

import { Briefcase, Building2, Star, ArrowRight } from "lucide-react";

import PageContainer from "@/components/common/PageContainer";
import AppButton from "@/components/common/AppButton";
import CompanyCard from "@/features/companies/components/CompanyCard";
import InternshipCard from "@/features/internships/components/InternshipCard";
import { useCompanies } from "@/features/companies/hooks/useCompanies";
import { useInternships } from "@/features/internships/hooks/useInternships";
import AppCard from "@/components/common/AppCard";

export default function HomePage() {
  const { data: companies } = useCompanies();

  const { data: internships } = useInternships();

  const featuredCompanies =
    companies?.sort((a, b) => b.avgRating - a.avgRating).slice(0, 3) || [];

  const latestInternships = internships?.slice(0, 6) || [];

  return (
    <>
          {/* Hero */}
      <section
        className="
        relative
        overflow-hidden
        min-h-[85vh]
        flex
        items-center
        "
      >
        <div
          className="
    absolute
    -top-20
    -left-20
    h-72
    w-72
    rounded-full
    bg-blue-500/20
    blur-3xl
    "
        />

        <div
          className="
    absolute
    top-20
    right-4
    h-72
    w-72
    rounded-full
    bg-purple-500/20
    blur-3xl
    "
        />

        <div
          className="
          relative
          grid
          items-center
          gap-20
          lg:grid-cols-2
          "
        >
          {/* Left */}

          <div className="max-w-3xl">
            <div
              className="
        inline-flex
        items-center
        rounded-full
        border
        border-blue-100
        bg-blue-50
        px-4
        py-2
        text-sm
        font-medium
        text-blue-600
        "
            >
              🚀 Internship Platform for Students
            </div>

            <h1
              className="
        mt-6
        text-6xl
        font-bold
        tracking-tight
        lg:text-8xl
        "
            >
              Find Your Dream
              <span className="text-blue-600"> Internship</span>
            </h1>

            <p
              className="
        mt-6
        max-w-xl
        text-lg
        leading-relaxed
        text-slate-500
        "
            >
              Discover verified companies, explore internship opportunities,
              read real reviews, and track applications — all in one platform.
            </p>

            <div
              className="
        mt-8
        flex
        flex-wrap
        gap-4
        "
            >
              <Link to="/register">
                <AppButton>Get Started</AppButton>
              </Link>

              <Link to="/companies">
                <AppButton>Explore Companies</AppButton>
              </Link>
            </div>
          </div>

          {/* Right */}

          <div
            className="
  relative
  hidden
  lg:flex
  items-center
  justify-center
  justify-self-end
  min-h-[500px]
  "
          >
            {/* Main Card */}

            <div
              className="
    w-[520px]
    rounded-[32px]
    bg-white
    border
    border-slate-100
    shadow-2xl
    p-8
    "
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Career Dashboard</h3>

                <span
                  className="
        rounded-full
        bg-green-100
        px-3
        py-1
        text-xs
        font-medium
        text-green-600
        "
                >
                  Live
                </span>
              </div>

              <div className="mt-8 space-y-4">
                <div
                  className="
        rounded-2xl
        bg-slate-50
        p-4
        "
                >
                  <p className="font-medium">Frontend Developer Intern</p>

                  <p className="text-sm text-slate-500">Google Indonesia</p>
                </div>

                <div
                  className="
        rounded-2xl
        bg-slate-50
        p-4
        "
                >
                  <p className="font-medium">Product Designer Intern</p>

                  <p className="text-sm text-slate-500">Shopee</p>
                </div>

                <div
                  className="
        rounded-2xl
        bg-slate-50
        p-4
        "
                >
                  <p className="font-medium">UI/UX Designer Intern</p>

                  <p className="text-sm text-slate-500">Tokopedia</p>
                </div>
              </div>
            </div>

            {/* Floating Card 1 */}

            <div
              className="
    absolute
    -top-2
    -left-4
    rounded-3xl
    bg-white
    shadow-xl
    border
    border-slate-100
    px-6
    py-4
    "
            >
              <p
                className="
      text-3xl
      font-bold
      text-blue-600
      "
              >
                100+
              </p>

              <p className="text-sm text-slate-500">Internships</p>
            </div>

            {/* Floating Card 2 */}

            <div
              className="
    absolute
    bottom-10
    right-6
    rounded-3xl
    bg-white
    shadow-xl
    border
    border-slate-100
    px-6
    py-4
    "
            >
              <p
                className="
      text-3xl
      font-bold
      text-purple-600
      "
              >
                4.8★
              </p>

              <p className="text-sm text-slate-500">Company Rating</p>
            </div>
          </div>
        </div>
      </section>

    <PageContainer>

      <section
        className="
  py-10
  "
      >
        <p
          className="
    text-center
    text-sm
    uppercase
    tracking-wider
    text-slate-400
    "
        >
          Trusted by students exploring opportunities from
        </p>

        <div
          className="
    mt-8
    flex
    flex-wrap
    justify-center
    gap-10
    text-slate-400
    font-semibold
    "
        >
          <span>Google</span>
          <span>Tokopedia</span>
          <span>Shopee</span>
          <span>Traveloka</span>
          <span>Telkom</span>
        </div>
      </section>

      {/* Stats */}
      <section
        className="
  py-20
  "
      >
        <div
          className="
    grid
    gap-6
    md:grid-cols-4
    "
        >
          <AppCard>
            <div className="text-center">
              <h3
                className="
          text-4xl
          font-bold
          text-blue-600
          "
              >
                {internships?.length || 0}+
              </h3>

              <p className="mt-2 text-slate-500">Internships</p>
            </div>
          </AppCard>

          <AppCard>
            <div className="text-center">
              <h3
                className="
          text-4xl
          font-bold
          text-purple-600
          "
              >
                {companies?.length || 0}+
              </h3>

              <p className="mt-2 text-slate-500">Companies</p>
            </div>
          </AppCard>

          <AppCard>
            <div className="text-center">
              <h3
                className="
          text-4xl
          font-bold
          text-emerald-600
          "
              >
                500+
              </h3>

              <p className="mt-2 text-slate-500">Applications</p>
            </div>
          </AppCard>

          <AppCard>
            <div className="text-center">
              <h3
                className="
          text-4xl
          font-bold
          text-orange-500
          "
              >
                4.8★
              </h3>

              <p className="mt-2 text-slate-500">Average Rating</p>
            </div>
          </AppCard>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-16">
        <div className="mb-8">
          <p className="text-blue-600 font-medium">Discover</p>

          <h2
            className="
    text-4xl
    font-bold
    "
          >
            Featured Companies
          </h2>
        </div>

        <div
          className="
  grid
  gap-6
  md:grid-cols-2
  lg:grid-cols-3
  "
        >
          {featuredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </section>

      {/* Latest Internships */}
      <section className="py-16">
        <div className="mb-8">
          <p className="text-purple-600 font-medium">Opportunities</p>

          <h2
            className="
    text-4xl
    font-bold
    "
          >
            Latest Internships
          </h2>
        </div>

        <div
          className="
  grid
  gap-6
  md:grid-cols-2
  lg:grid-cols-3
  "
        >
          {latestInternships.map((internship) => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      </section>
      <section className="py-24">
        <div className="text-center">
          <p className="text-blue-600 font-medium">Why CareerPath</p>

          <h2
            className="
      mt-2
      text-4xl
      font-bold
      "
          >
            Everything You Need To Launch Your Career
          </h2>
        </div>

        <div
          className="
    mt-12
    grid
    gap-8
    md:grid-cols-3
    "
        >
          <AppCard>
            <div className="space-y-4">
              <div
                className="
      h-14
      w-14
      rounded-2xl
      bg-blue-100
      flex
      items-center
      justify-center
      "
              >
                🔍
              </div>

              <h3 className="font-semibold text-lg">Discover Companies</h3>

              <p className="text-slate-500">
                Explore verified companies and internship opportunities.
              </p>
            </div>
          </AppCard>

          <AppCard>
            <div className="space-y-4">
              <div
                className="
      h-14
      w-14
      rounded-2xl
      bg-purple-100
      flex
      items-center
      justify-center
      "
              >
                📝
              </div>

              <h3 className="font-semibold text-lg">Apply Easily</h3>

              <p className="text-slate-500">
                Apply to internships in just a few clicks.
              </p>
            </div>
          </AppCard>

          <AppCard>
            <div className="space-y-4">
              <div
                className="
      h-14
      w-14
      rounded-2xl
      bg-green-100
      flex
      items-center
      justify-center
      "
              >
                📈
              </div>

              <h3 className="font-semibold text-lg">Track Progress</h3>

              <p className="text-slate-500">
                Monitor every application from one dashboard.
              </p>
            </div>
          </AppCard>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div
          className="
          rounded-3xl
          border
          p-10
          text-center
          "
        >
          <h2
            className="
            text-3xl
            font-bold
            "
          >
            Ready to Start Your Career Journey?
          </h2>

          <p
            className="
            mt-4
            text-slate-500
            "
          >
            Temukan peluang magang terbaik dan bangun pengalaman profesionalmu
            mulai hari ini.
          </p>

          <div className="mt-6">
            <Link to="/register">
              <AppButton>
                Get Started
                <ArrowRight size={18} />
              </AppButton>
            </Link>
          </div>
        </div>
      </section>
    </PageContainer>
    </>
  );
}
