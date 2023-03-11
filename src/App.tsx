import { FC, useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
import { GoodsList } from './components/GoodsList/GoodsList';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

interface ReorderOptions {
  sortType: SortType,
  isReversed: boolean,
}

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((current, next) => {
    switch (sortType) {
      case SortType.LENGTH:
        return current.length - next.length;

      case SortType.ALPHABET:
        return current.localeCompare(next);

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: FC = () => {
  const [isReversed, reverseList] = useState(false);
  const [sortType, sortList] = useState(SortType.NONE);

  const checkOrder = sortType !== SortType.NONE || isReversed;

  const reorderedGoods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  const reverseGoods = () => reverseList(!isReversed);
  const sortByAlphabet = () => sortList(SortType.ALPHABET);
  const sortByLength = () => sortList(SortType.LENGTH);
  const resetOrder = () => {
    sortList(SortType.NONE);
    reverseList(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {checkOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetOrder}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={reorderedGoods} />
    </div>
  );
};
