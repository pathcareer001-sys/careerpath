import { useMemo, useState, useEffect, useRef } from "react";

import { toast } from "sonner";
import { MapPin, Camera, X, Trash2, Upload } from "lucide-react";

import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import AppCard from "@/components/common/AppCard";
import AppInput from "@/components/common/AppInput";
import AppButton from "@/components/common/AppButton";
import AppTextarea from "@/components/common/AppTextarea";

import { useAuth } from "@/features/auth/hooks/useAuth";

import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { calculateProfileCompletion } from "../components/ProfileCompletionCard";

import { uploadImage, uploadPdf } from "@/services/cloudinaryService";

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const updateProfile = useUpdateProfile();

  const [username, setUsername] = useState(user?.username || "");
  const [university, setUniversity] = useState(user?.university || "");
  const [major, setMajor] = useState(user?.major || "");
  const [location, setLocation] = useState(user?.location || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [linkedin, setLinkedin] = useState(user?.linkedin || "");
  const [github, setGithub] = useState(user?.github || "");
  const [portfolio, setPortfolio] = useState(user?.portfolio || "");

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [removeCover, setRemoveCover] = useState(false);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const completion = useMemo(() => calculateProfileCompletion({
    ...user,
    username: username || user?.username,
    coverPhoto: removeCover ? undefined : (coverFile ? "pending" : user?.coverPhoto),
    university,
    major,
    location,
    bio,
    skills,
  }), [user, username, coverFile, removeCover, university, major, location, bio, skills]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!user) return;
    setUsername(user.username || "");
    setUniversity(user.university || "");
    setMajor(user.major || "");
    setLocation(user.location || "");
    setBio(user.bio || "");
    setSkills(user.skills || []);
    setLinkedin(user.linkedin || "");
    setGithub(user.github || "");
    setPortfolio(user.portfolio || "");
    setRemoveCover(false);
    setCoverFile(null);
    setAvatarFile(null);
  }, [user]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleSave = async () => {
    if (!user) return;

    try {
      let photoURL = user?.photoURL || "";
      let resumeUrl = user?.resumeUrl || "";

      if (avatarFile) {
        photoURL = await uploadImage(avatarFile);
      }

      if (resumeFile) {
        resumeUrl = await uploadPdf(resumeFile);
      }

      const data: Record<string, unknown> = {
        username: username || undefined,
        university,
        major,
        location,
        bio,
        skills,
        photoURL,
        resumeUrl,
        linkedin,
        github,
        portfolio,
      };

      if (removeCover) {
        data.coverPhoto = "";
      } else if (coverFile) {
        data.coverPhoto = await uploadImage(coverFile);
      }

      await updateProfile.mutateAsync({ uid: user.uid, data });

      await refreshUser();

      toast.success("Profil diperbarui");
    } catch {
      toast.error("Gagal memperbarui profil");
    }
  };

  const handleAddSkill = () => {
    const value = skillInput.trim();
    if (!value) return;
    if (skills.includes(value)) {
      toast.error("Keahlian sudah ada");
      return;
    }
    setSkills([...skills, value]);
    setSkillInput("");
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((item) => item !== skill));
  };

  const avatarPreview = useMemo(() => {
    if (avatarFile) return URL.createObjectURL(avatarFile);
    return user?.photoURL;
  }, [avatarFile, user?.photoURL]);

  const coverPreview = useMemo(() => {
    if (coverFile) return URL.createObjectURL(coverFile);
    return user?.coverPhoto;
  }, [coverFile, user?.coverPhoto]);

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Profil Saya"
        description="Kelola informasi pribadi Anda"
      />

      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        {/* LEFT CARD */}
        <AppCard className="overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-accent to-section group">
            {coverPreview && !removeCover && (
              <img
                src={coverPreview}
                alt="Cover"
                className="h-full w-full object-cover"
              />
            )}
            <label className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all cursor-pointer">
              <Camera className="text-white opacity-0 group-hover:opacity-100 transition-all" size={24} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  setCoverFile(e.target.files?.[0] || null);
                  setRemoveCover(false);
                }}
              />
            </label>
            {(user?.coverPhoto || coverFile) && !removeCover && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setRemoveCover(true);
                  setCoverFile(null);
                }}
                className="absolute top-2 right-2 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70 transition-all"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="-mt-14 px-6 pb-6">
            <div className="relative inline-block">
              <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-surface">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt={user?.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-4xl font-medium text-primary">
                    {user?.name?.charAt(0)}
                  </div>
                )}
              </div>
              <label className="absolute -bottom-1 -right-1 cursor-pointer rounded-full bg-primary p-2 text-xs font-medium text-white shadow-md hover:bg-primary-hover transition-all">
                <Camera size={14} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>

            <h2 className="mt-4 text-2xl font-medium">{user?.name}</h2>
            {username && (
              <p className="text-sm text-muted">@{username}</p>
            )}
            <p className="text-secondary-text">{user?.email}</p>

            <div className="mt-4 inline-flex rounded-full bg-accent px-3 py-1 text-sm font-medium text-primary">
              {user?.role === "student" ? "Mahasiswa" : "Perusahaan"}
            </div>

            <div className="mt-3 text-sm text-secondary-text">
              {major || "Tambah Jurusan"} • {university || "Tambah Universitas"}
            </div>

            <div className="mt-2 flex items-center gap-1 text-sm text-secondary-text">
              <MapPin size={16} />
              {location || "Tambah Lokasi"}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-accent px-3 py-1 text-xs text-primary">
                {skills.length} Keahlian
              </span>
              <span className="rounded-full bg-success/10 px-3 py-1 text-xs text-success">
                {completion}% Lengkap
              </span>
              <span className="rounded-full bg-info/10 px-3 py-1 text-xs text-info">
                {user?.resumeUrl ? "Resume ✓" : "Tidak Ada Resume"}
              </span>
            </div>

            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Kelengkapan Profil</span>
                <span className="text-sm font-medium text-primary">{completion}%</span>
              </div>
              <div className="h-2 rounded-full bg-section">
                <div
                  className="h-2 rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 3 && (
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary">
                  +{skills.length - 3}
                </span>
              )}
            </div>
          </div>
        </AppCard>

        {/* RIGHT SECTION */}
        <div className="space-y-6">
          {/* PERSONAL INFORMATION */}
          <AppCard>
            <h2 className="text-lg font-medium mb-6">Informasi Pribadi</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <AppInput
                value={user?.name || ""}
                disabled
                placeholder="Nama Lengkap"
              />
              <AppInput
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nama Pengguna"
              />
              <AppInput
                value={user?.email || ""}
                disabled
                placeholder="Email"
              />
              <AppInput
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="Universitas"
              />
              <AppInput
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                placeholder="Jurusan"
              />
              <AppInput
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="md:col-span-2"
                placeholder="Lokasi"
              />
            </div>
          </AppCard>

          {/* ABOUT ME */}
          <AppCard>
            <h2 className="text-lg font-medium mb-4">Tentang Saya</h2>
            <AppTextarea
              className="min-h-[180px]"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Ceritakan tentang diri Anda, minat, pencapaian, dan tujuan karir kepada perusahaan..."
            />
          </AppCard>

          {/* PROFILE PHOTO */}
          <AppCard>
            <h2 className="text-lg font-medium">Foto Profil</h2>
            <p className="text-sm text-secondary-text mt-1">
              Unggah atau ganti foto profil Anda
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-primary/30">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl font-medium text-primary">
                    {user?.name?.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <AppButton type="button" variant="secondary" onClick={() => avatarInputRef.current?.click()}>
                  <Upload size={14} />
                  Pilih Gambar
                </AppButton>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                />
                {(avatarFile || user?.photoURL) && (
                  <AppButton type="button" variant="danger" onClick={handleRemoveAvatar}>
                    <Trash2 size={14} />
                    Hapus
                  </AppButton>
                )}
              </div>
            </div>
          </AppCard>

          {/* COVER PHOTO */}
          <AppCard>
            <h2 className="text-lg font-medium">Foto Sampul</h2>
            <p className="text-sm text-secondary-text mt-1">
              Unggah gambar spanduk untuk profil Anda
            </p>
            <div className="mt-4">
              <div className="relative h-36 rounded-xl overflow-hidden bg-gradient-to-r from-accent to-section">
                {coverPreview && !removeCover ? (
                  <img src={coverPreview} alt="Cover preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-white/50 text-sm">
                    Tidak ada foto sampul
                  </div>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <AppButton type="button" variant="secondary" onClick={() => coverInputRef.current?.click()}>
                  <Upload size={14} />
                  {coverPreview && !removeCover ? "Ganti Sampul" : "Unggah Sampul"}
                </AppButton>
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    setCoverFile(e.target.files?.[0] || null);
                    setRemoveCover(false);
                  }}
                />
                {(user?.coverPhoto || coverFile) && !removeCover && (
                  <AppButton type="button" variant="danger" onClick={() => { setRemoveCover(true); setCoverFile(null); }}>
                    <Trash2 size={14} />
                    Hapus Sampul
                  </AppButton>
                )}
              </div>
            </div>
          </AppCard>

          {/* SKILLS */}
          <AppCard>
            <h2 className="text-lg font-medium">Keahlian</h2>
            <p className="text-sm text-secondary-text mt-1">Tunjukkan keahlian Anda</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <AppInput
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Tambah keahlian..."
                className="w-full"
              />
              <AppButton type="button" onClick={handleAddSkill} className="w-full sm:w-auto">Tambah</AppButton>
            </div>
            {skills.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-primary/30 p-6 text-center text-sm text-secondary-text">
                Belum ada keahlian ditambahkan
              </div>
            ) : (
              <div className="mt-6 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-primary hover:bg-error/10 hover:text-error transition-all"
                  >
                    {skill} ✕
                  </button>
                ))}
              </div>
            )}
          </AppCard>

          {/* RESUME */}
          <AppCard>
            <h2 className="text-lg font-medium">Resume</h2>
            <p className="text-sm text-secondary-text mt-1">Unggah CV terbaru Anda</p>
            <label className="mt-4 flex h-32 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 hover:border-primary">
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              />
              <div className="text-center">
                {resumeFile ? (
                  <>
                    <p className="font-medium text-primary">{resumeFile.name}</p>
                    <p className="text-xs text-secondary-text">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p className="text-sm text-success">Siap diunggah</p>
                  </>
                ) : user?.resumeUrl ? (
                  <>
                    <p className="font-medium text-success">Resume Terunggah ✓</p>
                    <p className="text-sm text-secondary-text">Klik Simpan untuk mengganti</p>
                  </>
                ) : (
                  <>
                    <p className="font-medium">Unggah Resume</p>
                    <p className="text-sm text-secondary-text">PDF maksimal 5MB</p>
                  </>
                )}
              </div>
            </label>
            {user?.resumeUrl && (
              <a href={user.resumeUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-primary font-medium">
                Lihat Resume Saat Ini
              </a>
            )}
          </AppCard>

          {/* SOCIAL LINKS */}
          <AppCard>
            <h2 className="text-lg font-medium">Tautan Sosial</h2>
            <div className="mt-6 space-y-4">
              <AppInput value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="URL LinkedIn" />
              <AppInput value={github} onChange={(e) => setGithub(e.target.value)} placeholder="URL GitHub" />
              <AppInput value={portfolio} onChange={(e) => setPortfolio(e.target.value)} placeholder="URL Portofolio" />
            </div>
          </AppCard>

          {/* SAVE */}
          <AppCard>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h3 className="font-medium">Siap Disimpan?</h3>
                <p className="text-sm text-secondary-text">Perbarui informasi profil Anda.</p>
              </div>
              <AppButton onClick={handleSave} disabled={updateProfile.isPending} className="w-full sm:w-auto">
                {updateProfile.isPending ? "Menyimpan..." : "Simpan Perubahan"}
              </AppButton>
            </div>
          </AppCard>
        </div>
      </div>
    </PageContainer>
  );
}
