export type SortByType = {
  alphabet: string,
  length: string,
};

export type Options = {
  sort: string,
  reverse: boolean,
};

export type GoodsType = string[];

export type GetFuncType = (arg: GoodsType, { ...args }: Options) => GoodsType;
