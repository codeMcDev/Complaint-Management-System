import { useComplaintStore } from "../stores/useComplaintStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  ArrowRight,
  CircleCheckBig,
  Copy,
  FileText,
  Key,
  TriangleAlert,
} from "lucide-react";
import ProgressBar from "../components/ProgressBar";
import copyText from "../utils/copyText";
import { generateComplaintPdf } from "../utils/generatePDF";

const SuccessPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); // or "instant"
  }, []);

  const navigate = useNavigate();
  const { newCaseId } = useParams();

  //get last complaint statuses and the complaint details for the user.
  const { newComplaintSuccess, lastComplaintCreated } = useComplaintStore();

  const { caseNumber, accessKey } = lastComplaintCreated ?? {};

  useEffect(() => {
    if (
      !newComplaintSuccess ||
      !lastComplaintCreated ||
      newCaseId !== lastComplaintCreated.caseNumber
    )
      navigate("/", { replace: true });
  }, [newComplaintSuccess, lastComplaintCreated, newCaseId, navigate]);

  if (!lastComplaintCreated) return null;

  return (
    <main className="flex flex-1 flex-col items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full flex flex-col items-center">
        <ProgressBar page={2} percentage={100} />
        {/* <!-- Success Header Section --> */}
        <div className="mb-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center size-20 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-6 shadow-sm">
            <CircleCheckBig className="!text-xl rounded-full" size={42} />
          </div>
          <h1 className="text-[#0d141b] dark:text-white tracking-tight text-[32px] md:text-[40px] font-bold leading-tight pb-3">
            Submission Received Successfully
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg font-normal leading-relaxed max-w-md mx-auto">
            Your report has been logged. Please save the credentials below to
            track your case status later.
          </p>
        </div>
        {/* <!-- Credential Card --> */}
        <div className="w-full bg-white dark:bg-[#1a2632] rounded-xl shadow-xl shadow-black/5 border border-slate-100 dark:border-slate-800 p-6 md:p-8 mb-8">
          <div className="flex flex-col gap-8">
            {/* <!-- Case ID Field --> */}
            <div className="group">
              <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Case Reference ID
              </label>
              <div className="flex items-center justify-between gap-4 p-4 bg-background-light dark:bg-background-dark rounded-lg border border-slate-200 dark:border-slate-700 group-hover:border-primary/50 transition-colors">
                <p
                  id="caseNumber"
                  className="text-2xl font-mono font-bold tracking-tight text-[#0d141b] dark:text-white"
                >
                  {caseNumber}
                </p>
                <button
                  onClick={() => copyText("caseNumber")}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all active:scale-95 text-sm font-bold shadow-md shadow-primary/20"
                >
                  <Copy className="mr-1" size={20} />
                  Copy ID
                </button>
              </div>
            </div>
            {/* <!-- Access Key Field --> */}
            <div className="group">
              <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Secure Access Key
              </label>
              <div className="flex items-center justify-between gap-4 p-4 bg-background-light dark:bg-background-dark rounded-lg border border-slate-200 dark:border-slate-700 group-hover:border-primary/50 transition-colors">
                <p
                  id="accessKey"
                  className="text-2xl font-mono font-bold tracking-tight text-primary"
                >
                  {accessKey}
                </p>
                <button
                  onClick={() => copyText("accessKey")}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95 text-sm font-bold shadow-sm"
                >
                  <Key className="mr-1" size={20} />
                  Copy Key
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Warning Banner --> */}
        <div className="w-full flex items-start gap-4 p-5 rounded-xl border border-warning-accent/30 bg-warning-accent/5 dark:bg-warning-accent/10 mb-10">
          <TriangleAlert className="text-warning-accent" size={48} />

          <div className="flex flex-col gap-1">
            <h4 className="text-warning-accent font-bold text-sm uppercase tracking-wide">
              Action Required
            </h4>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              <strong>Important:</strong> For your privacy, we do not store
              these keys in a way that can be recovered by support. Please copy
              or download them now. If lost, you will not be able to track this
              report.
            </p>
          </div>
        </div>
        {/* <!-- Final Action Group --> */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button
            onClick={() => generateComplaintPdf(lastComplaintCreated)}
            className="flex-1 flex items-center justify-center gap-2 h-14 rounded-xl border-2 border-primary text-primary hover:bg-primary/5 transition-colors font-bold text-base"
          >
            <FileText className="mr-1" />
            Download Summary PDF
          </button>
          <Link
            to={"/"}
            className="flex-1 flex items-center justify-center gap-2 h-14 rounded-xl bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30 transition-all active:scale-95 font-bold text-base"
          >
            Return to Portal
            <ArrowRight className="ml-1" />
          </Link>
        </div>
        {/* <!-- Decorative Background Element --> */}
        <div className="fixed top-0 right-0 -z-10 opacity-10 pointer-events-none overflow-hidden">
          <div className="w-[800px] h-[800px] bg-primary rounded-full blur-[120px] -mr-[400px] -mt-[400px]"></div>
        </div>
      </div>
    </main>
  );
};

export default SuccessPage;
