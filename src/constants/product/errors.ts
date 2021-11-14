import { Product } from "types/product";
import { ValidationError } from "types/registry/error";

export const errors: ValidationError<Product>[] = [
  {
    invalid: item => !item.name,
    name: 'name',
    text: 'Поле должно быть заполнено',
  },
]