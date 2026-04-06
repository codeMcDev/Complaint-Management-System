import React, { useEffect } from "react";
import { ArrowRight, HatGlasses, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useComplaintStore } from "../stores/useComplaintStore";

const HomePage = () => {
  //Allow auto scrolling to the top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-500 dark:bg-primary/10 text-yellow-300 mb-4">
            Secure &amp; Encrypted Environment
          </span>
          <h1 className="text-slate-900 dark:text-white tracking-tight text-4xl sm:text-5xl font-extrabold leading-tight pb-6">
            Corporate Integrity &amp; <br />
            <span className="text-primary">Complaint Portal</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Your voice matters. Report concerns safely and securely. Our
            commitment to privacy ensures your reports are handled with the
            highest level of confidentiality and professional integrity.
          </p>
        </div>
      </section>
      {/* Main Action Cards */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Anonymous Complaint */}
            <div className="group relative flex flex-col p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="size-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <HatGlasses />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Submit Anonymous Complaint
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 grow">
                No personal information is collected. Your identity remains
                completely hidden from the organization. Best for highly
                sensitive disclosures.
              </p>
              <Link to={"/submit-complaint/anonymous"}>
                <button className="w-full h-14 rounded-lg bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                  Get Started Anonymously
                  <ArrowRight />
                </button>
              </Link>
            </div>

            {/* Detailed Complaint */}
            <div className="group relative flex flex-col p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="size-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="">
                  <User />
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Submit with Details
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 grow">
                Provide your contact information for direct follow-up and faster
                investigation resolution. Allows compliance teams to reach out
                for more evidence.
              </p>
              <Link to={"/submit-complaint/identified"}>
                <button className="w-full h-14 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700">
                  Submit with Details
                  <ArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
