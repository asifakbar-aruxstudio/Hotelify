import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("customer");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (email && password) {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        
        let user = storedUsers.find(u => u.email === email);
        
        if (!user) {
          const newUser = {
            id: Date.now(),
            name: email.split('@')[0],
            email,
            phone: '',
            isHotelOwner: role === 'owner',
            createdAt: new Date().toISOString()
          };
          storedUsers.push(newUser);
          localStorage.setItem('users', JSON.stringify(storedUsers));
          
          if (role === 'owner') {
            setUser(newUser);
            toast.success('Welcome to your dashboard!');
            navigate('/owner/dashboard');
          } else {
            setUser(newUser);
            toast.success('Login successful!');
            navigate('/my-bookings');
          }
        } else {
          if (user.isHotelOwner) {
            setUser(user);
            navigate('/owner/dashboard');
          } else {
            setUser(user);
            navigate('/my-bookings');
          }
          toast.success('Login successful!');
        }
      } else {
        toast.error('Invalid credentials');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
                <HiOutlineLockClosed className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
              <p className="text-sm text-gray-500 mt-2">Sign in to continue to Hotelify</p>
            </div>

            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
              <button
                type="button"
                onClick={() => setRole("customer")}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                  role === "customer" 
                    ? "bg-white text-emerald-600 shadow-sm" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                I'm a Guest
              </button>
              <button
                type="button"
                onClick={() => setRole("owner")}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                  role === "owner" 
                    ? "bg-white text-emerald-600 shadow-sm" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Hotel Owner
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HiOutlineEnvelope className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HiOutlineLockClosed className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <HiOutlineEyeSlash className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500/20"
                  />
                  <span className="ml-2 text-sm text-gray-500">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/25"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-8">
              Don't have an account?{" "}
              <Link to="/signup" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
                Create account
              </Link>
            </p>
          </div>

          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
            <p className="text-xs text-center text-gray-400">
              By signing in, you agree to our{" "}
              <Link to="/terms" className="text-emerald-600 hover:underline">Terms</Link>
              {" "}and{" "}
              <Link to="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;