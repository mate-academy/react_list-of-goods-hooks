import { SortFields, ReverseField, Goods } from './types';

export const getSortedGoods = (
  arrayOfGoods:Goods,
  sortValue: SortFields,
  reverseValue: ReverseField,
) => {
  const copyOfGoods = [...arrayOfGoods];

  if (sortValue) {
    copyOfGoods.sort((goodA, goodB) => {
      switch (sortValue) {
        case SortFields.SortByAphabet:
          return goodA.localeCompare(goodB);
        case SortFields.SortByLength:
          return goodA.length - goodB.length;
        default:
          return 0;
      }
    });
  }

  if (reverseValue === ReverseField.Reverse) {
    copyOfGoods.reverse();
  }

  return copyOfGoods;
};
