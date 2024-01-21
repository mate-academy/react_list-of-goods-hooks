export enum SortType {
  Length = 'length',
  Alphabet = 'alphabet',
  Default = '',
}

export type State = {
  isReverse: boolean;
  sortField: SortType;
  visibleGoods: string[];
};

export interface ListProps {
  visibleGoods: string[]
}

export interface SetStateFunction {
  (prevState: State | ((prevState: State) => State)): void;
}

export interface ButtonProps {
  state: State;
  setState: SetStateFunction;
  goodsFromServer: string[];
}
