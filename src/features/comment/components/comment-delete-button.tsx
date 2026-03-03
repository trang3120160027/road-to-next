"use client";

import { LucideTrash2 } from "lucide-react";
import { useConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { deleteComment } from "../actions/delete-comment";

type CommentDeleteButtonProps = {
  id: string;
  onDeleteComment?: (commentId: string) => void;
};

const CommentDeleteButton = ({
  id,
  onDeleteComment,
}: CommentDeleteButtonProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    title: "Delete Comment",
    description:
      "Are you sure you want to delete this comment? This action cannot be undone.",
    action: deleteComment.bind(null, id),
    trigger: (
      <Button
        variant="outline"
        size="icon"
        className="text-destructive hover:text-destructive"
      >
        <LucideTrash2 className="h-4 w-4" />
        <span className="sr-only">Delete comment</span>
      </Button>
    ),
    onSuccess: () => onDeleteComment?.(id),
  });

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
};

export { CommentDeleteButton };
