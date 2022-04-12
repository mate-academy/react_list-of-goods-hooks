import React from 'react';
import './GoodsList.css';
import { Props } from '../types/type';

export const GoodList: React.FC<Props> = ({
  goods,
  isReversed,
  sorted,
  lengthSort,
  choosedLength,
}) => {
  const visibleGoods = goods.filter(good => good.length >= choosedLength);

  if (sorted) {
    visibleGoods.sort();
  }

  if (lengthSort) {
    visibleGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <>
      <h1
        className="title"
      >
        {visibleGoods.length}
        {' '}
        from
        {' '}
        {goods.length}
        {' '}
        Goods
      </h1>

      <ul
        className="goods-list"
      >
        {visibleGoods.map(good => (
          <li
            key={good}
            className="goods-list__item"
          >
            {good}
          </li>
        ))}
      </ul>
    </>
  );
};
