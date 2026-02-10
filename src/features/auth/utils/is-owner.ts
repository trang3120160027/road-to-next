import { User } from "better-auth";

type Entity = { userId: string | null };

const isOwner = (
  user: User | null | undefined,
  entity: Entity | null | undefined,
) => {
  if (!user || !entity) {
    return false;
  }

  if (!entity.userId) {
    return false;
  }

  if (entity.userId !== user.id) {
    return false;
  }

  return true;
};

export { isOwner };
