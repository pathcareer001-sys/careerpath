import { BriefcaseBusiness } from "lucide-react";

export default function AuthHero() {
  return (
    <div className="relative hidden lg:flex flex-col justify-center p-12 bg-white border-r border-slate-200">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
            <BriefcaseBusiness size="20" />
          </div>
          <h2 className="text-lg font-medium text-slate-900">CareerPath</h2>
        </div>
      </div>

      <h1 className="text-[22px] font-medium text-slate-900 leading-snug max-w-sm">
        Discover internships, explore companies, and track applications.
      </h1>

      <p className="mt-3 text-sm text-slate-500 max-w-sm leading-relaxed">
        The modern platform for students to find, compare, and apply to
        internship opportunities — all in one workspace.
      </p>

      <div className="mt-8 space-y-3">
        {[
          "Verified company reviews from real students",
          "Track every application stage in one place",
          "Compare internships side by side",
        ].map((text) => (
          <div key={text} className="flex items-center gap-3 text-sm text-slate-600">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
            {text}
          </div>
        ))}
      </div>

      <div className="mt-10 flex gap-8 border-t border-slate-100 pt-6">
        <div>
          <p className="text-[22px] font-medium text-slate-900">10K+</p>
          <p className="text-sm text-slate-500">Students</p>
        </div>
        <div>
          <p className="text-[22px] font-medium text-slate-900">500+</p>
          <p className="text-sm text-slate-500">Internships</p>
        </div>
        <div>
          <p className="text-[22px] font-medium text-slate-900">200+</p>
          <p className="text-sm text-slate-500">Companies</p>
        </div>
      </div>
    </div>
  );
}
