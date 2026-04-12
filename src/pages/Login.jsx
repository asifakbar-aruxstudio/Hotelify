import { useState } from "react";

const MailIcon = ({ active }) => (
  <svg width="16" height="13" viewBox="0 0 16 11" fill="none">
    <path
      fillRule="evenodd" clipRule="evenodd"
      d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
      fill={active ? "#6366F1" : "#9CA3AF"}
    />
  </svg>
);

const LockIcon = ({ active }) => (
  <svg width="13" height="17" viewBox="0 0 13 17" fill="none">
    <path
      d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
      fill={active ? "#6366F1" : "#9CA3AF"}
    />
  </svg>
);

const EyeIcon = ({ open }) =>
  open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState("");

  const fieldClass = (name) =>
    `flex items-center gap-2.5 h-12 rounded-full border px-5 bg-white transition-colors duration-200 ${
      focused === name ? "border-indigo-500" : "border-gray-300/70"
    }`;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl px-9 py-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-11 h-11 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="text-2xl font-medium text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1.5">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Email */}
          <div className={fieldClass("email")}>
            <MailIcon active={focused === "email"} />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused("")}
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
              required
            />
          </div>

          {/* Password */}
          <div className={fieldClass("password")}>
            <LockIcon active={focused === "password"} />
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused("")}
              className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="cursor-pointer flex items-center"
            >
              <EyeIcon open={showPass} />
            </button>
          </div>

          {/* Forgot password */}
          <div className="text-right pt-0.5">
            <Link to="/forgot-password" className="text-sm text-indigo-500 hover:text-indigo-600 transition-colors">
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-11 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-colors duration-200"
          >
            Sign in
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-500 hover:text-indigo-600 font-medium transition-colors">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}