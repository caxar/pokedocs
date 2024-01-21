export enum Status {
  Pending = "pending",
  Succeeded = "succeeded",
  Failed = "failed",
}

export type SearchiItems = {
  id: number;
  name: string;
  types?: [
    {
      type: {
        name: string;
      };
    }
  ];
};

export interface SearchItemSlice {
  items: SearchiItems[];
  searchStatus: Status;
  search: boolean;
}
