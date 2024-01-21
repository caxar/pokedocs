export enum Status {
  Pending = "pending",
  Succeeded = "succeeded",
  Failed = "failed",
}

export type ProductsEntities = {
  id: number;
  name: string;
  types?: [];
};

export interface ProductSliceState {
  entities: ProductsEntities[];
  type: any;
  search: string;
  status: Status;
  currentPage: number;
}

export type fetchProductsType = {
  type: any;
};
