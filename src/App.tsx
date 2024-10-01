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
  DEFAULT = 'default',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

const preparedGoods = [...goodsFromServer];

const sortGoods = (order: SortType, isReversed: boolean): string[] => {
  let sortedGoods: string[];

  switch (order) {
    case SortType.ALPHABET:
      sortedGoods = [...preparedGoods].sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      sortedGoods = [...preparedGoods].sort((a, b) => a.length - b.length);
      break;
    default:
      sortedGoods = [...preparedGoods];
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(preparedGoods);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<SortType>(SortType.DEFAULT);

  const handleSort = (order: SortType) => {
    const sortedGoods = sortGoods(order, isReversed);

    setGoods(sortedGoods);
    setSortOrder(order);
  };

  const reverseGoods = () => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(prevState => !prevState);
  };

  const resetGoods = () => {
    setGoods(preparedGoods);
    setSortOrder(SortType.DEFAULT);
    setIsReversed(false);
  };

  const isResetVisible = sortOrder !== SortType.DEFAULT || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortOrder !== SortType.ALPHABET ? 'is-light' : ''}`}
          onClick={() => handleSort(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortOrder !== SortType.LENGTH ? 'is-light' : ''}`}
          onClick={() => handleSort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
