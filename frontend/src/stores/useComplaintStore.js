import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance";
import toast from "react-hot-toast";

export const useComplaintStore = create((set, get) => ({
  loading: false,
  complaints: [],
  singleComplaint: null,
  newComplaintSuccess: false,
  lastComplaintCreated: null,
  trackedComplaint: null,

  //Create a new complaint.
  createNewComplaint: async (values) => {
    set({ loading: true });
    try {
      const fd = new FormData();

      fd.append("reportingMode", values.reportingMode);
      if (values.reportingMode === "identified") {
        fd.append("reporterName", values.reporterName);
        fd.append("reporterEmail", values.reporterEmail);
      }
      fd.append("category", values.category);
      fd.append("incidentDate", values.incidentDate);
      fd.append("title", values.title);
      fd.append("description", values.description);

      if (Array.isArray(values.evidence)) {
        values.evidence.forEach((file) => {
          fd.append("evidence", file);
        });
      }

      const res = await axiosInstance.post("/complaints/create-complaint", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const created = res.data?.complaint;

      set((state) => ({
        complaints: created
          ? [...state.complaints, res.data.complaint]
          : state.complaints,
        newComplaintSuccess: true,
        lastComplaintCreated: created || null,
      }));
      toast.success(res.data?.message || "Complaint created successfully");

      //To make use of the created complaint data in success-page
      return created;
    } catch (error) {
      console.log("An error occurred creating complaint", error.message);
      toast.error(
        error.response.data?.message || "An error occurred creating complaint",
      );
      return null;
    } finally {
      set({ loading: false });
    }
  },

  fetchCaseDetail: async (caseId) => {
    try {
      const response = await axiosInstance.get(`/complaints/${caseId}`);
      const foundCase = response.data;
      set({ singleComplaint: response.data });
      return foundCase;
    } catch (error) {
      console.log("An error occurred creating complaint", error.message);
      toast.error(error.response.data?.message);
    }
  },

  trackCaseStatus: async ({ caseId, accessKey }) => {
    try {
      const res = await axiosInstance.post("/complaints/case-status", {
        caseId,
        accessKey,
      });

      set({ trackedComplaint: res.data?.trackedComplaint || null });
    } catch (error) {
      console.log("An error occurred fetching case", error);
      toast.error(error.response.data?.message);
    }
  },

  getAllComplaints: async () => {
    try {
      const res = await axiosInstance.get("/complaints");

      set({ complaints: res.data || null });
    } catch (error) {
      console.log("An error occurred fetching complaints", error);
      toast.error(error.response.data?.message);
    }
  },

  resetTrackedComplaint: () => {
    set({ trackedComplaint: null });
  },
}));
