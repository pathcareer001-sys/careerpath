import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import AuthProvider from "@/providers/AuthProvider";

import { RouterProvider } from "react-router-dom";

import { router } from "@/routes";

import QueryProvider from "@/providers/QueryProvider";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

import { analytics } from "@/services/analytics";

import "./index.css";

const helmetContext = {};

analytics.init();

function PageTracker() {
  useEffect(() => {
    analytics.pageView(window.location.pathname + window.location.search);

    const unsubscribe = router.subscribe((state) => {
      analytics.pageView(state.location.pathname + state.location.search);
    });

    return unsubscribe;
  }, []);

  return null;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider context={helmetContext}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <QueryProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster richColors position="top-right" />
            <PageTracker />
            <RouterProvider router={router} />
          </TooltipProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
