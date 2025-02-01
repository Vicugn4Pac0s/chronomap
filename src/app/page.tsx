import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import MapBox from "./components/MapBox";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="">
        <div className="relative h-[50vh]">
          <MapBox options={{
              latitude: 35.6895,
              longitude: 139.6917,
              zoom: 11,
              bearing: 0,
              pitch: 0,
              padding: { top: 0, bottom: 0, left: 0, right: 0 },
            }}>
          </MapBox>
        </div>
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
