import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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

type SortOrder = 'alphabetical' | 'length';

const getSortedGoods = (
  goods: string[],
  order: SortOrder,
  isReversed: boolean,
): string[] => {
  const sortedGoods = [...goods];

  if (order === 'alphabetical') {
    sortedGoods.sort((a, b) => a.localeCompare(b));
  } else if (order === 'length') {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [order, setOrder] = useState<SortOrder>('alphabetical');
  const [isReversed, setIsReversed] = useState(false);
  const sortByAlphabetically = () => {
    setOrder('alphabetical');
  };

  const sortByLength = () => {
    setOrder('length');
  };

  const reverseGoods = () => {
    setIsReversed(!isReversed);
  };

  const resetGoods = () => {
    setOrder('alphabetical');
    setIsReversed(false);
  };

  const sortedGoods = getSortedGoods(goodsFromServer, order, isReversed);

  const isModified = isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${order === 'alphabetical' ? '' : 'is-light'}`}
          onClick={sortByAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${order === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {isModified && (
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
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
