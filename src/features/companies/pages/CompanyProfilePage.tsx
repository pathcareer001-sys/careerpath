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

    const imageUrl = await uploadImage(file);

    setLogo(imageUrl);
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
    toast.success("Company profile updated successfully");
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

      <AppCard
        className="
  overflow-hidden
  border-0
  bg-gradient-to-r
  from-blue-600
  via-blue-500
  to-indigo-600
  text-white
  "
      >
        <div className="flex items-center gap-6">
          <div
            className="
      h-24
      w-24
      overflow-hidden
      rounded-3xl
      bg-white
      "
          >
            {logo ? (
              <img
                src={logo}
                alt={name}
                className="
          h-full
          w-full
          object-cover
          "
              />
            ) : (
              <div
                className="
          flex
          h-full
          items-center
          justify-center
          text-3xl
          font-bold
          text-blue-600
          "
              >
                {name?.charAt(0) || "C"}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold">{name || "Company Name"}</h1>

            <p className="mt-2 text-blue-100">{industry || "Industry"}</p>

            <p className="text-blue-100">{location || "Location"}</p>
          </div>
        </div>
      </AppCard>

      <AppCard>
        <div className="grid gap-4 md:grid-cols-2">
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
        </div>
        <label
          className="
            flex
            h-44
            cursor-pointer
            items-center
            justify-center
            rounded-2xl
            border-2
            border-dashed
            border-slate-300
            text-slate-500
            hover:border-blue-500
            transition-colors
            mt-4
            "
        >
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
          />

          {logo ? (
            <img
              src={logo}
              alt="Company Logo"
              className="
                h-full
                w-full
                rounded-2xl
                object-cover
                "
            />
          ) : (
            <span>Upload Company Logo</span>
          )}
        </label>
        <div className="mt-6">
          <AppTextarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell students about your company, culture, mission, and opportunities..."
            className="min-h-[200px]"
          />
        </div>

        <div className="mt-6">
          <AppButton
            className="h-12 w-full"
            onClick={company ? handleUpdate : handleCreate}
          >
            {company ? "Update Company Profile" : "Create Company Profile"}
          </AppButton>
        </div>
      </AppCard>
      <AppCard>
        <div className="flex gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-2xl bg-slate-100">
            {logo ? (
              <img
                src={logo}
                alt={name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center font-bold">
                {name?.charAt(0) || "C"}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-bold">{name || "Company Name"}</h3>

            <p className="text-slate-500">{industry || "Industry"}</p>

            <p className="text-slate-500">{location || "Location"}</p>
          </div>
        </div>

        <p className="mt-4 text-slate-600">
          {description || "Company description"}
        </p>

        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-blue-600"
          >
            Visit Website →
          </a>
        )}
      </AppCard>
    </PageContainer>
  );
}
