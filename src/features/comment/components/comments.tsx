"use client";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { LucideLoader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getComments } from "../queries/get-comments";
import { CommentWithMeta } from "../types";
import { CommentCreateForm } from "./comment-create-form";
import { CommentDeleteButton } from "./comment-delete-button";
import { CommentItem } from "./comment-item";

type PaginatedComments = Awaited<ReturnType<typeof getComments>>;

type CommentsProps = {
  ticketId: string;
  paginatedComments: PaginatedComments;
};

const getCommentsQueryKey = (ticketId: string) => ["comments", ticketId];

const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: getCommentsQueryKey(ticketId),
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.metadata.nextCursor ?? undefined,
      initialData: {
        pages: [paginatedComments],
        pageParams: [undefined],
      },
    });

  const comments = data.pages.flatMap((page) => page.list);

  const handleAddComment = (newComment: CommentWithMeta) => {
    queryClient.setQueryData(
      getCommentsQueryKey(ticketId),
      (old: { pages: PaginatedComments[]; pageParams: unknown[] }) => ({
        ...old,
        pages: old.pages.map((page, index) =>
          index === 0 ? { ...page, list: [newComment, ...page.list] } : page,
        ),
      }),
    );
  };

  const handleDeleteComment = (commentId: string) => {
    queryClient.setQueryData(
      getCommentsQueryKey(ticketId),
      (old: { pages: PaginatedComments[]; pageParams: unknown[] }) => ({
        ...old,
        pages: old.pages.map((page) => ({
          ...page,
          list: page.list.filter((c) => c.id !== commentId),
        })),
      }),
    );
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
      {hasNextPage && (
        <Button
          variant="ghost"
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? (
            <LucideLoader2 className="animate-spin" />
          ) : (
            "Load more"
          )}
        </Button>
      )}
    </div>
  );
};

export { Comments };
