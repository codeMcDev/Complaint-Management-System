import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  loading: false,
  user: null,
  checkingAuth: true,

  login: async ({ email, password }) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      set({ user: res.data?.user });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/auth/profile");

      set({ user: res.data.user, checkingAuth: false });
    } catch (error) {
      console.log(error);
      set({ checkingAuth: false, user: null });
    }
  },
}));
