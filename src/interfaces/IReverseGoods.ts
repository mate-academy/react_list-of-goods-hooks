export interface IReverseGoods {
  goods: string[];
  reversed: boolean;
  setReversed: React.Dispatch<React.SetStateAction<boolean>>;
  setGoods: React.Dispatch<React.SetStateAction<string[]>>;
}
