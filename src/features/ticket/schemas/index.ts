import { z } from "zod";

export const upsertTicketSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(1024, "Content must be at most 1024 characters"),
  deadline: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Deadline must be in YYYY-MM-DD format"),
  bounty: z.coerce.number().positive("Bounty must be a positive number"),
});

export type UpsertTicketInput = z.infer<typeof upsertTicketSchema>;
