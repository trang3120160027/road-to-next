import { z } from "zod";

export const upsertTicketSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(1024, "Content must be at most 1024 characters"),
});

export type UpsertTicketInput = z.infer<typeof upsertTicketSchema>;
