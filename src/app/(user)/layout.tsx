"use client";

import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const pathname = usePathname();
  const queryClient = new QueryClient();

  // Conditional checks for specific paths
  const isAuthPage = pathname === "/auth/signin" || pathname === "/auth/signup";
  const isLandingPage = pathname === "/landing/home";
  const isDashboardPage = pathname === "/dashboard";

  // Render based on pathname
  return (
    <React.Fragment>
      <GoogleOAuthProvider
        clientId={
          "406218299171-qopbpjivcrm1ppo9rqdqocu30s8bfh37.apps.googleusercontent.com"
        }
      >
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </React.Fragment>
  );
};

export default Layout;
