"use client";

import React from "react";
import { Navbar } from "~/components";
import { Providers } from "./Providers";
import { Box } from "@mui/material";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Providers>
      <Navbar />
      {children}
      <Box id="spacer" sx={{ height: "18px", width: 1 }} />
    </Providers>
  );
};

export { MainLayout };
