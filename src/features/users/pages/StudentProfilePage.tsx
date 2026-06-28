import { useParams } from "react-router-dom";
import { FileText, Globe, ExternalLink, Code2, GraduationCap, MapPin, BookOpen } from "lucide-react";
import PageContainer from "@/components/common/PageContainer";
import AppCard from "@/components/common/AppCard";
import { useUser } from "../hooks/useUser";
import LoadingState from "@/components/shared/LoadingState";
import EmptyState from "@/components/shared/EmptyState";

export default function StudentProfilePage() {
  const { id } = useParams();
  const { data: user, isLoading } = useUser(id || "");

  if (isLoading) return <LoadingState />;

  if (!user) {
    return (
      <PageContainer>
        <EmptyState title="Profile not found" description="This student profile does not exist or has been removed." />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/[0.04] to-section p-6 text-heading animate-fade-in-up">
        <div className="absolute top-0 right-0 w-36 h-36 md:w-72 md:h-72 rounded-full bg-white/60 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 md:w-48 md:h-48 rounded-full bg-section blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-start gap-5">
          <div className="h-20 w-20 rounded-full shrink-0 overflow-hidden border-2 border-border-light shadow-sm">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-medium">
                {user.name?.charAt(0) || "?"}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-[24px] font-medium">{user.name}</h1>
            <p className="text-sm text-secondary-text">{user.email}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-body mt-2">
              {user.university && (
                <span className="flex items-center gap-1.5">
                  <GraduationCap size="14" className="text-secondary-text" />
                  {user.university}
                </span>
              )}
              {user.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin size="14" className="text-secondary-text" />
                  {user.location}
                </span>
              )}
              {user.major && (
                <span className="flex items-center gap-1.5">
                  <BookOpen size="14" className="text-secondary-text" />
                  {user.major}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6 animate-fade-in-up animate-delay-100">
          <AppCard>
            <h2 className="text-base font-medium text-heading mb-3">About</h2>
            <p className="text-sm text-body leading-relaxed">{user.bio || "No bio provided."}</p>
          </AppCard>

          <AppCard>
            <h2 className="text-base font-medium text-heading mb-4">
              Skills {user.skills?.length ? `(${user.skills.length})` : ""}
            </h2>
            {user.skills?.length ? (
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-primary/[0.06] px-3.5 py-1.5 text-xs font-medium text-primary border border-primary/15">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-secondary-text">No skills listed.</p>
            )}
          </AppCard>

          <AppCard>
            <h2 className="text-base font-medium text-heading mb-3">Details</h2>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 md:gap-x-6 py-2.5 border-b border-border/50">
                <span className="text-secondary-text whitespace-nowrap">University</span>
                <span className="text-body font-semibold text-right overflow-hidden break-words">{user.university || "-"}</span>
              </div>
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 md:gap-x-6 py-2.5 border-b border-border/50">
                <span className="text-secondary-text whitespace-nowrap">Major</span>
                <span className="text-body font-semibold text-right overflow-hidden break-words">{user.major || "-"}</span>
              </div>
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 md:gap-x-6 py-2.5 border-b border-border/50">
                <span className="text-secondary-text whitespace-nowrap">Location</span>
                <span className="text-body font-semibold text-right overflow-hidden break-words">{user.location || "-"}</span>
              </div>
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 md:gap-x-6 py-2.5">
                <span className="text-secondary-text whitespace-nowrap">Email</span>
                <span className="text-body font-semibold text-right break-words overflow-hidden">{user.email}</span>
              </div>
            </div>
          </AppCard>
        </div>

        <div className="space-y-4 animate-fade-in-up animate-delay-200">
          <AppCard>
            <h3 className="text-sm font-medium text-heading mb-4">Professional Links</h3>
            <div className="space-y-3">
              {user.resumeUrl && (
                <a href={user.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <AppCard hover padding="sm" className="hover:border-primary hover:-translate-y-0.5 transition-all">
                    <div className="flex items-center gap-3">
                      <FileText size="18" className="text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Resume</p>
                        <p className="text-xs text-secondary-text">View candidate CV</p>
                      </div>
                    </div>
                  </AppCard>
                </a>
              )}
              {user.portfolio && (
                <a href={user.portfolio} target="_blank" rel="noopener noreferrer">
                  <AppCard hover padding="sm" className="hover:border-primary hover:-translate-y-0.5 transition-all">
                    <div className="flex items-center gap-3">
                      <Globe size="18" className="text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Portfolio</p>
                        <p className="text-xs text-secondary-text">Personal projects</p>
                      </div>
                    </div>
                  </AppCard>
                </a>
              )}
              {user.linkedin && (
                <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                  <AppCard hover padding="sm" className="hover:border-primary hover:-translate-y-0.5 transition-all">
                    <div className="flex items-center gap-3">
                      <ExternalLink size="18" className="text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">LinkedIn</p>
                        <p className="text-xs text-secondary-text">Professional profile</p>
                      </div>
                    </div>
                  </AppCard>
                </a>
              )}
              {user.github && (
                <a href={user.github} target="_blank" rel="noopener noreferrer">
                  <AppCard hover padding="sm" className="hover:border-primary hover:-translate-y-0.5 transition-all">
                    <div className="flex items-center gap-3">
                      <Code2 size="18" className="text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">GitHub</p>
                        <p className="text-xs text-secondary-text">Source code & projects</p>
                      </div>
                    </div>
                  </AppCard>
                </a>
              )}
              {!user.resumeUrl && !user.portfolio && !user.linkedin && !user.github && (
                <p className="text-sm text-secondary-text">No links provided.</p>
              )}
            </div>
          </AppCard>
        </div>
      </div>
    </PageContainer>
  );
}
