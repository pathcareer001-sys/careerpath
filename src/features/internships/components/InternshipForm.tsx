import { useState } from "react";

import AppInput from "@/components/common/AppInput";
import AppTextarea from "@/components/common/AppTextarea";
import AppButton from "@/components/common/AppButton";

import type { Internship } from "@/types/internship";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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
      requirements,
      deadline,
    });
  };

  const [requirements, setRequirements] = useState<string[]>(
    defaultValues?.requirements || [],
  );

  const [requirementInput, setRequirementInput] = useState("");

  const handleAddRequirement = () => {
    if (!requirementInput.trim()) return;

    if (requirements.includes(requirementInput.trim())) {
      return;
    }

    setRequirements([...requirements, requirementInput.trim()]);

    setRequirementInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Create Internship</h2>

        <p className="mt-1 text-slate-500">
          Publish a new internship opportunity for students.
        </p>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium">
          Internship Title
        </label>

        <AppInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Frontend Developer Intern"
        />
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Location</label>

          <AppInput
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Jakarta, Indonesia"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">
            Internship Type
          </label>

          <Select
            value={type}
            onValueChange={(value) => setType(value ?? "Remote")}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Remote">Remote</SelectItem>

              <SelectItem value="Hybrid">Hybrid</SelectItem>

              <SelectItem value="Onsite">Onsite</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Description</label>

          <AppTextarea
            className="min-h-[160px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe responsibilities, qualifications, and benefits..."
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Application Deadline
          </label>

          <AppInput
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold">Requirements</h3>

        <p className="text-sm text-slate-500">
          Add skills or qualifications needed.
        </p>
      </div>

      <div className="flex gap-2">
        <AppInput
          value={requirementInput}
          onChange={(e) => setRequirementInput(e.target.value)}
          placeholder="Add requirement..."
        />

        <AppButton type="button" onClick={handleAddRequirement}>
          Add
        </AppButton>
      </div>

      <div className="flex flex-wrap gap-2">
        {requirements.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() =>
              setRequirements(requirements.filter((req) => req !== item))
            }
            className="
            group
            rounded-full
            bg-blue-50
            px-4
            py-2
            text-sm
            font-medium
            text-blue-700
            hover:bg-red-50
            hover:text-red-600
            transition-all
            "
          >
            {item} ✕
          </button>
        ))}
      </div>

      <div
        className="
  flex
  justify-end
  border-t
  pt-6
  "
      >
        <AppButton type="submit" disabled={loading} className="min-w-[200px]">
          {loading
            ? "Publishing..."
            : defaultValues
              ? "Update Internship"
              : "Publish Internship"}
        </AppButton>
      </div>
    </form>
  );
}
