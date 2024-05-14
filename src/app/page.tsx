"use client";

import { redirect } from "next/navigation";
import { useAppContext } from "~/context";

export default function Home() {
  const { authMode } = useAppContext();

  if (!authMode) {
    redirect("/signin");
  }

  return <div>homepage</div>;
}
