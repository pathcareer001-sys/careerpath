import AppCard from "@/components/common/AppCard";
import { useUser } from "@/features/users/hooks/useUser";
import { FileText, Globe, GraduationCap, MapPin, User, X, Download } from "lucide-react";
import type { MouseEvent } from "react";

interface Props {
  uid: string;
  onClose: () => void;
}

export default function ApplicantProfileModal({ uid, onClose }: Props) {
  const { data: user, isLoading } = useUser(uid);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <AppCard>Loading profile...</AppCard>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <AppCard onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()} className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-xl font-medium shadow-sm">
              {user.name?.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-medium">{user.name}</h2>
              <p className="text-secondary-text">{user.email}</p>
              <div className="mt-2 space-y-1 text-sm text-secondary-text">
                <div className="flex items-center gap-2">
                  <GraduationCap size="14" /> {user.university || "University not provided"}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size="14" /> {user.location || "Location not provided"}
                </div>
              </div>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl p-2 hover:bg-section">
            <X size="20" />
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <InfoRow label="University" value={user.university} />
          <InfoRow label="Major" value={user.major} />
          <InfoRow label="Location" value={user.location} />
        </div>

        <div className="mt-8">
          <h3 className="font-medium mb-3">Skills ({user.skills?.length || 0})</h3>
          <div className="flex flex-wrap gap-2">
            {user.skills?.length ? (
              user.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-primary">{skill}</span>
              ))
            ) : (
              <p className="text-secondary-text">No skills</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-medium mb-3">About</h3>
          <p className="text-body leading-7">{user.bio || "This candidate has not added a bio yet."}</p>
        </div>

        <div className="mt-8">
          <h3 className="mb-4 font-medium">Professional Links</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {user.resumeUrl && (
              <a href={user.resumeUrl} target="_blank" rel="noopener noreferrer">
                <AppCard className="hover:border-primary hover:-translate-y-0.5 transition-all">
                  <div className="flex items-center gap-3">
                    <FileText size="20" className="text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">Resume</p>
                      <p className="text-sm text-secondary-text">View candidate CV</p>
                    </div>
                    <Download size="16" className="text-muted" />
                  </div>
                </AppCard>
              </a>
            )}
            {user.portfolio && (
              <a href={user.portfolio} target="_blank" rel="noopener noreferrer">
                <AppCard className="hover:border-primary hover:-translate-y-0.5 transition-all">
                  <div className="flex items-center gap-3">
                    <Globe size="20" className="text-primary" />
                    <div>
                      <p className="font-medium">Portfolio</p>
                      <p className="text-sm text-secondary-text">Personal projects</p>
                    </div>
                  </div>
                </AppCard>
              </a>
            )}
            {user.linkedin && (
              <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                <AppCard className="hover:border-primary hover:-translate-y-0.5 transition-all">
                  <div className="flex items-center gap-3">
                    <FileText size="20" className="text-primary" />
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-sm text-secondary-text">Professional profile</p>
                    </div>
                  </div>
                </AppCard>
              </a>
            )}
            {user.github && (
              <a href={user.github} target="_blank" rel="noopener noreferrer">
                <AppCard className="hover:border-primary hover:-translate-y-0.5 transition-all">
                  <div className="flex items-center gap-3">
                    <User size="20" className="text-primary" />
                    <div>
                      <p className="font-medium">GitHub</p>
                      <p className="text-sm text-secondary-text">Source code & projects</p>
                    </div>
                  </div>
                </AppCard>
              </a>
            )}
          </div>
        </div>
      </AppCard>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-secondary-text">{label}</span>
      <span className="font-medium">{value || "-"}</span>
    </div>
  );
}
