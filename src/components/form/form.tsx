import { toast } from "sonner";
import { ActionState } from "@/components/form";
import { useActionFeedback } from "./hooks/use-action-feedback";

type FormProps<T> = {
  actionState: ActionState<T>;
  action: (payload: FormData) => void;
  children: React.ReactNode;
};

const Form = <T,>({ actionState, action, children }: FormProps<T>) => {
  useActionFeedback({
    actionState,
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }
    },
  });

  return <form action={action}>{children}</form>;
};

export { Form };
