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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium">{defaultValues ? "Edit Magang" : "Buat Magang"}</h2>
        <p className="mt-1 text-secondary-text">
          {defaultValues ? "Perbarui kesempatan magang." : "Publikasikan kesempatan magang baru untuk mahasiswa."}
        </p>
      </div>

      <div className="space-y-5">
        <h3 className="text-sm font-semibold text-heading uppercase tracking-wider">Informasi Umum</h3>

        <div>
          <label className="mb-2 block text-sm font-medium">Judul Pekerjaan</label>
          <AppInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Frontend Developer Intern" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Kategori / Departemen</label>
            <Select value={category} onValueChange={(value) => setCategory(value ?? "")}>
              <SelectTrigger><SelectValue placeholder="Pilih kategori" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Technology">Teknologi</SelectItem>
                <SelectItem value="Design">Desain</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Finance">Keuangan</SelectItem>
                <SelectItem value="Human Resources">SDM</SelectItem>
                <SelectItem value="Operations">Operasional</SelectItem>
                <SelectItem value="Sales">Penjualan</SelectItem>
                <SelectItem value="Other">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Tipe Pekerjaan</label>
            <Select value={employmentType} onValueChange={(value) => setEmploymentType(value ?? "")}>
              <SelectTrigger><SelectValue placeholder="Pilih tipe" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Internship">Magang</SelectItem>
                <SelectItem value="Full Time">Penuh Waktu</SelectItem>
                <SelectItem value="Part Time">Paruh Waktu</SelectItem>
                <SelectItem value="Contract">Kontrak</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Mode Kerja</label>
            <Select value={type} onValueChange={(value) => setType(value ?? "Remote")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Remote">Jarak Jauh</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="Onsite">Di Lokasi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Lokasi</label>
            <AppInput value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Jakarta, Indonesia" />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="text-sm font-semibold text-heading uppercase tracking-wider">Persyaratan</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Pendidikan Minimal</label>
            <Select value={minEducation} onValueChange={(value) => setMinEducation(value ?? "")}>
              <SelectTrigger><SelectValue placeholder="Pilih pendidikan" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="SMA/SMK">SMA/SMK</SelectItem>
                <SelectItem value="Diploma (D3)">Diploma (D3)</SelectItem>
                <SelectItem value="Bachelor's Degree (S1)">Sarjana (S1)</SelectItem>
                <SelectItem value="Master's Degree (S2)">Magister (S2)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Pengalaman Kerja</label>
            <Select value={experienceLevel} onValueChange={(value) => setExperienceLevel(value ?? "")}>
              <SelectTrigger><SelectValue placeholder="Pilih pengalaman" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Fresh Graduate">Fresh Graduate</SelectItem>
                <SelectItem value="Less than 1 Year">Kurang dari 1 Tahun</SelectItem>
                <SelectItem value="1-3 Years">1–3 Tahun</SelectItem>
                <SelectItem value="3-5 Years">3–5 Tahun</SelectItem>
                <SelectItem value="5+ Years">5+ Tahun</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <h3 className="font-medium">Keahlian Wajib</h3>
          <p className="text-sm text-secondary-text">Keahlian penting yang harus dimiliki kandidat.</p>
          <div className="flex gap-2 mt-2">
            <AppInput value={requiredSkillInput} onChange={(e) => setRequiredSkillInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddRequiredSkill(); } }} placeholder="Tambah keahlian wajib..." />
            <AppButton type="button" onClick={handleAddRequiredSkill}>Tambah</AppButton>
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
          <h3 className="font-medium">Keahlian Tambahan</h3>
          <p className="text-sm text-secondary-text">Keahlian yang lebih disukai (opsional).</p>
          <div className="flex gap-2 mt-2">
            <AppInput value={preferredSkillInput} onChange={(e) => setPreferredSkillInput(e.target.value)} placeholder="Tambah keahlian tambahan..." />
            <AppButton type="button" onClick={handleAddPreferredSkill}>Tambah</AppButton>
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
          <label className="mb-2 block text-sm font-medium">Persyaratan Bahasa (opsional)</label>
          <AppInput value={languageRequirement} onChange={(e) => setLanguageRequirement(e.target.value)} placeholder="Misal: Inggris, Bahasa Indonesia" />
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="text-sm font-semibold text-heading uppercase tracking-wider">Detail Pekerjaan</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Gaji Minimal</label>
            <AppInput value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} placeholder="Misal: Rp2.000.000" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Gaji Maksimal</label>
            <AppInput value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} placeholder="Misal: Rp5.000.000" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Atur Gaji Tampilan</label>
            <AppInput value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Misal: Rp3.000.000/bulan" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Jumlah Posisi Tersedia</label>
            <AppInput type="number" min="1" value={numberOfOpenings} onChange={(e) => setNumberOfOpenings(e.target.value)} placeholder="Misal: 2" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Batas Waktu Pendaftaran</label>
            <AppInput type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Jam Kerja (opsional)</label>
            <AppInput value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} placeholder="Misal: 40 jam/minggu, 9AM-5PM" />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Deskripsi Pekerjaan</label>
          <AppTextarea className="min-h-[120px]" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Jelaskan peran magang..." />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Tanggung Jawab</label>
          <AppTextarea className="min-h-[120px]" value={responsibilities} onChange={(e) => setResponsibilities(e.target.value)} placeholder="Daftar tanggung jawab utama..." />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Manfaat & Tunjangan</label>
          <AppTextarea className="min-h-[100px]" value={benefits} onChange={(e) => setBenefits(e.target.value)} placeholder="Misal: Asuransi kesehatan, jam fleksibel, tunjangan makan..." />
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
              Draf
            </button>
            <button
              type="button"
              onClick={() => setStatus("published")}
              className={`rounded-lg px-3 py-1.5 text-sm transition-all ${status === "published" ? "bg-success/10 text-success font-medium" : "bg-section text-secondary-text hover:bg-section"}`}
            >
              Publikasikan
            </button>
          </div>
        </div>
        <AppButton type="submit" disabled={loading} className="min-w-[200px]">
          {loading ? "Menyimpan..." : defaultValues ? "Perbarui Magang" : status === "draft" ? "Simpan sebagai Draf" : "Publikasikan Magang"}
        </AppButton>
      </div>
    </form>
  );
}
