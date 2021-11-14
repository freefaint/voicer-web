import { createContext, FC, ReactNode } from "react";
import { ValidationError } from "types/registry/error";

export interface Notification {
  title: string;
  text?: ReactNode;

  form?: {
    Component: FC<{ data: Record<string, any>, errors?: ValidationError<Record<string, any>>[], onChange: (data: Record<string, any>) => void }>;
    errors?: ValidationError<Record<string, any>>[];
  }

  confirmButtonText?: string;
  alert?: boolean;
  large?: boolean;
  onConfirm?: (data?: Record<string, any>) => Promise<void>;
  onClose?: () => void;
}

interface NotificationContext {
  push: (item: Notification) => void;
}

export const notificationContext = createContext<NotificationContext | null>(null);