import { useMemo, useState, useEffect } from "react";

import { toast } from "sonner";

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

  const [university, setUniversity] = useState(user?.university || "");

  const [major, setMajor] = useState(user?.major || "");

  const [location, setLocation] = useState(user?.location || "");

  const [bio, setBio] = useState(user?.bio || "");

  const [skills, setSkills] = useState<string[]>(user?.skills || []);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const completion = calculateProfileCompletion({
    ...user,
    university,
    major,
    location,
    bio,
    skills,
  });

  const [skillInput, setSkillInput] = useState("");

  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [linkedin, setLinkedin] = useState(user?.linkedin || "");

  const [github, setGithub] = useState(user?.github || "");

  const [portfolio, setPortfolio] = useState(user?.portfolio || "");

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!user) return;
    setUniversity(user.university || "");
    setMajor(user.major || "");
    setLocation(user.location || "");
    setBio(user.bio || "");
    setSkills(user.skills || []);

    setLinkedin(user.linkedin || "");
    setGithub(user.github || "");
    setPortfolio(user.portfolio || "");
  }, [user]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleSave = async () => {
    if (!user) return;

    try {
      let photoURL = user?.photoURL || "";

      if (avatarFile) {
        photoURL = await uploadImage(avatarFile);
      }

      let resumeUrl = user?.resumeUrl || "";

      if (resumeFile) {
        resumeUrl = await uploadPdf(resumeFile);
      }

      await updateProfile.mutateAsync({
        uid: user.uid,
        data: {
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
        },
      });

      await refreshUser();

      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handleAddSkill = () => {
    const value = skillInput.trim();

    if (!value) return;

    if (skills.includes(value)) {
      toast.error("Skill already exists");
      return;
    }

    setSkills([...skills, value]);

    setSkillInput("");
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((item) => item !== skill));
  };

  const avatarPreview = useMemo(() => {
    if (avatarFile) {
      return URL.createObjectURL(avatarFile);
    }

    return user?.photoURL;
  }, [avatarFile, user?.photoURL]);

  return (
    <PageContainer>
      <PageHeader
        title="My Profile"
        description="Manage your personal information"
      />

      <div
        className="
      grid
      gap-6
      xl:grid-cols-[380px_1fr]
      "
      >
        {/* LEFT */}
        <AppCard
          className="
        overflow-hidden
        "
        >
          <div
            className="
          h-32
          bg-[#2563EB]
          "
          />

          <div className="-mt-14 px-6 pb-6">
            <div className="relative">
              <div
                className="
    h-28
    w-28
    overflow-hidden
    rounded-full
    border-4
    border-white
    bg-white
    "
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt={user?.name}
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
        w-full
        items-center
        justify-center
        text-4xl
        font-medium
        text-blue-600
        "
                  >
                    {user?.name?.charAt(0)}
                  </div>
                )}
              </div>

              <label
                className="
    absolute
    bottom-0
    right-0
    cursor-pointer
    rounded-full
    bg-blue-600
    px-3
    py-2
    text-xs
    font-medium
    text-white
    "
              >
                Edit
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>

            <h2 className="mt-4 text-2xl font-medium">{user?.name}</h2>

            <p className="text-slate-500">{user?.email}</p>

            <div
              className="
            mt-4
            inline-flex
            rounded-full
            bg-blue-50
            px-3
            py-1
            text-sm
            font-medium
            text-blue-600
            "
            >
              {user?.role === "student" ? "Student" : "Company"}
            </div>

            <div className="mt-3 text-sm text-slate-500">
              {major || "Add Major"} • {university || "Add University"}
            </div>

            <div className="mt-2 text-sm text-slate-500">
              📍 {location || "Add Location"}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className="
    rounded-full
    bg-blue-50
    px-3
    py-1
    text-xs
    text-blue-600
    "
              >
                {skills.length} Skills
              </span>

              <span
                className="
    rounded-full
    bg-green-50
    px-3
    py-1
    text-xs
    text-green-600
    "
              >
                {completion}% Complete
              </span>

              <span
                className="
    rounded-full
    bg-purple-50
    px-3
    py-1
    text-xs
    text-purple-600
    "
              >
                {user?.resumeUrl ? "Resume ✓" : "No Resume"}
              </span>
            </div>

            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Profile Completion</span>

                <span className="text-sm font-medium text-blue-600">
                  {completion}%
                </span>
              </div>

              <div className="h-2 rounded-full bg-blue-100">
                <div
                  className="
                h-2
                rounded-full
                bg-blue-600
                transition-all
                duration-500
                "
                  style={{
                    width: `${completion}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="
                rounded-full
                bg-blue-50
                px-3
                py-1
                text-xs
                font-medium
                text-blue-600
                "
                >
                  {skill}
                </span>
              ))}

              {skills.length > 3 && (
                <span
                  className="
                rounded-full
                bg-blue-50
                px-3
                py-1
                text-xs
                font-medium
                text-blue-600
                "
                >
                  +{skills.length - 3}
                </span>
              )}
            </div>
          </div>
        </AppCard>

        {/* RIGHT */}
        <div className="space-y-6">
          <AppCard>
            <h2 className="text-lg font-medium mb-6">Personal Information</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <AppInput
                value={user?.name || ""}
                disabled
                placeholder="Full Name"
              />

              <AppInput
                value={user?.email || ""}
                disabled
                placeholder="Email"
              />

              <AppInput
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="University"
              />

              <AppInput
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                placeholder="Major"
              />

              <AppInput
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="md:col-span-2"
                placeholder="Location"
              />
            </div>
          </AppCard>

          <AppCard>
            <h2 className="text-lg font-medium mb-4">About Me</h2>

            <AppTextarea
              className="min-h-[180px]"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell companies about yourself, your interests, achievements, and career goals..."
            />
          </AppCard>

          <AppCard>
            <h2 className="text-lg font-medium">Skills</h2>

            <p className="text-sm text-slate-500 mt-1">
              Showcase your strengths
            </p>

            <div className="mt-6 flex gap-3">
              <AppInput
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add skill..."
              />

              <AppButton type="button" onClick={handleAddSkill}>
                Add
              </AppButton>
            </div>

            {skills.length === 0 ? (
              <div
                className="
              mt-6
              rounded-xl
              border
              border-dashed
              border-blue-200
              p-6
              text-center
              text-sm
              text-slate-500
              "
              >
                No skills added yet
              </div>
            ) : (
              <div className="mt-6 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="
                  rounded-full
                  bg-blue-50
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-blue-600
                  hover:bg-red-50
                  hover:text-red-600
                  transition-all
                  "
                  >
                    {skill} ✕
                  </button>
                ))}
              </div>
            )}
          </AppCard>
          <AppCard>
            <h2 className="text-lg font-medium">Resume</h2>

            <p className="text-sm text-slate-500 mt-1">Upload your latest CV</p>

            <label
              className="
  flex
  h-32
  cursor-pointer
  items-center
  justify-center
  rounded-2xl
  border-2
  border-dashed
  border-blue-200
  hover:border-blue-500
  "
            >
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              />

              <div className="text-center">
                {resumeFile ? (
                  <>
                    <p className="font-medium text-blue-600">
                      {resumeFile.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <p className="text-sm text-green-600">Ready to upload</p>
                  </>
                ) : user?.resumeUrl ? (
                  <>
                    <p className="font-medium text-green-600">
                      Resume Uploaded ✓
                    </p>
                    <p className="text-sm text-slate-500">
                      Click Save Changes to replace
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-medium">Upload Resume</p>
                    <p className="text-sm text-slate-500">PDF up to 5MB</p>
                  </>
                )}
              </div>
            </label>

            {user?.resumeUrl && (
              <a
                href={user.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
      mt-4
      inline-flex
      text-blue-600
      font-medium
      "
              >
                View Current Resume
              </a>
            )}
          </AppCard>
          <AppCard>
            <h2 className="text-lg font-medium">Social Links</h2>

            <div className="mt-6 space-y-4">
              <AppInput
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="LinkedIn URL"
              />

              <AppInput
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="Github URL"
              />

              <AppInput
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                placeholder="Portfolio URL"
              />
            </div>
          </AppCard>
          <AppCard>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Ready to Save?</h3>

                <p className="text-sm text-slate-500">
                  Update your profile information.
                </p>
              </div>

              <AppButton
                onClick={handleSave}
                disabled={updateProfile.isPending}
              >
                {updateProfile.isPending ? "Saving..." : "Save Changes"}
              </AppButton>
            </div>
          </AppCard>
        </div>
      </div>
    </PageContainer>
  );
}
