import { Product } from "types/product";
import { RegistrySchema } from "types/registry/schema";

import * as service from 'rest/products';

import { blank } from './blank';
import { texts } from './texts';
import { columns } from './columns';
import { errors } from './errors';
import { operations } from './operations';
import { ProductTemplate } from "templates";

export const registrySchema: RegistrySchema<Product> = {
  columns,
  operations,

  service: {
    getItem: id => service.getItem(id.toString()),
    getItems: () => service.getItems().then(resp => ({ totalCount: resp.length, entities: resp })),
    saveItem: item => item._id ? service.addItem(item) : service.patchItem(item),
    removeItem: item => service.removeItem(item.toString()),
  },

  texts,
  blank,

  card: {
    Component: ProductTemplate,
  },
  
  errors,
}