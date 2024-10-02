"use client";

import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

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
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </React.Fragment>
  );
};

export default Layout;
