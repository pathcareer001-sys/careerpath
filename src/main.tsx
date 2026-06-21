import React from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "@/providers/AuthProvider";

import { RouterProvider } from "react-router-dom";

import { router } from "@/routes";

import QueryProvider from "@/providers/QueryProvider";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <RouterProvider router={router} />
        </TooltipProvider>
      </AuthProvider>
    </QueryProvider>
  </React.StrictMode>,
);
