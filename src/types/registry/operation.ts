import React, { FC } from "react";
import { ValidationError } from "./error";

export interface Operation<T> {
  label: string;
  title: (items: T[]) => string;
  groupTitle?: (items: T[]) => string;
  icon: (disabled: boolean, pending?: boolean) => React.ReactNode;
  pending?: (items: T[]) => void;

  // Либо группа, либо сервис
  group?: Operation<T>[];
  service?: (item: T, data?: Record<string, any>) => Promise<void>;

  visible?: (items: T[], mass?: boolean) => boolean;
  active?: (items: T[], mass?: boolean) => boolean;

  confirm?: Dialog<T>;

  blockers?: {
    block: (data: T[]) => boolean;
    error: Dialog<T>;
  }[];

  notification?: {
    title: (items: T[]) => string;
    text: (items: T[]) => string;
  }

  error?: Dialog<T>;
  ready?: Dialog<T>;

  // Условие, при котором элемент будет пропущен и вызвано окно, сообщающее о том, что операция будет выполнена не для всех элементов
  skip?: {
    condition: (item: T) => boolean;
    dialog: Dialog<T>;
  }
}

export interface Dialog<T> {
  title: (items: T[]) => string;
  severalTitle?: (items: T[]) => string;
  text?: (items: T[]) => React.ReactNode;
  severalText?: (items: T[]) => React.ReactNode;
  
  form?: {
    Component: FC<{ data: Record<string, any>, errors?: ValidationError<Record<string, any>>[], onChange: (data: Record<string, any>) => void }>;
    errors?: ValidationError<Record<string, any>>[];
  }

  confirmButtonText?: string;
  alert?: boolean;
}