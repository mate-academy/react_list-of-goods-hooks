export interface Good {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  name: string;
  id:string;
}

export type State = {
  isListVisible: boolean;
  isReversed: boolean;
  sortBy: SortType
};

export enum SortType {
  length,
  alphabet,
  none,
}
