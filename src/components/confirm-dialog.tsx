"use client";

import { LucideLoader2 } from "lucide-react";
import { cloneElement, useActionState, useState } from "react";
import { ActionState, EMPTY_ACTION_STATE } from "./form";
import { Form } from "./form/form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

type UseConfirmDialogProps = {
  title: string;
  description: string;
  action: () => Promise<ActionState<unknown>>;
  trigger: React.ReactElement;
};

const useConfirmDialog = ({
  title,
  description,
  action,
  trigger,
}: UseConfirmDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [actionState, formAction, pending] = useActionState(
    action,
    EMPTY_ACTION_STATE,
  );

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

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Form
            action={formAction}
            actionState={actionState}
            onSuccess={() => setIsOpen(false)}
          >
            <Button variant="destructive" type="submit" disabled={pending}>
              {pending && (
                <div className="absolute flex items-center justify-center">
                  <LucideLoader2 className="animate-spin h-4 w-4" />
                </div>
              )}

              <span className={pending ? "opacity-0" : ""}>Confirm</span>
            </Button>
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog];
};

export { useConfirmDialog };
