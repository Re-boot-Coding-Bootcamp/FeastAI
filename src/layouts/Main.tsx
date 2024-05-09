"use client";

import React from "react";
import { Navbar } from "~/components";
import { SessionProvider } from "next-auth/react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SessionProvider>
      <Navbar />
      {children}
    </SessionProvider>
  );
};

export { MainLayout };
