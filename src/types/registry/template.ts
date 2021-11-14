import { FieldError } from "./error";

export interface Template<T> {
  item: T;
  creating?: boolean;
  editing: boolean;
  errors?: FieldError[];
  onChange: (item: T) => void;
}