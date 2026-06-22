import { Link } from "react-router-dom";

import { useState } from "react";

import { FcGoogle } from "react-icons/fc";

import AppInput from "@/components/common/AppInput";
import AppButton from "@/components/common/AppButton";

import logo from "@/assets/images/logo.png";

export default function RegisterPage() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [university, setUniversity] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div
      className="
      w-full
      max-w-xl
      "
    >
      <div
        className="
        rounded-[32px]
        border
        bg-white
        p-8
        border-slate-100
        shadow-[0_20px_60px_rgba(15,23,42,0.08)]
        "
      >
        <img src={logo} alt="CareerPath" className="h-12 mb-6" />

        <h1
          className="
          text-4xl
          font-bold
          "
        >
          Create Account 🚀
        </h1>

        <p
          className="
          mt-2
          text-slate-500
          "
        >
          Join thousands of students finding internship opportunities.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <AppInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="rounded-xl
            h-12
            border-slate-200
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100"
          />

          <AppInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="rounded-xl
            h-12
            border-slate-200
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100"
          />

          <AppInput
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            placeholder="University"
            className="rounded-xl
            h-12
            border-slate-200
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100"
          />

          <AppInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="rounded-xl
            h-12
            border-slate-200
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100"
          />

          <AppInput
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="rounded-xl
            h-12
            border-slate-200
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100"
          />
        </div>

        <label
          className="
          mt-5
          flex
          items-center
          gap-2
          text-sm
          "
        >
          <input type="checkbox" />I agree to the Terms & Privacy Policy
        </label>

        <AppButton
          className="
          mt-6
          w-full
          "
        >
          Create Account
        </AppButton>

        <div
          className="
          my-6
          flex
          items-center
          gap-4
          "
        >
          <div className="h-px flex-1 bg-slate-200" />

          <span className="text-sm text-slate-400">or continue with</span>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <button
          className="
          w-full
          rounded-xl
          border
          border-slate-200
          py-3
          flex
          items-center
          justify-center
          gap-3
          hover:bg-slate-50
          transition-all
          duration-200
          "
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>
        <p
          className="
          mt-6
          text-center
          text-sm
          text-slate-500
          "
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="
            text-blue-600
            font-medium
            "
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
