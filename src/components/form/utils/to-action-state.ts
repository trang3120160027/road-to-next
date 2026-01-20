import { ZodError } from "zod";

export type ActionState<T> = {
  values?: T;
  errors: null | Partial<Record<keyof T, string[]>>;
  message: string;
  success: boolean;
  timestamp: number;
};

export const EMPTY_ACTION_STATE = {
  message: "",
  success: false,
  timestamp: Date.now(),
  errors: null,
};

export const fromErrorToActionState = <T>(
  error: unknown,
  values?: T,
): ActionState<T> => {
  if (error instanceof ZodError) {
    return {
      message: "",
      values,
      errors: error.flatten().fieldErrors,
      success: false,
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    return {
      message: error.message,
      values,
      errors: null,
      success: false,
      timestamp: Date.now(),
    };
  } else {
    return {
      message: "An unknown error occurred.",
      values,
      errors: null,
      success: false,
      timestamp: Date.now(),
    };
  }
};

export const toActionState = <T>(
  success: boolean,
  message: string,
): ActionState<T> => {
  return {
    message,
    errors: null,
    success,
    timestamp: Date.now(),
  };
};
