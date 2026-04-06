import React from "react";

const DashboardCard = ({ props }) => {
  return (
    <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm">
      <div className="flex justify-between items-start">
        <p className="text-[#4c739a] dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">
          {props.title}
        </p>
        <span
          className={`${props.title === "pending review" ? "bg-amber-500/10 text-amber-500" : props.title === "resolved" ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"} p-2 rounded-lg`}
        >
          {props.icon}
        </span>
      </div>
      <p className="text-[#0d141b] dark:text-white tracking-light text-3xl font-bold leading-tight">
        {props.value}
      </p>
      <p
        className={`${props.trendDirection === "down" ? "text-[#078838]" : "text-[#e73908]"} text-sm font-semibold flex items-center gap-1`}
      >
        <span className="mr-2">{props.trendIcon}</span> {props.trendValue} vs
        last month
      </p>
    </div>
  );
};

export default DashboardCard;
