import { useState } from "react";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import AppCard from "@/components/common/AppCard";
import AppInput from "@/components/common/AppInput";
import AppTextarea from "@/components/common/AppTextarea";
import AppButton from "@/components/common/AppButton";

import { useAuth } from "@/hooks/useAuth";

import { useMyCompany } from "../hooks/useMyCompany";
import { useCreateCompany } from "../hooks/useCreateCompany";

export default function CompanyProfilePage() {
  const { user } = useAuth();

  const { data: company } = useMyCompany(user?.uid || "");

  const createCompany = useCreateCompany();

  const [name, setName] = useState("");

  const [location, setLocation] = useState("");

  const [industry, setIndustry] = useState("");

  const [website, setWebsite] = useState("");

  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    try {
      if (!user) return;

      console.log("SUBMIT");

      await createCompany.mutateAsync({
        ownerId: user.uid,
        name,
        logo: "",
        description,
        location,
        industry,
        website,
        verified: false,
        avgRating: 0,
        reviewCount: 0,
      });

      console.log("SUCCESS");
    } catch (error) {
      console.error(error);
    }
  };

  if (company) {
    return (
      <PageContainer>
        <PageHeader title={company.name} description="Company Profile" />

        <AppCard>
          <p>{company.description}</p>
        </AppCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Create Company"
        description="Set up your company profile"
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

          <AppTextarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <AppButton onClick={handleCreate}>Save Company</AppButton>
        </div>
      </AppCard>
    </PageContainer>
  );
}
