import { BriefcaseBusiness } from "lucide-react";

export default function AuthHero() {
  return (
    <div className="relative hidden lg:flex flex-col justify-center p-12 bg-[#2563EB]">
      <div className="absolute inset-0 bg-[radial ellipse_at_top_right,_rgba(255,255,255,0.05)_0%,_transparent_50%]" />
      <div className="mb-8 relative">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-white">
            <BriefcaseBusiness size="20" />
          </div>
          <h2 className="text-lg font-medium text-white">CareerPath</h2>
        </div>
      </div>

      <h1 className="text-[22px] font-medium text-white leading-snug max-w-sm relative">
        Discover internships, explore companies, and track applications.
      </h1>

      <p className="mt-3 text-sm text-blue-100 max-w-sm leading-relaxed relative">
        The modern platform for students to find, compare, and apply to
        internship opportunities — all in one workspace.
      </p>

      <div className="mt-8 space-y-3 relative">
        {[
          "Verified company reviews from real students",
          "Track every application stage in one place",
          "Compare internships side by side",
        ].map((text) => (
          <div key={text} className="flex items-center gap-3 text-sm text-blue-50">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
              <span className="text-white text-[10px]">✓</span>
            </div>
            {text}
          </div>
        ))}
      </div>

      <div className="mt-10 flex gap-8 border-t border-white/20 pt-6 relative">
        <div>
          <p className="text-[22px] font-medium text-white">10K+</p>
          <p className="text-sm text-blue-200">Students</p>
        </div>
        <div>
          <p className="text-[22px] font-medium text-white">500+</p>
          <p className="text-sm text-blue-200">Internships</p>
        </div>
        <div>
          <p className="text-[22px] font-medium text-white">200+</p>
          <p className="text-sm text-blue-200">Companies</p>
        </div>
      </div>
    </div>
  );
}
