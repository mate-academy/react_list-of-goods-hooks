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
  SORT_ALPHABETICAL,
  SORT_LENGTH,
  DEFAULT,
}

const getSortedGoods = (goods: string[], sortType: SortType) => {
  switch (sortType) {
    case SortType.SORT_ALPHABETICAL:
      return [...goods].sort((a, b) => a.localeCompare(b));
    case SortType.SORT_LENGTH:
      return [...goods].sort((a, b) => a.length - b.length);
    default:
      return [...goods];
  }
};

export const App = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  let goods: string[] = getSortedGoods(goodsFromServer, sortType);

  if (isReversed) {
    goods = [...goods].reverse();
  }

  const isOriginalOrder = sortType === SortType.DEFAULT && !isReversed;

  const handleSort = (type: SortType) => {
    if (sortType === type && !isReversed) {
      return;
    }

    setSortType(type);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortType(SortType.DEFAULT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSort(SortType.SORT_ALPHABETICAL)}
          type="button"
          className={`button is-info${sortType === SortType.SORT_ALPHABETICAL ? '' : ' is-light'}`}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => handleSort(SortType.SORT_LENGTH)}
          type="button"
          className={`button is-success${sortType === SortType.SORT_LENGTH ? '' : ' is-light'}`}
        >
          Sort by length
        </button>
        <button
          onClick={handleReverse}
          type="button"
          className={`button is-warning${isReversed ? '' : ' is-light'}`}
        >
          Reverse
        </button>
        {!isOriginalOrder && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
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
