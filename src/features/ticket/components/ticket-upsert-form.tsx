"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { Ticket } from "@/generated/prisma/client";
import { fromCents } from "@/utils/currency";
import { upsertTicket } from "../actions/upsert-ticket";
import { UpsertTicketInput, upsertTicketSchema } from "../schemas";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, formAction, pending] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  );

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(upsertTicketSchema),
    defaultValues: {
      title: ticket?.title || "",
      content: ticket?.content || "",
      deadline: ticket?.deadline || "",
      bounty: ticket?.bounty ? fromCents(ticket.bounty) : "",
    },
  });

  // Sync server-side validation errors to react-hook-form
  useEffect(() => {
    if (actionState.errors) {
      Object.entries(actionState.errors).forEach(([key, messages]) => {
        setError(key as keyof UpsertTicketInput, {
          type: "server",
          message: messages[0],
        });
      });
    }
  }, [actionState.errors, setError]);

  // Reset form on successful submission
  useEffect(() => {
    if (actionState.success) {
      reset();
    }
  }, [actionState.success, reset]);

  const onSubmit = (data: UpsertTicketInput) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <Form actionState={actionState} onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            id="title"
            {...register("title")}
            disabled={pending}
            placeholder="Enter the title of the ticket"
            autoComplete="off"
          />
          {/* <FieldDescription>Enter the title of the ticket</FieldDescription> */}
          {errors.title && <FieldError>{errors.title.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel htmlFor="content">Content</FieldLabel>
          {/* <InputGroupTextarea id="content" name="content" defaultValue={""} placeholder="Enter the content of the ticket" /> */}
          <Textarea
            id="content"
            {...register("content")}
            disabled={pending}
            placeholder="Enter the content of the ticket"
            autoComplete="off"
          />
          {/* <FieldDescription>Enter the content of the ticket</FieldDescription> */}
          {errors.content && <FieldError>{errors.content.message}</FieldError>}
        </Field>

        <div className="flex w-full gap-2">
          <Field className="w-1/2">
            <FieldLabel htmlFor="deadline">Deadline</FieldLabel>
            <Input
              id="deadline"
              type="date"
              {...register("deadline")}
              disabled={pending}
              placeholder="Enter the deadline of the ticket"
              autoComplete="off"
            />
            {errors.deadline && (
              <FieldError>{errors.deadline.message}</FieldError>
            )}
          </Field>

          <Field className="w-1/2">
            <FieldLabel htmlFor="bounty">Bounty ($)</FieldLabel>
            <Input
              id="bounty"
              type="number"
              step=".01"
              min="0"
              {...register("bounty")}
              disabled={pending}
              placeholder="Enter the bounty of the ticket"
              autoComplete="off"
            />
            {errors.bounty && <FieldError>{errors.bounty.message}</FieldError>}
          </Field>
        </div>

        <Field>
          <SubmitButton
            label={ticket ? "Update Ticket" : "Create Ticket"}
            pending={pending}
          />
        </Field>
      </FieldGroup>
    </Form>
  );
};

export { TicketUpsertForm };
