import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import MapWrapper from "./components/MapWrapper";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.post.get.prefetch();
  }

  return (
    <HydrateClient>
      <main className="">
        <MapWrapper />
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>

        {session?.user && <LatestPost />}
      </main>
    </HydrateClient>
  );
}
