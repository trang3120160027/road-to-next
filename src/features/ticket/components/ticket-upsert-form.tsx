import Form from "next/form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
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
  //   const [formState, formAction, pending] = useActionState<
  //     Parameters<typeof createTicket>
  //   >(createTicket.bind(null), { values: { title: "" } });

  return (
    <Form action={upsertTicket.bind(null, ticket?.id)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            id="title"
            name="title"
            defaultValue={ticket?.title}
            placeholder="Enter the title of the ticket"
            autoComplete="off"
          />
          <FieldDescription>Enter the title of the ticket</FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="content">Content</FieldLabel>
          {/* <InputGroupTextarea id="content" name="content" defaultValue={""} placeholder="Enter the content of the ticket" /> */}
          <Textarea
            id="content"
            name="content"
            defaultValue={ticket?.content}
            placeholder="Enter the content of the ticket"
            autoComplete="off"
          />
          <FieldDescription>Enter the content of the ticket</FieldDescription>
        </Field>
        <Field>
          <Button type="submit">Update Ticket</Button>
        </Field>
      </FieldGroup>
    </Form>
  );
};

export { TicketUpsertForm };
