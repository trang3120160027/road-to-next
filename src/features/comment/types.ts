import { Prisma } from "@/generated/prisma/client";

export type CommentWithMeta = Prisma.CommentGetPayload<{
  include: { user: { select: { name: true } } };
}> & {
  isOwner: boolean;
};
