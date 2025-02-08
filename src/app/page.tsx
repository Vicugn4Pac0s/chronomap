
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import Body from "./components/Body";
import Provider from "./provider";
import { Button } from "./components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.post.get.prefetch();
  }

  return (
    <HydrateClient>
      <main className="">
        <Provider>
          <Body />
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
