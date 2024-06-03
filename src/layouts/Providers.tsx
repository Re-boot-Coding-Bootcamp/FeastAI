"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { AppContenxtProvider } from "~/context";
import theme from "~/theme";
import { SnackbarProvider } from "notistack";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <AppContenxtProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <CssBaseline />
            {children}
          </SnackbarProvider>
        </ThemeProvider>
      </AppContenxtProvider>
    </SessionProvider>
  );
};

export { Providers };
