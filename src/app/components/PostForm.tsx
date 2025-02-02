"use client";

import { useState } from "react";
import { useMap } from "react-map-gl";
import { postCreateSchema } from "~/shared/schemas";

import { api } from "~/trpc/react";

interface PostFormProps {
  onComplete?: () => void;
}

const PostForm = ({onComplete}: PostFormProps) => {

  const utils = api.useUtils();
  const map = useMap();
  const [name, setName] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
      onComplete?.();
    },
  });

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={(e) => {
          try {
            e.preventDefault();
            const lnglat = map.default?.getCenter();
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

export default PostForm;