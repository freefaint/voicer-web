import { GridColDef } from "@material-ui/data-grid";
import { FC } from "react";
import { ValidationError } from "./error";
import { Operation } from "./operation";

import { Service } from "./service";
import { Template } from "./template";
import { Texts } from "./texts";

export interface RegistrySchema<T> {
  columns: GridColDef[];
  operations: Operation<T>[];
  service: Service<T>;
  texts: Texts<T>;
  blank: T;
  card: Card<T>;
  errors?: ValidationError<T>[];

  removable?: (item: T) => boolean;
  getTitle?: (item: T) => string;
}

export interface Card<T> {
  tabs?: Tab<T>[];

  status?: (item: T) => React.ReactNode;

  Component?: FC<Template<T>>;
}

export interface Tab<T> {
  name: string;
  label: string;

  hide?: (item: T) => boolean;

  errors?: string[];

  Component: FC<Template<T>>;
}