import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main>
      <div>
        <p>{session && <span>Logged in as {session.user.name}</span>}</p>
        <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </main>
  );
}
