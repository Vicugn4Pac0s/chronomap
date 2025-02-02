"use client";

import { useState } from "react";
import { useMap } from "react-map-gl";
import { postCreateSchema } from "~/shared/schemas";

import { api } from "~/trpc/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
    <div className="w-full max-w-xs mx-auto">
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
        <Input type="text" value={name} placeholder="Title" onChange={(e) => setName(e.target.value)} />
        <Button type="submit" disabled={createPost.isPending}>
          {createPost.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default PostForm;