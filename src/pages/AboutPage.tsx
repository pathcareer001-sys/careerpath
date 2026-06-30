import { Link } from "react-router-dom";
import { ArrowRight, Search, BarChart3, ShieldCheck } from "lucide-react";
import SEO from "@/components/seo/SEO";

export default function AboutPage() {
  const features = [
    {
      icon: Search,
      title: "Penemuan Magang",
      text: "Temukan peluang yang sesuai dengan minatmu melalui filter cerdas dan pembaruan waktu nyata.",
      gradient: "from-primary to-secondary",
    },
    {
      icon: ShieldCheck,
      title: "Ulasan Perusahaan",
      text: "Belajar dari pengalaman mahasiswa nyata sebelum melamar. Rating transparan dan umpan balik jujur.",
      gradient: "from-secondary to-accent",
    },
    {
      icon: BarChart3,
      title: "Pelacakan Lamaran",
      text: "Pantau setiap tahap lamaranmu dari pengiriman hingga penawaran dalam satu dashboard yang bersih.",
      gradient: "from-success to-info",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Tentang" description="Pelajari lebih lanjut tentang CareerPath dan bagaimana kami membantu mahasiswa menemukan magang impian." />
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/[0.04] to-section text-heading">
        <div className="absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 rounded-full bg-white/60 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 py-20 text-center relative z-10">
          <h1 className="text-3xl sm:text-5xl font-medium">Tentang CareerPath</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-body">
            CareerPath membantu mahasiswa menemukan peluang magang, membaca ulasan perusahaan, dan melacak lamaran dalam satu platform.
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
        <h2 className="text-[22px] font-medium text-heading">Siap memulai perjalananmu?</h2>
        <p className="mt-2 text-sm text-secondary-text">Bergabunglah dengan ribuan mahasiswa yang sudah menggunakan CareerPath.</p>
        <Link to="/register" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:from-primary-hover hover:to-primary-hover shadow-sm">
          Mulai <ArrowRight size="16" />
        </Link>
      </div>
    </div>
  );
}
