import { Building2, Briefcase, CalendarDays, ArrowRight } from "lucide-react";

import AppCard from "@/components/common/AppCard";

import StatusBadge from "./StatusBadge";

import type { Application } from "@/types/application";

interface Props {
  application: Application;
}

export default function ApplicationCard({ application }: Props) {
  return (
    <AppCard
      className="
      group
      hover:shadow-lg
      transition-all
      duration-200
      "
    >
      <div
        className="
        flex
        flex-col
        gap-4
        md:flex-row
        md:items-center
        md:justify-between
        "
      >
        <div className="flex-1">
          <div className="flex items-start gap-4">
            <div
              className="
              h-14
              w-14
              rounded-2xl
              bg-blue-50
              text-blue-600
              flex
              items-center
              justify-center
              shrink-0
              "
            >
              <Briefcase size={24} />
            </div>

            <div>
              <span
                className="
  inline-flex
  rounded-full
  bg-blue-50
  px-3
  py-1
  text-xs
  font-medium
  text-blue-600
  "
              >
                Internship
              </span>
              <h3
                className="
                text-lg
                font-semibold
                "
              >
                {application.internshipTitle}
              </h3>

              <div
                className="
                mt-2
                flex
                flex-wrap
                gap-4
                text-sm
                text-slate-500
                "
              >
                <div className="flex items-center gap-2">
                  <Building2 size={15} />
                  {application.companyName}
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays size={15} />

                  {new Date(application.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="
          flex
          items-center
          gap-4
          "
        >
          <StatusBadge status={application.status} />

          <ApplicationProgress status={application.status} />
          <ArrowRight
            size={18}
            className="
            text-slate-400
            transition-all
            group-hover:translate-x-1
            "
          />
        </div>
      </div>
    </AppCard>
  );
}

function ApplicationProgress({ status }: { status: string }) {
  const steps = ["pending", "interview", "accepted"];

  const currentIndex =
    status === "pending"
      ? 0
      : status === "interview"
        ? 1
        : status === "accepted"
          ? 2
          : -1;

  const isRejected = status === "rejected";

  return (
    <div className="mt-4">
      {isRejected ? (
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />

          <span className="text-xs font-medium text-red-600">
            Application Rejected
          </span>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`
                  h-3
                  w-3
                  rounded-full
                  ${index <= currentIndex ? "bg-blue-600" : "bg-blue-100"}
                  `}
                />

                {index < steps.length - 1 && (
                  <div
                    className={`
                    h-[2px]
                    w-10
                    ${index < currentIndex ? "bg-blue-600" : "bg-blue-100"}
                    `}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-2 flex gap-4 text-xs text-slate-500">
            <span>Applied</span>

            <span>Interview</span>

            <span>Accepted</span>
          </div>
        </>
      )}
    </div>
  );
}
