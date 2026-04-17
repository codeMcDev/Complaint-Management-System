import { Bell, Search, Menu, X, ShieldUser } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const navLinks = [
  { label: "Dashboard", to: "/admin-dashboard" },
  { label: "Reports", to: "/admin-dashboard/reports" },
  { label: "User Management", to: "/admin-dashboard/users" },
  { label: "Settings", to: "/admin-dashboard/settings" },
];

const AdminNavBar = () => {
  const { logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e7edf3] dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-white shrink-0">
              <ShieldUser size={20} />
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold tracking-[-0.015em] text-[#0d141b] dark:text-white">
                Admin Portal
              </h2>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm transition-colors ${
                  isActive(link.to)
                    ? "text-primary font-semibold border-b-2 border-primary pb-1"
                    : "text-[#0d141b] dark:text-slate-300 font-medium hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex flex-1 justify-end items-center gap-4">
            <div className="w-full max-w-sm">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Search size={18} />
                </span>
                <input
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-10 pr-4 py-2 text-sm text-[#0d141b] dark:text-white outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Global search"
                  type="text"
                />
              </div>
            </div>

            <button className="relative rounded-lg p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
              <Bell size={20} />
              <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className="size-10 overflow-hidden rounded-full border border-slate-200 dark:border-slate-700 shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuASIFXFToWBrL24ofas5tFLy06aNjn45MEpTglIJVofCdKdH8BMkh2FJrrAF3IUpQ3J2EmeOO1Q6n-zBWCbjqIGTjtTVjjLnnAOU1EvZ2PQ9Eypma1qytSHpDSn3wcoTnzmDrydcf6Akmd3i9NJAg3cdJ4l93SR3F4cyTelopL9OhgYksSc5iAcBHIiHwTdVblUBxrJJgzYslTfmxkr5BMBTFtBR0QAv7hha58MsINJMfors1b0A4W2zShOuJ_f4q5oN-qyl7elWaSZ"
                alt="Administrator profile"
                className="h-full w-full object-cover"
              />
            </div>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-red-500/80"
            >
              Logout
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button className="relative rounded-lg p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
              <Bell size={20} />
              <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="rounded-lg p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle admin menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-[520px] pb-4 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={18} />
              </span>
              <input
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-10 pr-4 py-2 text-sm text-[#0d141b] dark:text-white outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Global search"
                type="text"
              />
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive(link.to)
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-[#0d141b] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3 rounded-lg border border-slate-200 dark:border-slate-800 p-3">
              <div className="size-10 overflow-hidden rounded-full border border-slate-200 dark:border-slate-700 shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuASIFXFToWBrL24ofas5tFLy06aNjn45MEpTglIJVofCdKdH8BMkh2FJrrAF3IUpQ3J2EmeOO1Q6n-zBWCbjqIGTjtTVjjLnnAOU1EvZ2PQ9Eypma1qytSHpDSn3wcoTnzmDrydcf6Akmd3i9NJAg3cdJ4l93SR3F4cyTelopL9OhgYksSc5iAcBHIiHwTdVblUBxrJJgzYslTfmxkr5BMBTFtBR0QAv7hha58MsINJMfors1b0A4W2zShOuJ_f4q5oN-qyl7elWaSZ"
                  alt="Administrator profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#0d141b] dark:text-white">
                  Administrator
                </p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  Secure admin session
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full rounded-lg bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-red-500/80"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavBar;
