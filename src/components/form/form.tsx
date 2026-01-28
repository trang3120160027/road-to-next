import { toast } from "sonner";
import { ActionState } from "@/components/form";
import { useActionFeedback } from "./hooks/use-action-feedback";

type FormProps<T> = {
  actionState: ActionState<T>;
  action: (payload: FormData) => void;
  children: React.ReactNode;
  onSuccess?: (actionState: ActionState<T>) => void;
  onError?: (actionState: ActionState<T>) => void;
};

const Form = <T,>({
  actionState,
  action,
  children,
  onSuccess,
  onError,
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

  return <form action={action}>{children}</form>;
};

export { Form };
