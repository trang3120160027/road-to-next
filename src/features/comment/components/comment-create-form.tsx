"use client";

import { LucideSendHorizontal } from "lucide-react";
import { useActionState } from "react";
import { EMPTY_ACTION_STATE } from "@/components/form";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createComment } from "../actions/create-comment";
import { CommentWithMeta } from "../types";

type CommentCreateFormProps = {
  ticketId: string;
  onAddComment?: (comment: CommentWithMeta) => void;
};

const CommentCreateForm = ({ ticketId, onAddComment }: CommentCreateFormProps) => {
  const [actionState, formAction, pending] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form
      actionState={actionState}
      action={formAction}
      onSuccess={(state) => onAddComment?.(state.data as CommentWithMeta)}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="content">Add a comment</FieldLabel>
          <div className="flex gap-2">
            <Input
              id="content"
              name="content"
              disabled={pending}
              placeholder="Write your comment here..."
              autoComplete="off"
              className="flex-1"
            />
            <SubmitButton
              label="Send"
              icon={<LucideSendHorizontal />}
              pending={pending}
            />
          </div>
          {actionState.errors?.content && (
            <FieldError>{actionState.errors.content}</FieldError>
          )}
        </Field>
      </FieldGroup>
    </Form>
  );
};

export { CommentCreateForm };
