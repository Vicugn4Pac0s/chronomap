"use client";

import { useState } from "react";
import { useMap } from "react-map-gl";
import { postCreateSchema } from "~/shared/schemas";

import { api } from "~/trpc/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDrawerStore } from "../stores/drawerStore";
import { useFormStore } from "../stores/formStore";

interface PostFormProps {
  onComplete?: () => void;
}

const PostForm = ({onComplete}: PostFormProps) => {

  const utils = api.useUtils();
  const map = useMap();
  const close = useDrawerStore(state => state.close);
  const {form, setForm,　resetForm} = useFormStore()
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      resetForm();
      close();
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
            const result = postCreateSchema.parse({ name: form.name, latitude: lnglat?.lat, longitude: lnglat?.lng });
            createPost.mutate(result);
          } catch (err) {
            if (err instanceof Error) {
              alert('エラーがあります');
            }
          }
        }}
        className="flex flex-col gap-2"
      >
        <Input type="text" value={form.name} placeholder="Title" onChange={(e) => setForm({
          name: e.target.value
        })} />
        <Button type="submit" disabled={createPost.isPending}>
          {createPost.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default PostForm;