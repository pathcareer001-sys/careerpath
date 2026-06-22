import { Briefcase, Building2, Users, CheckCircle2 } from "lucide-react";

function Feature({ text }: { text: string }) {
  return (
    <div
      className="
      flex
      items-center
      gap-3
      "
    >
      <CheckCircle2
        size={20}
        className="
        text-green-300
        shrink-0
        "
      />

      <span>{text}</span>
    </div>
  );
}

export default function AuthHero() {
  return (
    <div
      className="
    hidden
    lg:flex
    relative
    overflow-hidden
    bg-gradient-to-br
    from-blue-700
    via-blue-600
    to-indigo-600
    text-white
    p-12
    "
    >
      {/* Glow 1 */}

      <div
        className="
      absolute
      h-[600px]
      w-[600px]
      rounded-full
      bg-white/10
      blur-3xl
      -bottom-40
      -left-20
      "
      />

      {/* Glow 2 */}

      <div
        className="
      absolute
      h-[500px]
      w-[500px]
      rounded-full
      bg-cyan-300/10
      blur-3xl
      top-0
      right-0
      "
      />

      {/* Content */}

      <div
        className="
      relative
      z-10
      max-w-xl
      "
      >
        <div className="mb-12">
          <span
            className="
          inline-flex
          rounded-full
          bg-white/15
          px-4
          py-2
          text-sm
          font-medium
          backdrop-blur
          "
          >
            🚀 CareerPath Platform
          </span>

          <h1
            className="
          mt-6
          text-6xl
          font-bold
          leading-tight
          "
          >
            Start Your
            <br />
            Career Journey
          </h1>

          <p
            className="
          mt-6
          text-lg
          text-blue-100
          "
          >
            Discover internships, explore companies, and track applications in
            one modern platform.
          </p>
        </div>

        <div className="space-y-4">
          <Feature text="Discover internships" />
          <Feature text="Read company reviews" />
          <Feature text="Track applications" />
          <Feature text="Build your portfolio" />
        </div>

        <div
          className="
        mt-12
        grid
        grid-cols-3
        gap-4
        "
        >
          <HeroStatCard
            icon={<Users size={20} />}
            value="10K+"
            label="Students"
          />

          <HeroStatCard
            icon={<Briefcase size={20} />}
            value="500+"
            label="Internships"
          />

          <HeroStatCard
            icon={<Building2 size={20} />}
            value="200+"
            label="Companies"
          />
        </div>
      </div>

      {/* Floating Dashboard */}

      <div
        className="
      absolute
      right-16
      top-1/2
      -translate-y-1/2
      w-[360px]
      rounded-3xl
      bg-white
      p-6
      text-slate-900
      shadow-2xl
      "
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Internship Dashboard</h3>

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

        <div className="mt-6 space-y-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="font-medium">Frontend Developer Intern</p>

            <p className="text-sm text-slate-500">Google Indonesia</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="font-medium">UI/UX Designer Intern</p>

            <p className="text-sm text-slate-500">Tokopedia</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="font-medium">Product Designer Intern</p>

            <p className="text-sm text-slate-500">Shopee</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroStatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div
      className="
      rounded-2xl
      border
      border-white/20
      bg-white/10
      p-4
      "
    >
      {icon}

      <p className="mt-3 text-xl font-bold">{value}</p>

      <p className="text-sm text-blue-100">{label}</p>
    </div>
  );
}
