import {
  CheckCircle,
  Download,
  File,
  FileText,
  History,
  Lock,
  Image,
  Paperclip,
  MessageSquareLock,
  SendHorizontal,
  UserCog,
  UserSearch,
  CirclePlus,
  User,
  MessageSquareText,
} from "lucide-react";

const CaseDetailPage = () => {
  return (
    <main className="max-w-fit mx-auto px-6 py-8">
      {/* <!-- Breadcrumbs --> */}
      <nav className="flex flex-wrap gap-2 mb-4 px-4">
        <a
          className="text-primary text-sm font-medium hover:underline"
          href="#"
        >
          Complaints
        </a>
        <span className="text-slate-400 text-sm font-medium">/</span>
        <span className="text-slate-400 text-sm font-medium">
          Financial Fraud
        </span>
        <span className="text-slate-400 text-sm font-medium">/</span>
        <span className="text-slate-900 dark:text-white text-sm font-bold">
          #CMP-8821
        </span>
      </nav>
      {/* <!-- Page Heading --> */}
      <div className="flex flex-wrap justify-between items-start gap-3 p-4 mb-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">
              Complaint #CMP-8821
            </h1>
            <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              In Progress
            </span>
            <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold uppercase tracking-wider">
              High Priority
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-base font-normal">
            Submitted on Oct 24, 2023 |{" "}
            <span className="font-semibold">Anonymous Reporter</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold shadow-sm">
            <Download className="mr-2" size={24} />
            Export Case PDF
          </button>
          <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-sm">
            <CheckCircle className="mr-2" size={24} />
            Mark as Resolved
          </button>
        </div>
      </div>
      {/* <!-- Main Grid Layout --> */}
      <div className="grid grid-cols-12 gap-4 px-4">
        {/* <!-- Left & Middle Content (8 cols) --> */}
        <div className="col-span-full md:col-span-8 flex flex-col gap-8">
          {/* <!-- Tabs --> */}
          <div className="border-b border-slate-200 dark:border-slate-800">
            <div className="flex gap-8">
              <a
                className="flex items-center border-b-2 border-primary text-primary pb-3 pt-2 font-bold text-sm"
                href="#"
              >
                <FileText className="mr-2 " size={24} /> Overview
              </a>
              <a
                className="flex items-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-2 font-medium text-sm hover:text-slate-700"
                href="#"
              >
                <Paperclip className="mr-2" size={24} />
                Evidence (4)
              </a>
              <a
                className="flex items-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-2 font-medium text-sm hover:text-slate-700"
                href="#"
              >
                <History className="mr-2" size={24} />
                Audit Log
              </a>
            </div>
          </div>
          {/* <!-- Complaint Details Card --> */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-6">
              <h2 className="text-slate-900 dark:text-white text-xl font-bold mb-4">
                Case Narrative
              </h2>
              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
                <p>
                  I am reporting a potential case of financial misconduct within
                  the procurement department. Over the last three months, I have
                  observed several high-value contracts being awarded to 'Apex
                  Solutions' without a proper bidding process.
                </p>
                <p>
                  According to our internal compliance guidelines, any contract
                  over $50,000 must undergo a three-vendor review. The recent
                  projects #APX-001 and #APX-004 were signed off directly by the
                  department head without external consultation. I believe there
                  may be a personal relationship between the vendor and the
                  decision-maker.
                </p>
              </div>
              <h3 className="text-slate-900 dark:text-white font-bold mt-8 mb-4">
                Evidence &amp; Attachments
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="flex flex-col sm:flex-row items-center p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <File className=" text-primary mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Contract_APX_001.pdf
                    </p>
                    <p className="text-xs text-slate-500">
                      2.4 MB • Oct 24, 2023
                    </p>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-primary">
                    <Download />
                  </button>
                </div>
                <div className="flex items-center p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <Image className=" text-primary mr-3" />

                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      email_screenshot_1.jpg
                    </p>
                    <p className="text-xs text-slate-500">
                      1.1 MB • Oct 24, 2023
                    </p>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-primary">
                    <Download />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Secure Messaging Section --> */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageSquareLock className="text-primary mr-2" />
                <h2 className="text-slate-900 dark:text-white font-bold">
                  Secure Communication with Whistleblower
                </h2>
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded">
                End-to-End Encrypted
              </span>
            </div>
            <div className="p-6 h-80 overflow-y-auto space-y-6 bg-slate-50/30 dark:bg-slate-900/50">
              {/* <!-- Message 1 --> */}
              <div className="flex flex-col items-start max-w-[80%]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-500">
                    Whistleblower
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase">
                    Oct 24, 14:20
                  </span>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl rounded-tl-none border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 shadow-sm">
                  Hello, I've uploaded the documents. Is there anything else you
                  need to verify this claim?
                </div>
              </div>
              {/* <!-- Message 2 (Admin) --> */}
              <div className="flex flex-col items-end ml-auto max-w-[80%]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] text-slate-400 uppercase">
                    Oct 25, 09:15
                  </span>
                  <span className="text-xs font-bold text-primary">
                    Administrator (Me)
                  </span>
                </div>
                <div className="bg-primary text-white p-4 rounded-xl rounded-tr-none shadow-md text-sm">
                  Thank you for your submission. We have received the files and
                  assigned an investigator. Can you clarify if you know who
                  authorized the final payment on project #APX-004?
                </div>
              </div>
              {/* <!-- Message 3 --> */}
              <div className="flex flex-col items-start max-w-[80%]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-500">
                    Whistleblower
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase">
                    Oct 25, 11:45
                  </span>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl rounded-tl-none border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 shadow-sm">
                  I believe it was the Deputy Director, but I don't have the
                  signed document for that specific project yet.
                </div>
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
              <div className="relative flex items-center">
                <input
                  className="w-full pl-4 pr-12 py-3 bg-slate-100 dark:bg-slate-800 border-none rounded-lg focus:ring-1 focus:ring-primary text-sm"
                  placeholder="Type a secure message to the anonymous reporter..."
                  type="text"
                />
                <button className="absolute right-2 text-primary hover:text-primary/80 transition-colors">
                  <SendHorizontal />
                </button>
              </div>
              <p className="mt-2 text-[10px] text-slate-400 text-center italic">
                Your identity is hidden from the whistleblower. They only see
                "Case Manager".
              </p>
            </div>
          </div>
        </div>
        {/* <!-- Right Sidebar (4 cols) --> */}
        <aside className="col-span-full md:col-span-4 flex flex-col gap-6">
          {/* <!-- Case Management Card --> */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-slate-900 dark:text-white font-bold flex items-center gap-2">
                <UserCog className="text-primary mr-2" />
                Administrative Actions
              </h2>
            </div>
            <div className="p-6 space-y-6">
              {/* <!-- Status Selection --> */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Complaint Status
                </label>
                <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm focus:ring-primary focus:border-primary">
                  <option>Received</option>
                  <option selected={true}>Under Investigation</option>
                  <option>Awaiting Evidence</option>
                  <option>Resolved</option>
                  <option>Dismissed</option>
                </select>
              </div>
              {/* <!-- Investigator Assignment --> */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Assigned Investigator
                </label>
                <div className="relative">
                  <span className=" absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    <UserSearch />
                  </span>
                  <input
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-primary"
                    placeholder="Search staff..."
                    type="text"
                    value="Sarah Jenkins (Senior Compliance)"
                  />
                </div>
              </div>
              {/* <!-- Urgency --> */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Priority Level
                </label>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 px-3 text-xs font-bold rounded bg-slate-100 dark:bg-slate-800 text-slate-400">
                    Low
                  </button>
                  <button className="flex-1 py-2 px-3 text-xs font-bold rounded bg-slate-100 dark:bg-slate-800 text-slate-400">
                    Medium
                  </button>
                  <button className="flex-1 py-2 px-3 text-xs font-bold rounded bg-red-600 text-white">
                    High
                  </button>
                </div>
              </div>
              <hr className="border-slate-200 dark:border-slate-800" />
              {/* <!-- Internal Notes --> */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Internal Notes (Private)
                  </label>
                  <span className="text-[10px] text-amber-500 font-bold uppercase">
                    Only visible to Admins
                  </span>
                </div>
                <textarea
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm focus:ring-primary"
                  placeholder="Add confidential notes for other administrators..."
                  rows="4"
                ></textarea>
                <button className="w-full py-2 bg-primary text-white text-sm font-bold rounded-lg shadow-sm hover:bg-primary/90 transition-colors">
                  Save Internal Update
                </button>
              </div>
            </div>
          </div>
          {/* <!-- Timeline Section --> */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <h2 className="text-slate-900 dark:text-white font-bold flex items-center gap-2">
                <History className="text-primary" />
                Activity Timeline
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent">
                {/* <!-- Timeline Item 1 --> */}
                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary z-10 border-4 border-white dark:border-slate-900">
                      <CirclePlus />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        Case Created
                      </div>
                      <div className="text-xs text-slate-500">
                        Oct 24, 2023 - 10:15 AM
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- Timeline Item 2 --> */}
                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 z-10 border-4 border-white dark:border-slate-900">
                      <User />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        Assigned to Investigator
                      </div>
                      <div className="text-xs text-slate-500">
                        Oct 24, 2023 - 14:00 PM
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- Timeline Item 3 --> */}
                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 z-10 border-4 border-white dark:border-slate-900">
                      <MessageSquareText size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        New Message Sent
                      </div>
                      <div className="text-xs text-slate-500">
                        Today, 09:15 AM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default CaseDetailPage;
