import { ShieldUser } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="inline-block w-full bottom-0 border-t border-slate-200 dark:border-slate-800 py-6 px-4">
      <div className="w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            <span className="text-md">&copy;</span> {new Date().getFullYear()} |
            Corporate Integrity Systems. All Rights Reserved.
          </p>
        </div>
        <div className="flex gap-6">
          <a
            className="text-sm text-slate-500 hover:text-primary transition-colors"
            href="#"
          >
            Compliance Portal Home
          </a>
          <a
            className="text-sm text-slate-500 hover:text-primary transition-colors"
            href="#"
          >
            Ethics Hotline
          </a>
          <a
            className="text-sm text-slate-500 hover:text-primary transition-colors"
            href="#"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
