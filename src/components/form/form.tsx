import { FormEventHandler } from "react";
import { toast } from "sonner";
import { ActionState } from "@/components/form";
import { useActionFeedback } from "./hooks/use-action-feedback";

type FormProps<T> = {
  actionState: ActionState<T>;
  children: React.ReactNode;
  onSuccess?: (actionState: ActionState<T>) => void;
  onError?: (actionState: ActionState<T>) => void;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  action?: (payload: FormData) => void;
};

const Form = <T,>({
  actionState,
  children,
  onSuccess,
  onError,
  onSubmit,
  action,
}: FormProps<T>) => {
  useActionFeedback({
    actionState,
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }

      onSuccess?.(actionState);
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }

      onError?.(actionState);
    },
  });

  return (
    <form action={action} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export { Form };
