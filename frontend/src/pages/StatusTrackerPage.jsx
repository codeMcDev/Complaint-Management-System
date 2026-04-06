import {
  ChartNoAxesCombined,
  Download,
  Lock,
  MessageCircle,
  Paperclip,
  Printer,
  Search,
  Send,
} from "lucide-react";
import React, { useState } from "react";
import { useComplaintStore } from "../stores/useComplaintStore";
import { formatDate } from "../utils/dateFormatter";
import { useEffect } from "react";
import { motion } from "framer-motion";
import InvestigationTimeline from "../components/InvestigationTimeline";

const StatusTrackerPage = () => {
  const [formData, setFormData] = useState({});
  const [errors, setFormErrors] = useState({});
  const { trackedComplaint, trackCaseStatus, resetTrackedComplaint } =
    useComplaintStore();

  useEffect(() => {
    resetTrackedComplaint();
  }, []);

  const validateForm = (fd) => {
    const errs = {};
    if (!fd.caseId || !fd.caseId.trim())
      errs.caseId = "Case Number is required.";
    if (!fd.accessKey || !fd.accessKey.trim())
      errs.accessKey = "Access Key is required.";

    // Setting a boolean to control if errors were observed or not
    const isValid = Object.keys(errs).length === 0;

    return { isValid, errs };
  };

  const handleFormDataChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errs } = validateForm(formData);

    if (!isValid) {
      setFormErrors(errs);
      resetTrackedComplaint();
      return;
    }
    setFormErrors({});
    await trackCaseStatus(formData);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* <!-- Page Heading --> */}
      <div className="mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-[#0d141b] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Complaint Status Tracker
          </h1>
          <p className="text-[#4c739a] dark:text-slate-400 text-lg max-w-2xl">
            Enter your credentials below to check the progress of your
            submission. Your anonymity is fully protected through end-to-end
            encrypted identifiers.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* <!-- Left Column: Login / Case Details --> */}
        <div className="lg:col-span-5 space-y-6">
          {/* <!-- Authentication Card --> */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.05)] border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Lock />
                <h3 className="text-xl font-bold text-[#0d141b] dark:text-white">
                  Secure Access
                </h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <label className="flex flex-col">
                    <span className="text-[#0d141b] dark:text-slate-200 text-sm font-semibold pb-2">
                      Case ID
                    </span>
                    <input
                      className="w-full uppercase rounded-lg border-[#cfdbe7] dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0d141b] dark:text-white focus:ring-primary focus:border-primary h-12 px-4 text-base"
                      placeholder="e.g. CMP-9821-XQT"
                      name="caseId"
                      onChange={handleFormDataChange}
                    />
                    {errors.caseId && (
                      <p className="text-sm text-red-600">{errors.caseId}</p>
                    )}
                  </label>
                  <label className="flex flex-col">
                    <span className="text-[#0d141b] dark:text-slate-200 text-sm font-semibold pb-2">
                      Access Key
                    </span>
                    <input
                      className="w-full rounded-lg border-[#cfdbe7] dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[#0d141b] dark:text-white focus:ring-primary focus:border-primary h-12 px-4 text-base"
                      placeholder="Enter 10-digit secure key"
                      type="password"
                      name="accessKey"
                      onChange={handleFormDataChange}
                    />
                    {errors.accessKey && (
                      <p className="text-sm text-red-600">{errors.accessKey}</p>
                    )}
                  </label>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white font-bold h-12 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mt-2"
                  >
                    <Search />
                    {`${!trackedComplaint ? "Check Status" : "Refresh Status"}`}
                  </button>
                </div>
              </form>
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-[#4c739a] dark:text-slate-500 italic">
                  Note: If you have lost your Access Key, please contact IT
                  Security. Due to anonymity protocols, we cannot recover keys.
                </p>
              </div>
            </div>
          </div>
          {/* <!-- Case Summary Mini-Card (Visible after auth) --> */}
          <div
            className={`${trackedComplaint ? "" : "hidden"} p-4 rounded-xl border-l-4 border-primary bg-primary/5 dark:bg-primary/10`}
          >
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
              Authenticated Case
            </p>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[#0d141b] dark:text-white font-bold">
                  {trackedComplaint?.title}
                </p>
                <p className="text-sm text-[#4c739a] dark:text-slate-400">
                  Filed on{" "}
                  {formatDate(trackedComplaint?.createdAt).formattedDate()}
                </p>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100 text-[10px] font-bold rounded uppercase">
                {trackedComplaint?.priority}
              </span>
            </div>
          </div>
        </div>
        {!trackedComplaint && (
          <div className="lg:col-span-7 space-y-6">
            <motion.h2
              className="text-6xl text-center text-red-500"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <img
                src="/personal_checklist.gif"
                className="rounded-lg shadow-md"
                alt="status-image"
              />
            </motion.h2>
          </div>
        )}
        {trackedComplaint && (
          <div className="lg:col-span-7 space-y-6">
            {/* <!-- Status Timeline --> */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.05)] border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-lg font-bold text-[#0d141b] dark:text-white mb-6 flex items-center gap-2">
                <ChartNoAxesCombined className="material-symbols-outlined text-primary" />
                Investigation Timeline
              </h3>
              <div className="relative space-y-8">
                {/* <!-- Timeline Line --> */}
                <div className="absolute left-4 top-0 h-full w-0.5 bg-slate-200 dark:bg-slate-800"></div>
                {/* <!-- Step 1 (Report Submitted) --> */}
                <InvestigationTimeline complaint={trackedComplaint} index={0} />

                {/* <!-- Step 2 (Under Initial Review) --> */}
                <InvestigationTimeline complaint={trackedComplaint} index={1} />

                {/* <!-- Step 3 (Active Investigation) --> */}
                <InvestigationTimeline complaint={trackedComplaint} index={2} />

                {/* <!-- Step 4 (Resolution & Outcome) --> */}
                <InvestigationTimeline complaint={trackedComplaint} index={3} />
              </div>
            </div>
            {/* <!-- Messaging / Communication Interface --> */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.05)] border border-slate-200 dark:border-slate-800 flex flex-col h-[500px]">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MessageCircle className="material-symbols-outlined text-primary" />

                  <h3 className="font-bold text-[#0d141b] dark:text-white">
                    Secure Communication
                  </h3>
                </div>
                <span className="text-[10px] bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full font-bold uppercase">
                  Encrypted
                </span>
              </div>
              {/* <!-- Chat Feed --> */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* <!-- Admin Message --> */}
                <div className="flex flex-col items-start max-w-[85%]">
                  <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg rounded-tl-none">
                    <p className="text-sm text-[#0d141b] dark:text-slate-200">
                      Hello. To proceed with the investigation, could you please
                      clarify the specific date when the second incident
                      occurred?
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1">
                    Admin Team • Oct 15, 09:12 AM
                  </span>
                </div>
                {/* <!-- User Message --> */}
                <div className="flex flex-col items-end ml-auto max-w-[85%]">
                  <div className="bg-primary p-3 rounded-lg rounded-tr-none text-white">
                    <p className="text-sm">
                      The second incident happened on Oct 10th during the
                      afternoon shift meeting.
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1">
                    You (Anonymous) • Oct 15, 11:30 AM
                  </span>
                </div>
                {/* <!-- System Notification --> */}
                <div className="flex justify-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded">
                    New evidence uploaded by admin
                  </span>
                </div>
              </div>
              {/* <!-- Input Area --> */}
              <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex gap-2">
                  <button className="flex items-center justify-center p-2 text-slate-400 hover:text-primary transition-colors">
                    <Paperclip className="material-symbols-outlined" />
                  </button>
                  <input
                    className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-lg h-10 px-4 text-sm focus:ring-1 focus:ring-primary dark:text-white"
                    placeholder="Type an anonymous message..."
                    type="text"
                  />
                  <button className="bg-primary text-white size-10 rounded-lg flex items-center justify-center hover:bg-primary/90 transition-all">
                    <Send className="material-symbols-outlined" />
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 text-center">
                  Your identity remains hidden. Messages are transmitted via
                  secure gateway.
                </p>
              </div>
            </div>
            {/* <!-- Actions Footer --> */}
            <div className="flex flex-wrap gap-4 justify-end">
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-[#4c739a] dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all">
                <Printer className="material-symbols-outlined text-sm" />
                Print Summary
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-[#4c739a] dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-all">
                <Download className="material-symbols-outlined text-sm" />
                Export PDF
              </button>
            </div>
          </div>
        )}
        {/* <!-- Right Column: Status & Timeline --> */}
      </div>
    </main>
  );
};

export default StatusTrackerPage;
