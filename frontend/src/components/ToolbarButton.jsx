import React from "react";

const ToolbarButton = ({ icon }) => {
  return (
    <button className="p-2.5 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex items-center justify-center">
      {icon}
    </button>
  );
};

export default ToolbarButton;
