"use client";

import { LucideLoader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  label: string;
  pending?: boolean;
};

const SubmitButton = ({
  label,
  pending: externalPending,
}: SubmitButtonProps) => {
  const { pending: formStatusPending } = useFormStatus();
  const pending = externalPending ?? formStatusPending;

  return (
    <Button type="submit" disabled={pending}>
      {pending && (
        <div className="absolute flex items-center justify-center">
          <LucideLoader2 className="animate-spin h-4 w-4" />
        </div>
      )}

      <span className={pending ? "opacity-0" : ""}>{label}</span>
    </Button>
  );
};

export { SubmitButton };
