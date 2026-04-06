import { Menu, ShieldUser } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary text-white">
              <ShieldUser />
            </div>
            <Link to={"/"}>
              <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">
                Corporate Integrity Portal
              </h2>
            </Link>
          </div>

          {/*Right side of NavBar*/}
          <div className="flex flex-1 justify-end items-center gap-6">
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to={"/"}
                className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to={"/check-status"}
                className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors"
              >
                Check Status
              </Link>

              <Link
                to={"/policies"}
                className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary dark:hover:text-primary transition-colors"
              >
                Policies
              </Link>
            </nav>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary hover:bg-primary/70 text-white text-sm font-bold transition-all shadow-sm"
            >
              <Menu size={20} className="md:hidden mr-2" />
              <Link to={"/admin-dashboard"} className="hidden md:flex">
                Admin Login
              </Link>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden text-center transition-all duration-300 overflow-hidden ${
          isOpen ? "block max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-4 bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-slate-700 dark:text-slate-200 text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>

          <Link
            to="/check-status"
            onClick={() => setIsOpen(false)}
            className="block text-slate-700 dark:text-slate-200 text-sm font-medium hover:text-primary transition-colors"
          >
            Check Status
          </Link>

          <Link
            to="/policies"
            onClick={() => setIsOpen(false)}
            className="block text-slate-700 dark:text-slate-200 text-sm font-medium hover:text-primary transition-colors"
          >
            Policies
          </Link>

          <Link
            to="/admin-dashboard"
            onClick={() => setIsOpen(false)}
            className="block text-white bg-primary text-center rounded-lg py-2 font-semibold"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
