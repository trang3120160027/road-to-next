import { getSession } from "@/features/auth/queries/get-session";
import { isOwner } from "@/features/auth/utils/is-owner";
import { CommentWithMeta } from "../types";
import { CommentCreateForm } from "./comment-create-form";
import { CommentDeleteButton } from "./comment-delete-button";
import { CommentItem } from "./comment-item";

type CommentsProps = {
  ticketId: string;
  comments?: CommentWithMeta[];
};

const Comments = async ({ ticketId, comments = [] }: CommentsProps) => {
  const session = await getSession();

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Comments</h2>
      <CommentCreateForm ticketId={ticketId} />
      <div className="flex flex-col gap-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              buttons={[
                ...(isOwner(session?.user, comment)
                  ? [<CommentDeleteButton key="delete" id={comment.id} />]
                  : []),
              ]}
            />
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No comments yet</p>
        )}
      </div>
    </div>
  );
};

export { Comments };
