"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { AppContenxtProvider } from "~/context";
import theme from "~/theme";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <AppContenxtProvider>
      <SessionProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </SessionProvider>
    </AppContenxtProvider>
  );
};

export { Providers };
