import KindsOfSort from '../constances';

export interface ISortGoods {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<KindsOfSort>>;
  setReversed: React.Dispatch<React.SetStateAction<boolean>>;
  setGoods: React.Dispatch<React.SetStateAction<string[]>>;
  originalGoods: string[];
  reversed: boolean;
}
