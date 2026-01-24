import React, { useState } from 'react';
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
  sortType: SortType;
  isReversed: boolean;
};

const sortStrategies: Record<SortType, (data: string[]) => string[]> = {
  [SortType.NONE]: data => [...data],
  [SortType.ALPHABET]: data => [...data].sort((a, b) => a.localeCompare(b)),
  [SortType.LENGTH]: data => [...data].sort((a, b) => a.length - b.length),
};

// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const sorted = sortStrategies[sortType](goods);

  return isReversed ? [...sorted].reverse() : sorted;
}

// DON'T save goods to the state
// type State = {
//   isReversed: boolean,
//   sortType: SortType,
// };

export const App: React.FC = () => {
  const [order, setOrder] = useState({
    sortType: SortType.NONE,
    isReversed: false,
  });

  const reset = () => {
    setOrder({
      sortType: SortType.NONE,
      isReversed: false,
    });
  };

  const handleClickAlphabet = () => {
    setOrder(prev => ({
      ...prev,
      sortType: SortType.ALPHABET,
    }));
  };

  const handleClickLength = () => {
    setOrder(prev => ({
      ...prev,
      sortType: SortType.LENGTH,
    }));
  };

  const handleClickRevers = () => {
    setOrder(prev => ({
      ...prev,
      isReversed: !prev.isReversed,
    }));
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            order.sortType === SortType.ALPHABET
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={handleClickAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            order.sortType === SortType.LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={handleClickLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            order.isReversed === true
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={handleClickRevers}
        >
          Reverse
        </button>
        {!(order.sortType === SortType.NONE && order.isReversed === false) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {getReorderedGoods(goodsFromServer, order).map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
