import "~/styles/globals.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { TRPCReactProvider } from "~/trpc/react";
import { MainLayout } from "~/layouts";

export const metadata = {
  title: "Feast AI",
  description: "An AI-powered meal plan generator.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>
          <MainLayout>{children}</MainLayout>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
