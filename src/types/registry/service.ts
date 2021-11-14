export interface EntitiesRequest<T> {
  pageIndex: number;
  pageSize: number;
  sortingOrder?: 0 | 1 | 2;
  sortingField?:  keyof T;
  name?: string;
}

export interface EntitiesResponse<T> {
  entities: T[];
  totalCount: number;
}

export interface Service<T> {
  getItems: (filter: EntitiesRequest<T>) => Promise<EntitiesResponse<T>>;
  getItem: (id: string | number) => Promise<T>;
  saveItem: (item: T) => Promise<T>;
  removeItem: (id: string | number) => Promise<void>;
}