import { Link } from "react-router-dom";
import { ArrowRight, Search, BarChart3, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  const features = [
    {
      icon: Search,
      title: "Internship Discovery",
      text: "Find opportunities that match your interests with smart filters and real-time updates.",
      gradient: "from-primary to-secondary",
    },
    {
      icon: ShieldCheck,
      title: "Company Reviews",
      text: "Learn from real student experiences before you apply. Transparent ratings and honest feedback.",
      gradient: "from-secondary to-accent",
    },
    {
      icon: BarChart3,
      title: "Application Tracking",
      text: "Monitor every stage of your application from submission to offer in one clean dashboard.",
      gradient: "from-success to-info",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary to-secondary text-white">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/30 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 py-20 text-center relative z-10">
          <h1 className="text-3xl sm:text-5xl font-medium">About CareerPath</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
            CareerPath helps students discover internship opportunities, read company reviews, and track applications in one platform.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 -mt-8 relative z-20">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <div key={feature.title} className="animate-fade-in-up rounded-xl bg-surface border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ animationDelay: `${i * 150}ms` }}>
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-sm`}>
                <feature.icon size="22" />
              </div>
              <h3 className="mt-4 text-base font-medium text-heading">{feature.title}</h3>
              <p className="mt-2 text-sm text-secondary-text leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h2 className="text-[22px] font-medium text-heading">Ready to start your journey?</h2>
        <p className="mt-2 text-sm text-secondary-text">Join thousands of students already using CareerPath.</p>
        <Link to="/register" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:from-primary-hover hover:to-primary-hover shadow-sm">
          Get started <ArrowRight size="16" />
        </Link>
      </div>
    </div>
  );
}
