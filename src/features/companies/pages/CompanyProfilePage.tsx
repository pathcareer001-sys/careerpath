import { useState, useEffect } from "react";
import PageContainer from "@/components/common/PageContainer";
import AppCard from "@/components/common/AppCard";
import AppInput from "@/components/common/AppInput";
import AppTextarea from "@/components/common/AppTextarea";
import AppButton from "@/components/common/AppButton";
import VerifiedBadge from "@/components/company/VerifiedBadge";
import { useAuth } from "@/hooks/useAuth";
import { useMyCompany } from "../hooks/useMyCompany";
import { useCreateCompany } from "../hooks/useCreateCompany";
import { useUpdateCompany } from "../hooks/useUpdateCompany";
import { uploadImage } from "@/services/cloudinaryService";
import { toast } from "sonner";
import { Building2, Globe, MapPin } from "lucide-react";

export default function CompanyProfilePage() {
  const { user } = useAuth();
  const { data: company } = useMyCompany(user?.uid || "");
  const createCompany = useCreateCompany();
  const updateCompany = useUpdateCompany();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!company) return;
    setName(company.name || "");
    setLocation(company.location || "");
    setIndustry(company.industry || "");
    setWebsite(company.website || "");
    setDescription(company.description || "");
    setLogo(company.logo || "");
  }, [company]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = await uploadImage(file);
    setLogo(imageUrl);
  };

  const handleCreate = async () => {
    if (!user) return;
    try {
      await createCompany.mutateAsync({
        ownerId: user.uid,
        name, logo, description, location, industry, website,
        verified: false, avgRating: 0, reviewCount: 0,
      });
      toast.success("Profil perusahaan berhasil dibuat");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    if (!company) return;
    await updateCompany.mutateAsync({
      id: company.id,
      data: { name, logo, description, location, industry, website },
    });
    toast.success("Profil perusahaan berhasil diperbarui");
  };

  return (
    <PageContainer>
      <div className="animate-fade-in-up">
        <AppCard className="border border-border-light shadow-card">
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-center gap-6">
            <div className="h-20 w-20 overflow-hidden rounded-2xl bg-surface border border-border flex items-center justify-center shrink-0">
              {logo ? (
                <img src={logo} alt={name} className="h-full w-full object-cover" />
              ) : (
                <Building2 size="32" className="text-primary" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-medium">{name || "Nama Perusahaan"}</h1>
                <VerifiedBadge show={company?.subscription === "premium"} />
              </div>
              <p className="mt-1 text-body">{industry || "Industri"}</p>
              <p className="text-body text-sm flex items-center gap-1 mt-1">
                <MapPin size="14" /> {location || "Lokasi"}
              </p>
            </div>
          </div>
        </AppCard>
      </div>

      <div className="mt-6 space-y-6 animate-fade-in-up animate-delay-100">
        {company && (
          <AppCard className={`border ${company.verified ? "border-success/30 bg-success/5" : company.verificationRequested ? "border-warning/30 bg-warning/5" : "border-border"}`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-full ${company.verified ? "bg-success/10 text-success" : company.verificationRequested ? "bg-warning/10 text-warning" : "bg-section text-secondary-text"} flex items-center justify-center`}>
                  {company.verified ? "✓" : company.verificationRequested ? "⏳" : "○"}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-heading">
                    {company.verified ? "Perusahaan Terverifikasi" : company.verificationRequested ? "Verifikasi Diminta" : "Belum Terverifikasi"}
                  </h3>
                  <p className="text-xs text-secondary-text">
                    {company.verified
                      ? "Perusahaan Anda terverifikasi dan menampilkan lencana terverifikasi."
                      : company.verificationRequested
                        ? "Permintaan verifikasi Anda sedang ditinjau oleh tim kami."
                        : "Verifikasi perusahaan Anda untuk membangun kepercayaan dengan mahasiswa."}
                  </p>
                </div>
              </div>
              {!company.verified && !company.verificationRequested && (
                <AppButton
                  onClick={async () => {
                    await updateCompany.mutateAsync({ id: company.id, data: { verificationRequested: true } });
                    toast.success("Verifikasi diminta");
                  }}
                  disabled={updateCompany.isPending}
                  className="text-xs h-8 px-3"
                >
                  Minta Verifikasi
                </AppButton>
              )}
              {company.verificationRequested && (
                <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 px-3 py-1 text-xs font-medium text-warning">
                  Menunggu Review
                </span>
              )}
            </div>
          </AppCard>
        )}

        <AppCard>
          <h2 className="text-base font-medium mb-4">Informasi Perusahaan</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <AppInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Perusahaan" />
            <AppInput value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Lokasi" />
            <AppInput value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="Industri" />
            <AppInput value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website" />
          </div>

          <label className="flex h-40 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border text-secondary-text hover:border-primary transition-colors mt-4">
            <input hidden type="file" accept="image/*" onChange={handleLogoUpload} />
            {logo ? (
              <img src={logo} alt="Company Logo" className="h-full w-full rounded-xl object-cover" />
            ) : (
              <span className="text-sm">Unggah Logo Perusahaan</span>
            )}
          </label>

          <div className="mt-4">
            <AppTextarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ceritakan tentang perusahaan, budaya, misi, dan peluang kepada mahasiswa..."
              className="min-h-[160px]"
            />
          </div>

          <div className="mt-6">
            <AppButton variant="secondary" className="h-11 w-full" onClick={company ? handleUpdate : handleCreate}>
              {company ? "Perbarui Profil Perusahaan" : "Buat Profil Perusahaan"}
            </AppButton>
          </div>
        </AppCard>

        <AppCard>
          <h2 className="text-base font-medium mb-4">Pratinjau</h2>
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 overflow-hidden rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shrink-0">
              {logo ? (
                <img src={logo} alt={name} className="h-full w-full object-cover" />
              ) : (
                <Building2 size="24" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-heading flex items-center gap-1.5">
                {name || "Nama Perusahaan"}
                <VerifiedBadge show={company?.subscription === "premium"} size={14} />
              </h3>
              <p className="text-sm text-secondary-text">{industry || "Industri"} &middot; {location || "Lokasi"}</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-body">{description || "Deskripsi perusahaan"}</p>
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:text-primary transition-colors">
              <Globe size="14" /> Kunjungi Website →
            </a>
          )}
        </AppCard>
      </div>
    </PageContainer>
  );
}
