"use client";

import { LucideLoader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getComments } from "../queries/get-comments";
import { CommentWithMeta } from "../types";
import { CommentCreateForm } from "./comment-create-form";
import { CommentDeleteButton } from "./comment-delete-button";
import { CommentItem } from "./comment-item";

type CommentsProps = {
  ticketId: string;
  paginatedComments: {
    list: CommentWithMeta[];
    metadata: {
      hasNextPage: boolean;
      nextCursor: string | null;
    };
  };
};

const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const [comments, setComments] = useState(paginatedComments.list);
  const [metadata, setMetadata] = useState(paginatedComments.metadata);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = async () => {
    if (!metadata.hasNextPage) return;
    setLoading(true);

    const morePaginatedComments = await getComments(
      ticketId,
      metadata.nextCursor ?? undefined,
    );
    const moreComments = morePaginatedComments.list;

    setComments([...comments, ...moreComments]);
    setMetadata(morePaginatedComments.metadata);
    setLoading(false);
  };

  const handleDeleteComment = (commentId: string) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId),
    );
  };

  const handleAddComment = (newComment: CommentWithMeta) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Comments</h2>
      <CommentCreateForm ticketId={ticketId} onAddComment={handleAddComment} />
      <div className="flex flex-col gap-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              buttons={[
                ...(comment.isOwner
                  ? [
                      <CommentDeleteButton
                        key="delete"
                        id={comment.id}
                        onDeleteComment={handleDeleteComment}
                      />,
                    ]
                  : []),
              ]}
            />
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No comments yet</p>
        )}
      </div>
      <Button
        variant="ghost"
        disabled={!metadata.hasNextPage || loading}
        onClick={handleLoadMore}
      >
        {metadata.hasNextPage ? (
          loading ? (
            <LucideLoader2 className="animate-spin" />
          ) : (
            "Load more"
          )
        ) : null}
      </Button>
    </div>
  );
};

export { Comments };
