import { CheckCircle2, ShieldCheck } from "lucide-react";

const features = [
  "Verified company reviews from real students",
  "Track every application stage in one place",
  "Deadline-aware browsing with smart filters",
  "Compare internships side by side",
];

export default function AuthHero() {
  return (
    <div className="relative hidden overflow-hidden border-r border-blue-100 bg-white lg:flex">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-blue-100/80 to-transparent" />

      <div className="relative z-10 flex flex-col justify-center p-12">
        <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
          <ShieldCheck size={16} />
          CareerPath Platform
        </div>

        <h1 className="text-5xl font-semibold leading-[1.02] tracking-normal text-slate-950">
          Start Your
          <br />
          Career Journey
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
          Discover internships, explore companies, and track applications in
          one modern platform built for students.
        </p>

        <div className="mt-8 space-y-4">
          {features.map((text) => (
            <div key={text} className="flex items-center gap-3">
              <CheckCircle2 size={20} className="shrink-0 text-blue-600" />
              <span className="text-slate-700">{text}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4 border-t border-blue-100 pt-8">
          <div>
            <p className="text-3xl font-semibold text-blue-700">10K+</p>
            <p className="mt-1 text-sm text-slate-500">Students</p>
          </div>
          <div className="border-x border-blue-100 px-4">
            <p className="text-3xl font-semibold text-blue-700">500+</p>
            <p className="mt-1 text-sm text-slate-500">Internships</p>
          </div>
          <div className="pl-4">
            <p className="text-3xl font-semibold text-blue-700">200+</p>
            <p className="mt-1 text-sm text-slate-500">Companies</p>
          </div>
        </div>
      </div>
    </div>
  );
}
