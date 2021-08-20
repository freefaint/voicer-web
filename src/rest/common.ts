// Rest
import { get, post, patch, put, del } from '.';

export class Service<T extends { _id?: string }> {
  constructor(private name: string) {}

  getItem(id: string) {
    return get(`/${this.name}/${id}`);
  }

  getItems(): Promise<T[]> {
    return get(`/${this.name}`);
  }

  findItems(data: Partial<T>): Promise<T[]> {
    return post(`/${this.name}/find`, data);
  }

  addItem(data: T) {
    return post(`/${this.name}`, data);
  }

  putItems(data: T[]) {
    return put(`/${this.name}`, data);
  }

  patchItem(data: Partial<T>) {
    return patch(`/${this.name}/${data._id}`, data);
  }

  removeItem(id: string) {
    return del(`/${this.name}/${id}`);
  }

  clearItems(product: Partial<T>) {
    return post(`/${this.name}/remove`, product);
  }
}