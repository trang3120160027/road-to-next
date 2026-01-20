"use client";

import { useEffect, useRef } from "react";
import { ActionState } from "../utils/to-action-state";

type OnArgs<T> = {
  actionState: ActionState<T>;
};

type UseActionFeedbackProps<T> = {
  actionState: ActionState<T>;
  onSuccess?: (args: OnArgs<T>) => void;
  onError?: (args: OnArgs<T>) => void;
};

const useActionFeedback = <T>({
  actionState,
  onSuccess,
  onError,
}: UseActionFeedbackProps<T>) => {
  const prevTimestamp = useRef(actionState.timestamp);

  useEffect(() => {
    if (actionState.timestamp === prevTimestamp.current) return;

    prevTimestamp.current = actionState.timestamp;

    if (actionState.timestamp === 0) return;

    if (actionState.success) {
      onSuccess?.({ actionState });
    } else {
      onError?.({ actionState });
    }
  }, [actionState, onSuccess, onError]);
};

export { useActionFeedback };
