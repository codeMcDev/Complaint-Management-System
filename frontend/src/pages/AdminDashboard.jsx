import {
  Calendar,
  CheckCircle,
  ClipboardClock,
  Download,
  Filter,
  Hourglass,
  Plus,
  Search,
  SquareSigma,
  TrendingDown,
  TrendingUp,
  UserRoundCheck,
} from "lucide-react";
import DashboardCard from "../components/DashboardCard";
import ToolbarButton from "../components/ToolbarButton";
import { useComplaintStore } from "../stores/useComplaintStore";
import { useEffect } from "react";
import DataTableRow from "../components/DataTableRow";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import AdminLayout from "../components/AdminLayout";

const AdminDashboard = () => {
  const { complaints, getAllComplaints } = useComplaintStore();

  useEffect(() => {
    getAllComplaints();
  }, []);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 7;
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = complaints.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(complaints.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % complaints.length;
    setItemOffset(newOffset);
  };

  return (
    <AdminLayout>
      {/* <!-- Page Heading --> */}
      <div className="flex flex-wrap justify-between items-end gap-3 mb-8">
        <div className="flex min-w-72 flex-col gap-1">
          <p className="text-[#0d141b] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
            Complaint Overview
          </p>
          <p className="text-[#4c739a] dark:text-slate-400 text-base font-normal leading-normal">
            System-wide monitoring of feedback and ethical reports.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Download />
            Export PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold shadow-sm hover:bg-blue-700 transition-colors">
            <Plus />
            Manual Entry
          </button>
        </div>
      </div>
      {/* <!-- Stats Grid --> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard
          props={{
            title: "total complaints",
            value: `${complaints.length}`,
            trendIcon: <TrendingUp />,
            trendValue: "+12%",
            trendDirection: "up",
            icon: <SquareSigma />,
          }}
        />
        <DashboardCard
          props={{
            title: "pending review",
            value: `${complaints.filter((complaint) => complaint.status === "PENDING_REVIEW").length}`,
            trendIcon: <TrendingUp />,
            trendValue: "+5%",
            trendDirection: "up",
            icon: <ClipboardClock />,
          }}
        />
        <DashboardCard
          props={{
            title: "in progress",
            value: `${complaints.filter((complaint) => complaint.status === "IN_PROGRESS").length}`,
            trendIcon: <TrendingDown />,
            trendValue: "-2%",
            trendDirection: "down",
            icon: <Hourglass />,
          }}
        />
        <DashboardCard
          props={{
            title: "resolved",
            value: `${complaints.filter((complaint) => complaint.status === "RESOLVED" || complaint.status === "CLOSED" || complaint.status === "REJECTED").length}`,
            trendIcon: <TrendingUp />,
            trendValue: "+5%",
            icon: <CheckCircle />,
          }}
        />
      </div>
      {/* <!-- Registry Section --> */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-[#0d141b] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">
            Complaint Registry
          </h2>
        </div>
        {/* <!-- ToolBar --> */}
        <div className="flex flex-wrap justify-between items-center gap-4 px-6 py-4 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-4">
            <div className="flex border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              <ToolbarButton icon={<Filter />} />
              <ToolbarButton icon={<Calendar />} />
              <ToolbarButton icon={<Download />} />
            </div>
          </div>
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                <Search />
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all"
                placeholder="Search by ID, Category or Status..."
                type="text"
              />
            </div>
          </div>
        </div>
        {/* <!-- Table --> */}
        <div className="overflow-x-auto">
          <DataTableRow complaints={currentItems} />
        </div>
        {/* <!-- Pagination --> */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            previousLabel="Previous"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            containerClassName="flex items-center gap-2 text-sm font-semibold"
            pageClassName="list-none"
            pageLinkClassName="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            activeClassName=""
            activeLinkClassName="bg-primary text-white shadow-sm hover:bg-primary"
            previousClassName="list-none"
            nextClassName="list-none"
            previousLinkClassName="flex h-10 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 px-4 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            nextLinkClassName="flex h-10 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 px-4 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            breakClassName="list-none"
            breakLinkClassName="flex h-10 w-10 items-center justify-center text-slate-400"
            disabledClassName="opacity-50 pointer-events-none"
          />
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Showing {itemOffset + 1} to{" "}
            {endOffset > complaints.length ? complaints.length : endOffset} of{" "}
            {complaints.length} results
          </span>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
