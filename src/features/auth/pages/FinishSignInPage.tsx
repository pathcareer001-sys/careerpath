import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isSignInWithEmailLink } from "firebase/auth";
import { toast } from "sonner";

import { auth } from "@/firebase/auth";
import { authService } from "../services/authService";
import { userService } from "@/features/users/services/userService";
import LoadingState from "@/components/shared/LoadingState";
import logo from "@/assets/images/logo.png";

export default function FinishSignInPage() {
  const navigate = useNavigate();
  const calledRef = useRef(false);
  const [error, setError] = useState<string | null>(() => {
    if (!isSignInWithEmailLink(auth, window.location.href)) {
      return "Invalid or expired sign-in link.";
    }
    if (!localStorage.getItem("emailForSignIn")) {
      return "Email not found. Please request a new sign-in link.";
    }
    return null;
  });

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    authService
      .signInWithEmailLink()
      .then(async (credential) => {
        const appUser = await userService.getUser(credential.user.uid);

        if (appUser?.role === "student") { navigate("/dashboard", { replace: true }); return; }
        if (appUser?.role === "company") { navigate("/company", { replace: true }); return; }
        if (appUser?.role === "admin") { navigate("/admin", { replace: true }); return; }
        if (appUser?.role === "staff") { navigate("/staff", { replace: true }); return; }

        navigate("/dashboard", { replace: true });
      })
      .catch(() => {
        setError("Failed to complete sign-in. Please request a new link.");
        toast.error("Sign-in failed");
      });
  }, [navigate]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <img src={logo} alt="CareerPath" className="h-10 mx-auto mb-6" />
          <p className="text-sm text-error mb-4">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="text-primary text-sm font-medium hover:text-primary transition-colors"
          >
            Back to sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingState />
    </div>
  );
}
