import { useState, useEffect } from "react";
import PageContainer from "@/components/common/PageContainer";
import AppCard from "@/components/common/AppCard";
import AppInput from "@/components/common/AppInput";
import AppTextarea from "@/components/common/AppTextarea";
import AppButton from "@/components/common/AppButton";
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
      toast.success("Company profile created successfully");
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
    toast.success("Company profile updated successfully");
  };

  return (
    <PageContainer>
      <div className="animate-fade-in-up">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-blue-600 to-purple-700 p-6 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="relative z-10 flex items-center gap-6">
            <div className="h-20 w-20 overflow-hidden rounded-2xl bg-white/20 backdrop-blur-sm border border-white/10 flex items-center justify-center shrink-0">
              {logo ? (
                <img src={logo} alt={name} className="h-full w-full object-cover" />
              ) : (
                <Building2 size="32" className="text-white" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-medium">{name || "Company Name"}</h1>
              <p className="mt-1 text-blue-100">{industry || "Industry"}</p>
              <p className="text-blue-100 text-sm flex items-center gap-1 mt-1">
                <MapPin size="14" /> {location || "Location"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-6 animate-fade-in-up animate-delay-100">
        {company && (
          <AppCard className={`border ${company.verified ? "border-emerald-200 bg-emerald-50/30" : company.verificationRequested ? "border-amber-200 bg-amber-50/30" : "border-slate-200"}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-full ${company.verified ? "bg-emerald-100 text-emerald-600" : company.verificationRequested ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-500"} flex items-center justify-center`}>
                  {company.verified ? "✓" : company.verificationRequested ? "⏳" : "○"}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-900">
                    {company.verified ? "Verified Company" : company.verificationRequested ? "Verification Requested" : "Not Verified"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {company.verified
                      ? "Your company is verified and shows the verified badge."
                      : company.verificationRequested
                        ? "Your verification request is pending review by our team."
                        : "Verify your company to build trust with students."}
                  </p>
                </div>
              </div>
              {!company.verified && !company.verificationRequested && (
                <AppButton
                  onClick={async () => {
                    await updateCompany.mutateAsync({ id: company.id, data: { verificationRequested: true } });
                    toast.success("Verification requested");
                  }}
                  disabled={updateCompany.isPending}
                  className="text-xs h-8 px-3"
                >
                  Request Verification
                </AppButton>
              )}
              {company.verificationRequested && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                  Pending Review
                </span>
              )}
            </div>
          </AppCard>
        )}

        <AppCard>
          <h2 className="text-base font-medium mb-4">Company Information</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <AppInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Company Name" />
            <AppInput value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
            <AppInput value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="Industry" />
            <AppInput value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website" />
          </div>

          <label className="flex h-40 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-500 hover:border-blue-500 transition-colors mt-4">
            <input hidden type="file" accept="image/*" onChange={handleLogoUpload} />
            {logo ? (
              <img src={logo} alt="Company Logo" className="h-full w-full rounded-xl object-cover" />
            ) : (
              <span className="text-sm">Upload Company Logo</span>
            )}
          </label>

          <div className="mt-4">
            <AppTextarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell students about your company, culture, mission, and opportunities..."
              className="min-h-[160px]"
            />
          </div>

          <div className="mt-6">
            <AppButton className="h-11 w-full" onClick={company ? handleUpdate : handleCreate}>
              {company ? "Update Company Profile" : "Create Company Profile"}
            </AppButton>
          </div>
        </AppCard>

        <AppCard>
          <h2 className="text-base font-medium mb-4">Preview</h2>
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shrink-0">
              {logo ? (
                <img src={logo} alt={name} className="h-full w-full object-cover" />
              ) : (
                <Building2 size="24" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-slate-900">{name || "Company Name"}</h3>
              <p className="text-sm text-slate-500">{industry || "Industry"} &middot; {location || "Location"}</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-600">{description || "Company description"}</p>
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition-colors">
              <Globe size="14" /> Visit Website →
            </a>
          )}
        </AppCard>
      </div>
    </PageContainer>
  );
}
