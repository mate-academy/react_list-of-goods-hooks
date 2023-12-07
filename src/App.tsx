import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  let visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods = [...visibleGoods].reverse();
  }

  if (sortType === SortType.NONE) {
    visibleGoods = [...visibleGoods];
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const sortByAlphabetically = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reverseOrder = () => {
    setIsReversed(!isReversed);
  };

  const resetSorting = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const goods = getReorderedGoods(
    goodsFromServer, { sortType, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortType === SortType.ALPHABET
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={sortByAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortType === SortType.LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed === true
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={reverseOrder}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSorting}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => {
          return (
            <li key={item} data-cy="Good">
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
