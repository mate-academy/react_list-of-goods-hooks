import React from 'react';
import { getReorderedGoods, SortType } from '../../App';

type Props = {
  goodsFromServer: string[];
  sortType: SortType;
  isReversed: boolean;
}

export const List: React.FC<Props> = ({
  goodsFromServer,
  sortType,
  isReversed,
}) => {
  return (
    <ul>
        {getReorderedGoods(goodsFromServer, {
          sortType,
          isReversed,
        }).map((good, index) => {
          return (
            <li key={String(good + index)} data-cy="Good">{good}</li>
          );
        })}
    </ul>
  );
};
