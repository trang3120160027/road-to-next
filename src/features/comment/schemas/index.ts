import { z } from "zod";

export const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Content is required")
    .max(512, "Content must be at most 512 characters"),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
