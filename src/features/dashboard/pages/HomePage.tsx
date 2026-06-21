import { Link } from "react-router-dom";

import { Briefcase, Building2, Star, ArrowRight } from "lucide-react";

import PageContainer from "@/components/common/PageContainer";
import AppButton from "@/components/common/AppButton";
import CompanyCard from "@/features/companies/components/CompanyCard";
import InternshipCard from "@/features/internships/components/InternshipCard";
import { useCompanies } from "@/features/companies/hooks/useCompanies";
import { useInternships } from "@/features/internships/hooks/useInternships";

export default function HomePage() {
  const { data: companies } = useCompanies();

  const { data: internships } = useInternships();

  const featuredCompanies =
    companies?.sort((a, b) => b.avgRating - a.avgRating).slice(0, 3) || [];

  const latestInternships = internships?.slice(0, 6) || [];

  return (
    <PageContainer>
      {/* Hero */}
      <section
        className="
        py-24
        text-center
        "
      >
        <h1
          className="
          text-5xl
          font-bold
          tracking-tight
          "
        >
          Find Your Dream Internship
        </h1>

        <p
          className="
          mt-6
          max-w-2xl
          mx-auto
          text-lg
          text-slate-500
          "
        >
          CareerPath membantu mahasiswa menemukan tempat magang terbaik, membaca
          review perusahaan, dan melacak proses lamaran dalam satu platform.
        </p>

        <div
          className="
          mt-8
          flex
          flex-wrap
          justify-center
          gap-4
          "
        >
          <Link to="/internships">
            <AppButton>
              <Briefcase size={18} />
              Browse Internships
            </AppButton>
          </Link>

          <Link to="/companies">
            <AppButton>
              <Building2 size={18} />
              Explore Companies
            </AppButton>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section
        className="
        grid
        gap-6
        md:grid-cols-3
        py-12
        "
      >
        <div
          className="
          rounded-2xl
          border
          p-6
          text-center
          "
        >
          <Briefcase
            className="
            mx-auto
            mb-3
            "
          />

          <h3 className="text-3xl font-bold">{internships?.length || 0}</h3>

          <p className="text-slate-500">Internship Opportunities</p>
        </div>

        <div
          className="
          rounded-2xl
          border
          p-6
          text-center
          "
        >
          <Building2
            className="
            mx-auto
            mb-3
            "
          />

          <h3 className="text-3xl font-bold">{companies?.length || 0}</h3>

          <p className="text-slate-500">Companies</p>
        </div>

        <div
          className="
          rounded-2xl
          border
          p-6
          text-center
          "
        >
          <Star
            className="
            mx-auto
            mb-3
            "
          />

          <h3 className="text-3xl font-bold">{featuredCompanies.length}</h3>

          <p className="text-slate-500">Featured Companies</p>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-16">
        <h2
          className="
          text-3xl
          font-bold
          mb-8
          "
        >
          Featured Companies
        </h2>

       <div
  className="
  grid
  gap-6
  md:grid-cols-2
  lg:grid-cols-3
  "
>
  {featuredCompanies.map((company) => (
    <CompanyCard
      key={company.id}
      company={company}
    />
  ))}
</div>
      </section>

      {/* Latest Internships */}
      <section className="py-16">
        <h2
          className="
          text-3xl
          font-bold
          mb-8
          "
        >
          Latest Internships
        </h2>

        <div
  className="
  grid
  gap-6
  md:grid-cols-2
  lg:grid-cols-3
  "
>
  {latestInternships.map(
    (internship) => (
      <InternshipCard
        key={internship.id}
        internship={internship}
      />
    ),
  )}
</div>
      </section>
      <section className="py-16">
  <h2
    className="
    text-3xl
    font-bold
    text-center
    mb-10
    "
  >
    Why CareerPath?
  </h2>

  <div
    className="
    grid
    gap-6
    md:grid-cols-3
    "
  >
    <div className="border rounded-2xl p-6">
      <h3 className="font-semibold mb-2">
        Verified Companies
      </h3>

      <p className="text-slate-500">
        Temukan perusahaan terpercaya
        untuk pengalaman magang yang
        lebih aman.
      </p>
    </div>

    <div className="border rounded-2xl p-6">
      <h3 className="font-semibold mb-2">
        Real Reviews
      </h3>

      <p className="text-slate-500">
        Baca pengalaman mahasiswa lain
        sebelum melamar.
      </p>
    </div>

    <div className="border rounded-2xl p-6">
      <h3 className="font-semibold mb-2">
        Easy Application Tracking
      </h3>

      <p className="text-slate-500">
        Pantau status lamaran magang
        dalam satu dashboard.
      </p>
    </div>
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
  );
}
