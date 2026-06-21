import { useState } from "react";
import { useEffect } from "react";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
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

  useEffect(() => {
    if (!company) return;

    setName(company.name || "");
    setLocation(company.location || "");
    setIndustry(company.industry || "");
    setWebsite(company.website || "");
    setDescription(company.description || "");
    setLogo(company.logo || "");
  }, [company]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const result = await uploadImage(file);

    setLogo(result.secure_url);
  };

  const handleCreate = async () => {
    try {
      if (!user) return;

      console.log("SUBMIT");

      await createCompany.mutateAsync({
        ownerId: user.uid,
        name,
        logo,
        description,
        location,
        industry,
        website,
        verified: false,
        avgRating: 0,
        reviewCount: 0,
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
      data: {
        name,
        logo,
        description,
        location,
        industry,
        website,
      },
    });
    toast.success(
  "Company profile created successfully",
);
  };

  return (
    <PageContainer>
      <PageHeader
        title={company ? "Edit Company" : "Create Company"}
        description={
          company
            ? "Update your company profile"
            : "Set up your company profile"
        }
      />

      <AppCard>
        <div className="space-y-4">
          <AppInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Company Name"
          />

          <AppInput
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />

          <AppInput
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="Industry"
          />

          <AppInput
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Website"
          />

          <input type="file" accept="image/*" onChange={handleLogoUpload} />
          {logo && (
            <img
              src={logo}
              alt="Company Logo"
              className="
      h-24
      w-24
      rounded-xl
      object-cover
      border
    "
            />
          )}

          <AppTextarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <AppButton onClick={company ? handleUpdate : handleCreate}>
            {company ? "Update Company" : "Save Company"}
          </AppButton>
        </div>
      </AppCard>
    </PageContainer>
  );
}
