"use client";

import React from "react";
import { Navbar } from "~/components";
import { Providers } from "./Providers";
import { useAppContext } from "~/context";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { authMode } = useAppContext();

  return (
    <Providers>
      {authMode ? (
        <>
          <Navbar />
          {children}
        </>
      ) : (
        children
      )}
    </Providers>
  );
};

export { MainLayout };
