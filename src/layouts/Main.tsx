"use client";

import React from "react";
import { Navbar } from "~/components";
import { Providers } from "./Providers";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Providers>
      <Navbar />
      {children}
    </Providers>
  );
};

export { MainLayout };
