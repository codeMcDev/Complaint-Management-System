import { Bell, Search, Settings, ShieldUser } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const AdminNavBar = () => {
  const { logout } = useAuthStore();
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-slate-900 px-10 py-3">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 text-[#0d141b] dark:text-white">
          <div className="size-6 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">
              <ShieldUser />
            </span>
          </div>
          <h2 className="text-[#0d141b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            Admin Portal
          </h2>
        </div>
        <nav className="flex items-center gap-9">
          <a
            className="text-primary text-sm font-semibold leading-normal border-b-2 border-primary pb-1"
            href="#"
          >
            Dashboard
          </a>
          <a
            className="text-[#0d141b] dark:text-slate-300 text-sm font-medium leading-normal hover:text-primary transition-colors"
            href="#"
          >
            Reports
          </a>
          <a
            className="text-[#0d141b] dark:text-slate-300 text-sm font-medium leading-normal hover:text-primary transition-colors"
            href="#"
          >
            User Management
          </a>
          <a
            className="text-[#0d141b] dark:text-slate-300 text-sm font-medium leading-normal hover:text-primary transition-colors"
            href="#"
          >
            Settings
          </a>
        </nav>
      </div>
      <div className="flex flex-1 justify-end gap-6 items-center">
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
              <Search />
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all"
              placeholder="Global search"
              type="text"
            />
          </div>
        </div>
        <button className="relative p-2 text-slate-500 dark:text-slate-400">
          <Bell />
          <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200 dark:border-slate-700"
          data-alt="Administrator profile picture"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuASIFXFToWBrL24ofas5tFLy06aNjn45MEpTglIJVofCdKdH8BMkh2FJrrAF3IUpQ3J2EmeOO1Q6n-zBWCbjqIGTjtTVjjLnnAOU1EvZ2PQ9Eypma1qytSHpDSn3wcoTnzmDrydcf6Akmd3i9NJAg3cdJ4l93SR3F4cyTelopL9OhgYksSc5iAcBHIiHwTdVblUBxrJJgzYslTfmxkr5BMBTFtBR0QAv7hha58MsINJMfors1b0A4W2zShOuJ_f4q5oN-qyl7elWaSZ"
            alt=""
            className="rounded-full object-cover"
          />
        </div>
        <button
          onClick={() => logout()}
          className="flex items-center justify-center rounded-lg h-10 px-4 bg-red-500 hover:bg-red-500/70 text-white text-sm font-bold transition-all shadow-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminNavBar;
