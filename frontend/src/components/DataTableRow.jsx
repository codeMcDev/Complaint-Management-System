import { EyeOff, User } from "lucide-react";
import React from "react";
import { formatDate } from "../utils/dateFormatter";
import { Link } from "react-router-dom";
import { ComplaintStatus } from "../utils/statusSwitcher";

const DataTableRow = ({ complaints }) => {
  return (
    <table className="w-full text-left">
      <thead className="bg-slate-50 dark:bg-slate-800/30 text-[#4c739a] dark:text-slate-400 uppercase text-[11px] font-bold tracking-widest">
        <tr>
          <th className="px-6 py-4">ID</th>
          <th className="px-6 py-4">Category</th>
          <th className="px-6 py-4">Date Submitted</th>
          <th className="px-6 py-4">Type</th>
          <th className="px-6 py-4">Status</th>
          <th className="px-6 py-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
        {complaints?.map((complaint) => (
          <tr
            key={complaint.caseId}
            className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <td className="px-6 py-4 font-bold text-sm">{complaint.caseId}</td>
            <td className="px-6 py-4 text-sm font-medium">
              {complaint.category}
            </td>
            <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
              {formatDate(complaint.createdAt).formattedDate()}
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 capitalize">
                <span
                  className={`${complaint.reportingMode === "anonymous" ? "text-amber-500" : "text-blue-500"} `}
                >
                  {complaint.reportingMode === "anonymous" ? (
                    <EyeOff size={18} />
                  ) : (
                    <User size={18} />
                  )}
                </span>
                {complaint.reportingMode}
              </div>
            </td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-bold text-blue-700 dark:text-blue-400">
                {ComplaintStatus(complaint.status)}
              </span>
            </td>
            <td className="px-6 py-4 text-right">
              <Link
                to={`/case-detail/${complaint.caseId}`}
                className="text-primary hover:underline text-sm font-bold"
              >
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTableRow;
