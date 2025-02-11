
import { HydrateClient } from "~/trpc/server";
import Body from "./components/Body";
import Provider from "./provider";

export default async function Home() {

  return (
    <HydrateClient>
      <main className="">
        <Provider>
          <Body />
        </Provider>
      </main>
    </HydrateClient>
  );
}
