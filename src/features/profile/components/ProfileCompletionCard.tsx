import type { AppUser } from "@/types/user";

export function calculateProfileCompletion(profile?: Partial<AppUser> | null) {
  if (!profile) return 0;

  let completed = 0;

  const fields = [
    profile.name,
    profile.photoURL,
    profile.university,
    profile.bio,
    profile.skills?.length,
    profile.resumeUrl,
  ];

  fields.forEach((field) => {
    if (field) completed++;
  });

  return Math.round((completed / fields.length) * 100);
}
