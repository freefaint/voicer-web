export interface FieldError {
  name: string;
  text: string;
}

export interface ValidationError<T> extends FieldError {
  invalid: (item: T) => boolean;
}