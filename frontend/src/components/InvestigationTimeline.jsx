import { Check, CheckCheck, Hourglass } from "lucide-react";
import { formatDate } from "../utils/dateFormatter";

const InvestigationTimeline = ({ complaint, index }) => {
  const statusToIndex = (status) => {
    switch (status) {
      case "PENDING_REVIEW":
        return 0;
      case "UNDER_REVIEW":
        return 1;
      case "IN_PROGRESS":
        return 2;
      case "RESOLVED":
      case "CLOSED":
      case "REJECTED":
        return 3;
      default:
        return 0;
    }
  };

  const buildTimelineState = (status) => {
    const currentStatus = statusToIndex(status);
    return [
      { step: "Report Submitted", index: 0 },
      { step: "Under Initial Review", index: 1 },
      { step: "Active Investigation", index: 2 },
      { step: "Resolution & Outcome", index: 3 },
    ].map((s) => ({
      ...s,
      state:
        s.index < currentStatus || s.index === 0
          ? "completed"
          : s.index === currentStatus
            ? "current"
            : "pending",
      // optional: special final outcome label
      outcome: s.index === 3 && s.index === currentStatus ? status : null,
      opacity: s.index > currentStatus ? "opacity-30" : "opacity-100",
      activityDate:
        s.index === 0
          ? formatDate(complaint.createdAt).formattedDate() +
            " • " +
            formatDate(complaint.createdAt).formattedTime()
          : s.index === currentStatus
            ? "Current Status"
            : s.index < currentStatus
              ? formatDate(complaint.lastActivity).formattedDate() +
                " • " +
                formatDate(complaint.lastActivity).formattedTime()
              : "Pending",
      description:
        s.step === "Report Submitted"
          ? "Your report was successfully encrypted and sent to the Internal Affairs team."
          : s.step === "Under Initial Review"
            ? "An investigator has been assigned and is reviewing the submitted documentation."
            : s.step === "Active Investigation"
              ? "Evidence gathering and/or witness interviews are currently in progress."
              : s.step === "Resolution & Outcome"
                ? (s.outcome ?? null)
                : null,
    }));
  };

  const steps = buildTimelineState(complaint.status);

  return (
    <div
      className={`relative flex gap-6 ${steps[index].opacity}`}
      key={steps[index].index}
    >
      {steps[index].state === "completed" ? (
        <div
          className={
            "z-10 flex size-9 items-center justify-center rounded-full bg-primary text-white shrink-0"
          }
        >
          <CheckCheck />
        </div>
      ) : steps[index].state === "current" ? (
        <div className="z-10 flex size-9 items-center justify-center rounded-full bg-white dark:bg-slate-900 border-2 border-warning-accent text-warning-accent shrink-0 animate-pulse">
          <Hourglass size={20} />
        </div>
      ) : (
        <div className="z-10 flex size-9 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 shrink-0">
          <Check />
        </div>
      )}
      <div>
        <p className="text-sm font-bold text-[#0d141b] dark:text-white">
          {steps[index].step}
        </p>
        <p className="text-xs text-[#4c739a] dark:text-slate-400">
          {steps[index].activityDate}
        </p>
        {(steps[index].state === "completed" ||
          steps[index].state === "current") && (
          <p className="text-sm text-[#4c739a] dark:text-slate-300 mt-1">
            {steps[index].description}
            {steps[index].outcome}
          </p>
        )}
      </div>
    </div>
  );
};

export default InvestigationTimeline;
