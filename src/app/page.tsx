import Link from "next/link";

import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import MapWrapper from "./components/MapWrapper";
import Provider from "./provider";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.post.get.prefetch();
  }

  return (
    <HydrateClient>
      <main className="">
        <Provider>
          <MapWrapper />
        </Provider>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </main>
    </HydrateClient>
  );
}
