import { BriefcaseBusiness } from "lucide-react";

export default function AuthHero() {
  return (
    <div className="relative hidden lg:flex flex-col justify-center p-12 bg-accent overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern" />
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-primary/[0.02] blur-3xl" />
      <div className="mb-8 relative">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <BriefcaseBusiness size="20" />
          </div>
          <h2 className="text-lg font-semibold tracking-tight text-heading">CareerPath</h2>
        </div>
      </div>

      <h1 className="text-[22px] font-semibold tracking-tight text-heading leading-snug max-w-sm relative">
        Discover internships, explore companies, and track applications.
      </h1>

      <p className="mt-3 text-sm text-body max-w-sm leading-relaxed relative">
        The modern platform for students to find, compare, and apply to
        internship opportunities — all in one workspace.
      </p>

      <div className="mt-8 space-y-3 relative">
        {[
          "Verified company reviews from real students",
          "Track every application stage in one place",
          "Compare internships side by side",
        ].map((text) => (
          <div key={text} className="flex items-center gap-3 text-sm text-body">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
              <span className="text-primary text-[10px] font-bold">✓</span>
            </div>
            {text}
          </div>
        ))}
      </div>

      <div className="mt-10 flex gap-8 border-t border-border pt-6 relative">
        <div>
          <p className="text-[22px] font-semibold tracking-tight text-heading">10K+</p>
          <p className="text-sm text-secondary-text">Students</p>
        </div>
        <div>
          <p className="text-[22px] font-semibold tracking-tight text-heading">500+</p>
          <p className="text-sm text-secondary-text">Internships</p>
        </div>
        <div>
          <p className="text-[22px] font-semibold tracking-tight text-heading">200+</p>
          <p className="text-sm text-secondary-text">Companies</p>
        </div>
      </div>
    </div>
  );
}
