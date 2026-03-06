"use client";

import { LucideLoader2 } from "lucide-react";
import {
  cloneElement,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { ActionState, EMPTY_ACTION_STATE, useActionFeedback } from "./form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

type UseConfirmDialogProps = {
  title: string;
  description: string;
  action: () => Promise<ActionState<unknown>>;
  trigger: React.ReactElement;
  onSuccess?: () => void;
};

const useConfirmDialog = ({
  title,
  description,
  action,
  trigger,
  onSuccess,
}: UseConfirmDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [actionState, formAction, pending] = useActionState(
    action,
    EMPTY_ACTION_STATE,
  );

  const loadingToastId = useRef<string | number | undefined>(undefined);

  useEffect(() => {
    if (pending) {
      loadingToastId.current = toast.loading("Deleting...");
    } else if (loadingToastId.current) {
      toast.dismiss(loadingToastId.current);
    }

    return () => {
      if (loadingToastId.current) {
        toast.dismiss(loadingToastId.current);
      }
    };
  }, [pending]);

  useActionFeedback({
    actionState,
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }

      onSuccess?.();
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }
    },
  });

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => setIsOpen((state) => !state),
  } as React.HTMLAttributes<HTMLElement>);

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <form action={formAction}>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              type="submit"
              disabled={pending}
            >
              {pending && (
                <div className="absolute flex items-center justify-center">
                  <LucideLoader2 className="animate-spin h-4 w-4" />
                </div>
              )}

              <span className={pending ? "opacity-0" : ""}>Confirm</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog];
};

export { useConfirmDialog };
