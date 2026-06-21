import { useState } from "react";

import AppInput from "@/components/common/AppInput";
import AppTextarea from "@/components/common/AppTextarea";
import AppButton from "@/components/common/AppButton";

import type { Internship } from "@/types/internship";

interface Props {
  defaultValues?: Partial<Internship>;

  loading?: boolean;

  onSubmit: (data: InternshipFormData) => void | Promise<void>;
}

export interface InternshipFormData {
  title: string;

  location: string;

  type: string;

  description: string;

  requirements: string[];

  deadline: string;
}

export default function InternshipForm({
  defaultValues,
  loading,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState(defaultValues?.title || "");

  const [location, setLocation] = useState(defaultValues?.location || "");

  const [type, setType] = useState(defaultValues?.type || "Remote");

  const [description, setDescription] = useState(
    defaultValues?.description || "",
  );

  const [deadline, setDeadline] = useState(defaultValues?.deadline || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onSubmit({
      title,

      location,

      type,

      description,

      requirements: [],

      deadline,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AppInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Internship Title"
      />

      <AppInput
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />

      <AppInput
        value={type}
        onChange={(e) => setType(e.target.value)}
        placeholder="Type"
      />

      <AppTextarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <AppInput
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <AppButton type="submit" disabled={loading}>
        Save Internship
      </AppButton>
    </form>
  );
}
