import React from "react";
import { Dialog } from "./operation";

export interface Texts<T> {
  registryTitle: string;
  
  getTitle: (item: T) => React.ReactNode;
  getCreateTitle: () => string;

  confirmRemove?: Dialog<T>;
  removeError?: Dialog<T>;

  saveNotification?: {
    title: (create: boolean) => string;
    text: (create: boolean) => string;
  }

  remove?: {
    title: string;
    groupTitle?: string;

    notification?: {
      title: (items: T[]) => string;
      text: (items: T[]) => string;
    }
  }
}