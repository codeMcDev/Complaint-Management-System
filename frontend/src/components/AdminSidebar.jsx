import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  ShieldUser,
  X,
  LogOut,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    to: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Reports",
    to: "/admin-dashboard/reports",
    icon: FileText,
  },
  {
    label: "User Management",
    to: "/admin-dashboard/users",
    icon: Users,
  },
  {
    label: "Settings",
    to: "/admin-dashboard/settings",
    icon: Settings,
  },
];

const AdminSidebar = ({ isOpen = false, onClose = () => {} }) => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/admin-dashboard") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    onClose();
    logout();
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 border-r border-slate-200 bg-white transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-white">
              <ShieldUser size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-[-0.015em] text-slate-900 dark:text-white">
                Complaint Management Portal
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex h-[calc(100vh-4rem)] flex-col justify-between px-4 py-5">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to);

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all
                    ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="size-12 overflow-hidden rounded-full border border-slate-200 dark:border-slate-700 shrink-0">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuASIFXFToWBrL24ofas5tFLy06aNjn45MEpTglIJVofCdKdH8BMkh2FJrrAF3IUpQ3J2EmeOO1Q6n-zBWCbjqIGTjtTVjjLnnAOU1EvZ2PQ9Eypma1qytSHpDSn3wcoTnzmDrydcf6Akmd3i9NJAg3cdJ4l93SR3F4cyTelopL9OhgYksSc5iAcBHIiHwTdVblUBxrJJgzYslTfmxkr5BMBTFtBR0QAv7hha58MsINJMfors1b0A4W2zShOuJ_f4q5oN-qyl7elWaSZ"
                    alt="Administrator profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    Administrator
                  </p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    Secure admin session active
                  </p>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                All actions are logged and monitored.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-red-500/80"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
