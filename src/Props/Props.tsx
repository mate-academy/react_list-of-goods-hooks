export interface ButtonsProps {
  onAlphabetClick: () => void;
  onLengthClick: () => void;
  onReversedClick: () => void;
}
export interface ListOfGoodsProps {
  goods: string[];
}
export interface GetPreparedGoodsProps {
  sortByAlphabet: boolean;
  sortByLength: boolean;
  reversedList: boolean;
  goodsFromServer: string[];
}
export interface GoodsFromServerProps {
  goodsFromServer: string[];
}
