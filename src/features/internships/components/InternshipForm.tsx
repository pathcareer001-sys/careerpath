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
  salary?: string;
  status?: "draft" | "published";
  category?: string;
  employmentType?: string;
  minEducation?: string;
  experienceLevel?: string;
  requiredSkills?: string[];
  preferredSkills?: string[];
  languageRequirement?: string;
  salaryMin?: string;
  salaryMax?: string;
  numberOfOpenings?: number;
  workingHours?: string;
  responsibilities?: string;
  benefits?: string;
}

export default function InternshipForm({
  defaultValues,
  loading,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState(defaultValues?.title || "");
  const [location, setLocation] = useState(defaultValues?.location || "");
  const [type, setType] = useState(defaultValues?.type || "Remote");
  const [description, setDescription] = useState(defaultValues?.description || "");
  const [deadline, setDeadline] = useState(defaultValues?.deadline || "");
  const [salary, setSalary] = useState(defaultValues?.salary || "");
  const [status, setStatus] = useState<"draft" | "published">(defaultValues?.status || "published");
  const [category, setCategory] = useState(defaultValues?.category || "");
  const [employmentType, setEmploymentType] = useState(defaultValues?.employmentType || "");
  const [minEducation, setMinEducation] = useState(defaultValues?.minEducation || "");
  const [experienceLevel, setExperienceLevel] = useState(defaultValues?.experienceLevel || "");
  const [languageRequirement, setLanguageRequirement] = useState(defaultValues?.languageRequirement || "");
  const [salaryMin, setSalaryMin] = useState(defaultValues?.salaryMin || "");
  const [salaryMax, setSalaryMax] = useState(defaultValues?.salaryMax || "");
  const [numberOfOpenings, setNumberOfOpenings] = useState(defaultValues?.numberOfOpenings?.toString() || "");
  const [workingHours, setWorkingHours] = useState(defaultValues?.workingHours || "");
  const [responsibilities, setResponsibilities] = useState(defaultValues?.responsibilities || "");
  const [benefits, setBenefits] = useState(defaultValues?.benefits || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const openings = numberOfOpenings ? parseInt(numberOfOpenings, 10) : undefined;
    await onSubmit({
      title,
      location,
      type,
      description,
      requirements,
      deadline,
      salary: salary || undefined,
      status,
      category: category || undefined,
      employmentType: employmentType || undefined,
      minEducation: minEducation || undefined,
      experienceLevel: experienceLevel || undefined,
      requiredSkills: requiredSkills.length > 0 ? requiredSkills : undefined,
      preferredSkills: preferredSkills.length > 0 ? preferredSkills : undefined,
      languageRequirement: languageRequirement || undefined,
      salaryMin: salaryMin || undefined,
      salaryMax: salaryMax || undefined,
      numberOfOpenings: openings,
      workingHours: workingHours || undefined,
      responsibilities: responsibilities || undefined,
      benefits: benefits || undefined,
    });
  };

  const [requirements, setRequirements] = useState<string[]>(defaultValues?.requirements || []);
  const [requirementInput, setRequirementInput] = useState("");

  const handleAddRequirement = () => {
    if (!requirementInput.trim()) return;
    if (requirements.includes(requirementInput.trim())) return;
    setRequirements([...requirements, requirementInput.trim()]);
    setRequirementInput("");
  };

  const [requiredSkills, setRequiredSkills] = useState<string[]>(defaultValues?.requiredSkills || []);
  const [requiredSkillInput, setRequiredSkillInput] = useState("");

  const handleAddRequiredSkill = () => {
    if (!requiredSkillInput.trim()) return;
    if (requiredSkills.includes(requiredSkillInput.trim())) return;
    setRequiredSkills([...requiredSkills, requiredSkillInput.trim()]);
    setRequiredSkillInput("");
  };

  const [preferredSkills, setPreferredSkills] = useState<string[]>(defaultValues?.preferredSkills || []);
  const [preferredSkillInput, setPreferredSkillInput] = useState("");

  const handleAddPreferredSkill = () => {
    if (!preferredSkillInput.trim()) return;
    if (preferredSkills.includes(preferredSkillInput.trim())) return;
    setPreferredSkills([...preferredSkills, preferredSkillInput.trim()]);
    setPreferredSkillInput("");
  };

  const inputClass = "h-9 rounded-lg border border-border bg-background px-3 text-sm text-heading focus:border-primary focus:outline-none focus:shadow-[0_0_0_3px_var(--color-accent)] transition-colors w-full";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium">{defaultValues ? "Edit Internship" : "Create Internship"}</h2>
        <p className="mt-1 text-secondary-text">
          {defaultValues ? "Update the internship opportunity." : "Publish a new internship opportunity for students."}
        </p>
      </div>

      <div className="space-y-5">
        <h3 className="text-sm font-semibold text-heading uppercase tracking-wider">General Information</h3>

        <div>
          <label className="mb-2 block text-sm font-medium">Job Title</label>
          <AppInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Frontend Developer Intern" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Job Category / Department</label>
            <Select value={category} onValueChange={(value) => setCategory(value ?? "")}>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Human Resources">Human Resources</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Employment Type</label>
            <Select value={employmentType} onValueChange={(value) => setEmploymentType(value ?? "")}>
              <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Internship">Internship</SelectItem>
                <SelectItem value="Full Time">Full Time</SelectItem>
                <SelectItem value="Part Time">Part Time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Work Mode</label>
            <Select value={type} onValueChange={(value) => setType(value ?? "Remote")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="Onsite">Onsite</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Location</label>
            <AppInput value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Jakarta, Indonesia" />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="text-sm font-semibold text-heading uppercase tracking-wider">Requirements</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Minimum Education</label>
            <Select value={minEducation} onValueChange={(value) => setMinEducation(value ?? "")}>
              <SelectTrigger><SelectValue placeholder="Select education" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="SMA/SMK">SMA/SMK</SelectItem>
                <SelectItem value="Diploma (D3)">Diploma (D3)</SelectItem>
                <SelectItem value="Bachelor's Degree (S1)">Bachelor's Degree (S1)</SelectItem>
                <SelectItem value="Master's Degree (S2)">Master's Degree (S2)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Experience Requirement</label>
            <Select value={experienceLevel} onValueChange={(value) => setExperienceLevel(value ?? "")}>
              <SelectTrigger><SelectValue placeholder="Select experience" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Fresh Graduate">Fresh Graduate</SelectItem>
                <SelectItem value="Less than 1 Year">Less than 1 Year</SelectItem>
                <SelectItem value="1-3 Years">1–3 Years</SelectItem>
                <SelectItem value="3-5 Years">3–5 Years</SelectItem>
                <SelectItem value="5+ Years">5+ Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <h3 className="font-medium">Requirements</h3>
          <p className="text-sm text-secondary-text">Add skills or qualifications needed.</p>
          <div className="flex gap-2 mt-2">
            <AppInput value={requirementInput} onChange={(e) => setRequirementInput(e.target.value)} placeholder="Add requirement..." />
            <AppButton type="button" onClick={handleAddRequirement}>Add</AppButton>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {requirements.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRequirements(requirements.filter((req) => req !== item))}
                className="group rounded-full bg-accent px-4 py-2 text-sm font-medium text-primary hover:bg-error/10 hover:text-error transition-all"
              >
                {item} ✕
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium">Required Skills</h3>
          <p className="text-sm text-secondary-text">Essential skills candidates must have.</p>
          <div className="flex gap-2 mt-2">
            <AppInput value={requiredSkillInput} onChange={(e) => setRequiredSkillInput(e.target.value)} placeholder="Add required skill..." />
            <AppButton type="button" onClick={handleAddRequiredSkill}>Add</AppButton>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {requiredSkills.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRequiredSkills(requiredSkills.filter((s) => s !== item))}
                className="group rounded-full bg-accent px-4 py-2 text-sm font-medium text-primary hover:bg-error/10 hover:text-error transition-all"
              >
                {item} ✕
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium">Preferred Skills</h3>
          <p className="text-sm text-secondary-text">Nice-to-have skills (optional).</p>
          <div className="flex gap-2 mt-2">
            <AppInput value={preferredSkillInput} onChange={(e) => setPreferredSkillInput(e.target.value)} placeholder="Add preferred skill..." />
            <AppButton type="button" onClick={handleAddPreferredSkill}>Add</AppButton>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {preferredSkills.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPreferredSkills(preferredSkills.filter((s) => s !== item))}
                className="group rounded-full bg-accent px-4 py-2 text-sm font-medium text-primary hover:bg-error/10 hover:text-error transition-all"
              >
                {item} ✕
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Language Requirement (optional)</label>
          <AppInput value={languageRequirement} onChange={(e) => setLanguageRequirement(e.target.value)} placeholder="e.g. English, Bahasa Indonesia" />
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="text-sm font-semibold text-heading uppercase tracking-wider">Job Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Salary Min</label>
            <AppInput value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} placeholder="e.g. $500" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Salary Max</label>
            <AppInput value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} placeholder="e.g. $1,000" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Or Set Display Salary</label>
            <AppInput value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="e.g. $1,000/month" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Number of Open Positions</label>
            <AppInput type="number" min="1" value={numberOfOpenings} onChange={(e) => setNumberOfOpenings(e.target.value)} placeholder="e.g. 2" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Application Deadline</label>
            <AppInput type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Working Hours (optional)</label>
            <AppInput value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} placeholder="e.g. 40 hrs/week, 9AM-5PM" />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Job Description</label>
          <AppTextarea className="min-h-[120px]" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the internship role..." />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Job Responsibilities</label>
          <AppTextarea className="min-h-[120px]" value={responsibilities} onChange={(e) => setResponsibilities(e.target.value)} placeholder="List the key responsibilities..." />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Benefits & Perks</label>
          <AppTextarea className="min-h-[100px]" value={benefits} onChange={(e) => setBenefits(e.target.value)} placeholder="e.g. Health insurance, flexible hours, meal allowance..." />
        </div>
      </div>

      <div className="flex justify-between items-center border-t pt-6">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">Status:</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStatus("draft")}
              className={`rounded-lg px-3 py-1.5 text-sm transition-all ${status === "draft" ? "bg-warning/10 text-warning font-medium" : "bg-section text-secondary-text hover:bg-section"}`}
            >
              Draft
            </button>
            <button
              type="button"
              onClick={() => setStatus("published")}
              className={`rounded-lg px-3 py-1.5 text-sm transition-all ${status === "published" ? "bg-success/10 text-success font-medium" : "bg-section text-secondary-text hover:bg-section"}`}
            >
              Published
            </button>
          </div>
        </div>
        <AppButton type="submit" disabled={loading} className="min-w-[200px]">
          {loading ? "Saving..." : defaultValues ? "Update Internship" : status === "draft" ? "Save as Draft" : "Publish Internship"}
        </AppButton>
      </div>
    </form>
  );
}
