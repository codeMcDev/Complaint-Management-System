import React, { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { Eye, EyeOff, HatGlasses, Loader2, Send, User } from "lucide-react";
import { useComplaintStore } from "../stores/useComplaintStore";
import EvidenceDropzone from "../components/EvidenceDropZone";
import { useNavigate } from "react-router-dom";
import { validateComplaintForm } from "../utils/formValidator";
import { toast } from "react-hot-toast";

const SubmitPage = ({ isAnonymous }) => {
  const { loading, createNewComplaint } = useComplaintStore();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    reportingMode: isAnonymous ? "anonymous" : "identified",
    reporterName: "",
    reporterEmail: "",
    category: "",
    incidentDate: "",
    title: "",
    description: "",
    evidence: [],
  });

  const [formErrors, setFormErrors] = useState({});

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" }); // or "smooth"
  }, []);

  const handleFormDataChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEvidenceSelected = (files) => {
    // If you want to REPLACE:
    // setFormData((prev) => ({ ...prev, evidenceFiles: files }));
    // APPEND file to evidence array:
    setFormData((prev) => ({
      ...prev,
      evidence: [...(prev.evidence || []), ...files],
    }));
  };

  const clearForm = () => {
    const cancelConfirmation = confirm(
      "Are you sure you want to quit the submission? All changes will not be saved or submitted",
    );
    if (!cancelConfirmation) return;
    document.getElementById("complaint-form").reset();
    setFormData({
      reportingMode: isAnonymous ? "anonymous" : "identified",
      evidence: [],
    });
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid, errors } = validateComplaintForm(formData);

    if (!isValid) {
      setFormErrors(errors);
      const firstErrorMessage =
        errors.reporterName ||
        errors.reporterEmail ||
        errors.category ||
        errors.incidentDate ||
        errors.title ||
        errors.description ||
        errors.reportingMode ||
        errors.evidence;

      if (firstErrorMessage) {
        toast.error(firstErrorMessage);
      }

      return;
    }
    try {
      const created = await createNewComplaint(formData);

      if (!created) return;
      const newCaseId = created.caseNumber;

      navigate(`/success-page/${newCaseId}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    // Heading
    <main className="flex flex-1 justify-center py-10">
      <div className="layout-content-container flex flex-col max-w-4xl flex-1 px-4">
        <div className="flex flex-wrap justify-between gap-3 mb-6">
          <div className="flex min-w-72 flex-col gap-2">
            <h1 className="text-[#0d141b] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
              Submit a Formal Complaint
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
              Please provide detailed information to help us investigate the
              matter effectively. Your confidentiality is our priority.
            </p>
          </div>
        </div>
        {/* Progress Bar */}
        <ProgressBar percentage={50} page={1} />

        {/* Form area */}
        <form onSubmit={handleSubmit} id="complaint-form">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-8 pt-8 pb-4">
              <h2 className="text-[#0d141b] dark:text-white text-[20px] font-bold leading-tight tracking-[-0.015em] flex items-center gap-2">
                {isAnonymous ? (
                  <EyeOff className="text-primary" />
                ) : (
                  <Eye className="text-primary" />
                )}
                Reporting Mode
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                {isAnonymous
                  ? "You are now reporting anonymously"
                  : "You will be identified in this report"}
              </p>
            </div>

            <div className="flex px-8 py-3">
              <div className="flex h-12 flex-1 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
                {isAnonymous && (
                  <label className="flex cursor-not-allowed h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-700 has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-slate-400 text-sm font-semibold transition-all">
                    <span className="flex items-center gap-2">
                      <HatGlasses />
                      Anonymous
                    </span>
                    <input
                      checked={formData.reportingMode === "anonymous"}
                      className="hidden"
                      id="anonymous"
                      name="reportingMode"
                      type="radio"
                      value="anonymous"
                      onChange={(e) => {
                        setFormData({ reportingMode: e.target.value });
                        toggleIsAnonymous();
                      }}
                    />
                  </label>
                )}
                {!isAnonymous && (
                  <label className="flex cursor-not-allowed h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-slate-700 has-[:checked]:shadow-sm has-[:checked]:text-primary text-slate-500 dark:text-slate-400 text-sm font-semibold transition-all">
                    <span className="flex items-center gap-2">
                      <User />
                      Identified
                    </span>
                    <input
                      checked={formData.reportingMode === "identified"}
                      className="hidden"
                      id="identified"
                      name="reportingMode"
                      type="radio"
                      value="identified"
                      onChange={(e) => {
                        setFormData({ reportingMode: e.target.value });
                        toggleIsAnonymous();
                      }}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="px-8 py-4 md:grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label
                  className={`text-sm ${isAnonymous ? "line-through" : ""} font-semibold text-[#0d141b] dark:text-slate-300`}
                >
                  Full Name{" "}
                  {!isAnonymous && <span className="text-red-500">*</span>}
                </label>
                <input
                  className="w-full p-2 rounded-lg border border-slate-300 disabled:border-0 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 disabled:cursor-not-allowed placeholder:text-sm"
                  disabled={isAnonymous}
                  //required
                  placeholder="John Doe"
                  type="text"
                  name="reporterName"
                  onChange={handleFormDataChange}
                />
                {isAnonymous && (
                  <p className="text-sm text-slate-400 italic">
                    "Enabled only in Identified mode"
                  </p>
                )}
                {formErrors.reporterName && (
                  <p className="text-xs text-red-400">
                    {formErrors.reporterName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className={`text-sm ${isAnonymous ? "line-through" : ""} font-semibold text-[#0d141b] dark:text-slate-300 mt-4 md:mt-0`}
                >
                  Email{" "}
                  {!isAnonymous && <span className="text-red-500">*</span>}
                </label>
                <input
                  className="w-full p-2 rounded-lg border border-slate-300 disabled:border-0 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 disabled:cursor-not-allowed placeholder:text-sm"
                  disabled={isAnonymous}
                  placeholder="name@example.com"
                  type="email"
                  name="reporterEmail"
                  onChange={handleFormDataChange}
                />
                {formErrors.reporterEmail && (
                  <p className="text-xs text-red-400">
                    {formErrors.reporterEmail}
                  </p>
                )}
              </div>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-800 mx-8 my-4" />

            <div className="px-8 pb-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#0d141b] dark:text-slate-300">
                    Complaint Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary"
                    name="category"
                    onChange={handleFormDataChange}
                  >
                    <option value="">Select a category</option>
                    <option value="Human Resources & Workplace Conduct">
                      Human Resources &amp; Workplace Conduct
                    </option>
                    <option value="IT & Cybersecurity">
                      IT &amp; Cybersecurity
                    </option>
                    <option value="Ethics & Compliance">
                      Ethics &amp; Compliance
                    </option>
                    <option value="Health & Safety">Health &amp; Safety</option>
                    <option value="Financial Misconduct">
                      Financial Misconduct
                    </option>
                  </select>
                  {formErrors.title && (
                    <p className="text-xs text-red-400">
                      {formErrors.category}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#0d141b] dark:text-slate-300">
                    Date of Incident
                  </label>

                  <div className="relative">
                    <input
                      className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary"
                      type="date"
                      name="incidentDate"
                      max={today}
                      onChange={handleFormDataChange}
                    />
                    {formErrors.incidentDate && (
                      <p className="text-xs text-red-400">
                        {formErrors.incidentDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="title"
                  className="text-sm font-semibold text-[#0d141b] dark:text-slate-300"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full p-2 mb-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 placeholder:text-sm"
                  placeholder="Eg. Harassment Allegation, Financial Misconduct, Bribery & Corruption, etc."
                  type="text"
                  id="title"
                  name="title"
                  onChange={handleFormDataChange}
                />
                {formErrors.title && (
                  <p className="text-xs text-red-400">{formErrors.title}</p>
                )}
                <label className="text-sm font-semibold text-[#0d141b] dark:text-slate-300">
                  Incident Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary placeholder:text-sm"
                  placeholder="Please provide a detailed description of the incident"
                  rows="5"
                  name="description"
                  onChange={handleFormDataChange}
                  maxLength={2000}
                ></textarea>
                <p className="text-xs text-slate-400 italic">
                  Be as specific as possible (who, what, when, where).
                </p>
                {formErrors.description && (
                  <p className="text-xs text-red-400">
                    {formErrors.description}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#0d141b] dark:text-slate-300">
                  Evidence &amp; Attachments (Optional)
                </label>
                <EvidenceDropzone onFilesSelected={handleEvidenceSelected} />
                {/* Preview selected files */}
                {formData.evidence?.length > 0 && (
                  <ul className="mt-3 space-y-1 text-sm text-slate-300">
                    {formData.evidence?.map((file, idx) => (
                      <li key={idx}>
                        {file.name} ({Math.round(file.size / 1024)} KB)
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="px-8 py-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <button
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                onClick={clearForm}
                type="button"
              >
                Cancel
              </button>
              <div className="flex gap-4">
                <button
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 shadow-md shadow-primary/20 transition-all disabled:bg-slate-500"
                  disabled={loading}
                  type="submit"
                >
                  {loading && <Loader2 className="animate-spin " />}
                  {loading ? "Sending" : "Send"}

                  <Send className={loading ? "hidden" : ""} />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SubmitPage;
