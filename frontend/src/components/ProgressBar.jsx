import { ArrowRight } from "lucide-react";

const ProgressBar = ({ page, percentage }) => {
  return (
    <div className="flex w-full flex-col gap-3 mb-8 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex gap-6 justify-between">
        <p className="text-[#0d141b] dark:text-white text-base font-semibold leading-normal">
          Step {page} of 2: Identity &amp; Details
        </p>
        <p className="text-primary text-sm font-bold leading-normal">
          {`${percentage}%`} Complete
        </p>
      </div>
      <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-2 overflow-hidden">
        <div
          className="h-full bg-primary"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
        <ArrowRight size={14} />
        Next: Save Case Details.
      </div>
    </div>
  );
};

export default ProgressBar;
