"use client";

import { useSession } from "next-auth/react";
import { useAppContext } from "~/context";

export default function Home() {
  const { authMode } = useAppContext();
  const { data } = useSession();

  return <div>Hello, {authMode === "guest" ? "Guest" : data?.user.name}</div>;
}
