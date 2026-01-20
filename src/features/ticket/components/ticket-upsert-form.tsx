"use client";

import { LucideLoaderCircle } from "lucide-react";
import { useActionState } from "react";
import { EMPTY_ACTION_STATE } from "@/components/form";
import { Form } from "@/components/form/form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Ticket } from "@/generated/prisma/client";
import { upsertTicket } from "../actions/upsert-ticket";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action, pending] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            id="title"
            name="title"
            defaultValue={actionState.values?.title ?? ticket?.title}
            disabled={pending}
            placeholder="Enter the title of the ticket"
            autoComplete="off"
          />
          {/* <FieldDescription>Enter the title of the ticket</FieldDescription> */}
          {actionState.errors?.title && (
            <FieldError>{actionState.errors.title[0]}</FieldError>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="content">Content</FieldLabel>
          {/* <InputGroupTextarea id="content" name="content" defaultValue={""} placeholder="Enter the content of the ticket" /> */}
          <Textarea
            id="content"
            name="content"
            defaultValue={actionState.values?.content ?? ticket?.content}
            disabled={pending}
            placeholder="Enter the content of the ticket"
            autoComplete="off"
          />
          {/* <FieldDescription>Enter the content of the ticket</FieldDescription> */}
          {actionState.errors?.content && (
            <FieldError>{actionState.errors.content[0]}</FieldError>
          )}
        </Field>
        <Field>
          <Button type="submit" disabled={pending}>
            {pending && (
              <LucideLoaderCircle className="animate-spin mr-2 h-4 w-4" />
            )}
            {ticket ? "Update Ticket" : "Create Ticket"}
          </Button>
        </Field>
      </FieldGroup>
    </Form>
  );
};

export { TicketUpsertForm };
