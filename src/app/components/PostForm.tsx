"use client";

import { LngLat } from "mapbox-gl";
import { useState } from "react";
import { postCreateSchema } from "~/shared/schemas";

import { api } from "~/trpc/react";

export function PostForm({ lnglat }: { lnglat: LngLat | null }) {

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
    },
  });

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={(e) => {
          try {
            e.preventDefault();
            const result = postCreateSchema.parse({ name, latitude: lnglat?.lat, longitude: lnglat?.lng });
            createPost.mutate(result);
          } catch (err) {
            if (err instanceof Error) {
              alert('エラーがあります');
            }
          }
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />

        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
