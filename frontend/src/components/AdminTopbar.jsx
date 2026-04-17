import React from "react";
import { Bell, Menu, Search } from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";

const AdminTopbar = ({ onMenuClick = () => {} }) => {
  const { logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-lg font-bold text-slate-900 dark:text-white">
          Admin Dashboard
        </h1>
      </div>

      <div className="hidden w-full max-w-sm md:block">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={18} />
          </span>
          <input
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            placeholder="Global search"
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
          <Bell size={20} />
          <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="hidden items-center gap-3 sm:flex">
          <div className="size-10 overflow-hidden rounded-full border border-slate-200 dark:border-slate-700">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuASIFXFToWBrL24ofas5tFLy06aNjn45MEpTglIJVofCdKdH8BMkh2FJrrAF3IUpQ3J2EmeOO1Q6n-zBWCbjqIGTjtTVjjLnnAOU1EvZ2PQ9Eypma1qytSHpDSn3wcoTnzmDrydcf6Akmd3i9NJAg3cdJ4l93SR3F4cyTelopL9OhgYksSc5iAcBHIiHwTdVblUBxrJJgzYslTfmxkr5BMBTFtBR0QAv7hha58MsINJMfors1b0A4W2zShOuJ_f4q5oN-qyl7elWaSZ"
              alt="Administrator profile"
              className="h-full w-full object-cover"
            />
          </div>
          <button
            onClick={logout}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-red-500/80"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
