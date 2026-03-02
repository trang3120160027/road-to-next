import { getComments } from "../queries/get-comments";
import { CommentCreateForm } from "./comment-create-form";
import { CommentItem } from "./comment-item";

type CommentsProps = {
  ticketId: string;
};

const Comments = async ({ ticketId }: CommentsProps) => {
  const comments = await getComments(ticketId);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Comments</h2>
      <CommentCreateForm comment={comments[0]} />
      <div className="flex flex-col gap-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No comments yet</p>
        )}
      </div>
    </div>
  );
};

export { Comments };
