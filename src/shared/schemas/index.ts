import { z } from "zod";

export const postCreateSchema = z.object({
  name: z.string().min(1),
  latitude: z.number(),
  longitude: z.number(),
});

export type PostCreateInput = z.infer<typeof postCreateSchema>;
