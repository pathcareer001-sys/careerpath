import { Link } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";

import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  return (
    <div
      className="
      w-full
      max-w-md
      "
    >
      <div
        className="
        rounded-[32px]
        border
        border-slate-200
        bg-white
        p-8
        shadow-xl
        "
      >
        <h1
          className="
          text-4xl
          font-bold
          "
        >
          Sign In
        </h1>

        <p
          className="
          mt-2
          text-slate-500
          "
        >
          Enter your account credentials
        </p>

        <div className="mt-8 space-y-4">
          <AppInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <AppInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <div
          className="
          mt-4
          flex
          justify-between
          text-sm
          "
        >
          <label className="flex gap-2">
            <input type="checkbox" />
            Remember me
          </label>

          <button className="text-blue-600">Forgot Password?</button>
        </div>

        <AppButton
          className="
          mt-6
          w-full
          "
        >
          Sign In
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
          Don't have an account?{" "}
          <Link
            to="/register"
            className="
            text-blue-600
            font-medium
            "
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
