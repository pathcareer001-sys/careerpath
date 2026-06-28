import type { AppUser } from "@/types/user";

export function calculateProfileCompletion(profile?: Partial<AppUser> | null) {
  if (!profile) return 0;

  let score = 0;

  if (profile.photoURL) score += 10;
  if (profile.coverPhoto) score += 5;
  if (profile.username) score += 5;

  if (profile.university) score += 10;

  if (profile.major) score += 10;

  if (profile.location) score += 10;

  if (profile.bio) score += 15;

  if (profile.skills?.length) score += 15;

  if (profile.resumeUrl) score += 15;

  if (profile.linkedin) score += 5;

  if (profile.github) score += 5;

  return Math.min(score, 100);
}
