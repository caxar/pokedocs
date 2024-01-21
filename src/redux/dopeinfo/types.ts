export enum Status {
  Pending = "pending",
  Succeeded = "succeeded",
  Failed = "failed",
}

export type infoEntities = {
  name: string;
  id: number;
  evolution: [
    {
      name: string;
      id: number;
    }
  ];
  dopeInfo: {
    height: number;
    weight: number;
    id: number;
    abilities: [
      {
        is_hidden: boolean;
        ability: {
          name: string;
        };
      }
    ];
    name: string;
    stats: [
      {
        base_stat: number;
        stat: {
          name: string;
        };
      }
    ];
    types: [
      {
        type: {
          name: string;
        };
      }
    ];
  };
};

export interface infoSliceState {
  entities: infoEntities[];
  openInfo: boolean;
  status: Status;
}

export type infoType = {
  id: any;
};
