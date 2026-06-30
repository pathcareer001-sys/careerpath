import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import AuthProvider from "@/providers/AuthProvider";

import { RouterProvider } from "react-router-dom";

import { router } from "@/routes";

import QueryProvider from "@/providers/QueryProvider";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

import "./index.css";

const helmetContext = {};

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
            <RouterProvider router={router} />
          </TooltipProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
