import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import SubmitPage from "./pages/SubmitPage";
import { HelpCircle } from "lucide-react";
import { Toaster } from "react-hot-toast";
import CaseDetailPage from "./pages/CaseDetailPage";
import AdminNavBar from "./components/AdminNavBar";
import SuccessPage from "./pages/SuccessPage";
import StatusTrackerPage from "./pages/StatusTrackerPage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./stores/useAuthStore";
import AdminDashboard from "./pages/AdminDashboard";
import { useEffect } from "react";

function App() {
  const { user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      {!user && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/submit-complaint/anonymous"
          element={<SubmitPage isAnonymous={true} />}
        />
        <Route
          path="/submit-complaint/identified"
          element={<SubmitPage isAnonymous={false} />}
        />
        <Route
          path="/case-detail/:caseId"
          element={user ? <CaseDetailPage /> : <LoginPage />}
        />
        <Route path="/success-page/:newCaseId" element={<SuccessPage />} />
        <Route path="/check-status" element={<StatusTrackerPage />} />
        <Route
          path="/admin-dashboard"
          element={user ? <AdminDashboard /> : <LoginPage />}
        />
      </Routes>
      <Footer />
      <button className="fixed bottom-8 right-8 size-12 rounded-full bg-primary text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform z-50">
        <HelpCircle size={48} />
      </button>
      <Toaster />
    </div>
  );
}

export default App;
