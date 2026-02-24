"use client";

import { LucideLoader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  label: string;
  pending?: boolean;
  icon?: React.ReactElement;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
};

const SubmitButton = ({
  label,
  pending: externalPending,
  icon,
  variant = "default",
  className = "",
}: SubmitButtonProps) => {
  const { pending: formStatusPending } = useFormStatus();
  const pending = externalPending ?? formStatusPending;

  return (
    <Button
      type="submit"
      disabled={pending}
      variant={variant}
      className={className}
    >
      {pending && (
        <div className="absolute w-full flex items-center justify-center">
          <LucideLoader2 className="animate-spin h-4 w-4" />
        </div>
      )}

      <span
        className={`flex items-center gap-2 ${pending ? " opacity-0" : ""}`}
      >
        {icon}
        {label}
      </span>
    </Button>
  );
};

export { SubmitButton };
