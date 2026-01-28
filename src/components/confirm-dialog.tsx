import { cloneElement, useState } from "react";
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
  action: () => Promise<void>;
  trigger: React.ReactElement;
};

const useConfirmDialog = ({
  title,
  description,
  action,
  trigger,
}: UseConfirmDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
          <form action={action}>
            <AlertDialogAction variant="destructive" type="submit">
              Confirm
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog];
};

export { useConfirmDialog };
