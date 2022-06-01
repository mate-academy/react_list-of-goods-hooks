import React from 'react';
import { SortType } from '../types/SortType';

type Props = {
  goods: string[],
  isReverse: boolean,
  SortBy: SortType,
  lengthMin: number
};

const GoodsList: React.FC<Props> = ({
  goods, isReverse, SortBy, lengthMin,
}) => {
  const copyOfGoods = goods.filter(good => good.length >= lengthMin);

  switch (SortBy) {
    case SortType.Alfabet:
      copyOfGoods.sort((g1, g2) => g1.localeCompare(g2));
      break;
    case SortType.Length:
      copyOfGoods.sort((g1, g2) => g1.length - g2.length);
      break;
    default:
      break;
  }

  if (isReverse) {
    copyOfGoods.reverse();
  }

  return (
    <ul>
      {copyOfGoods.map(good => (
        <li key={good}>
          {good}
        </li>
      ))}
    </ul>
  );
};

export default React.memo(GoodsList);
