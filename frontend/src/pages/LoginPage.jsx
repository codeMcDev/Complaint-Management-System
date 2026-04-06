import {
  Eye,
  EyeClosed,
  Headset,
  Loader,
  Lock,
  LogIn,
  ShieldUser,
  User,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { loading, login } = useAuthStore();
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const res = await login(formData);

    if (!res) return;

    navigate("/admin-dashboard", { replace: true });
  };

  const handleFormDataChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <main className="flex-grow flex items-center justify-center py-14 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-4">
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-primary dark:text-white">
                Admin Access
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                Authorized personnel only. Please enter your credentials.
              </p>
            </div>
            <form onSubmit={handleOnSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                  for="username"
                >
                  Username or Email
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <User size={24} />
                  </span>
                  <input
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm"
                    id="email"
                    placeholder="your@corporate.email"
                    type="text"
                    onChange={handleFormDataChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                    for="password"
                  >
                    Password
                  </label>
                  <a
                    className="text-xs font-medium text-primary hover:underline"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock size={24} />
                  </span>
                  <input
                    className="w-full pl-10 pr-12 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm"
                    id="password"
                    placeholder="Enter your password"
                    type={passwordVisible ? "text" : "password"}
                    onChange={handleFormDataChange}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <EyeClosed /> : <Eye />}
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                  id="remember"
                  type="checkbox"
                />
                <label
                  className="ml-2 text-sm text-slate-600 dark:text-slate-400"
                  for="remember"
                >
                  Remember this device
                </label>
              </div>
              <button
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                type="submit"
              >
                <span>Sign In</span>
                {loading ? <Loader className="animate-spin" /> : <LogIn />}
              </button>
            </form>
            <div className="mt-2 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <ShieldUser size={16} />
                <span>Secure, encrypted connection</span>
              </div>
              <a
                className="flex items-center gap-1 text-xs font-medium text-slate-700 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors"
                href="#"
              >
                <Headset size={16} />
                Contact IT Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
