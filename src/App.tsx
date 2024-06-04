import 'bulma/css/bulma.css';
import classNames from 'classnames';
import { useState } from 'react';
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

type SortType = 'alphabetically' | 'length' | null;

const sortGoods = (
  goods: string[],
  sortBy: SortType,
  isReversed: boolean,
): string[] => {
  const sortedGoods = [...goods];

  if (sortBy === 'alphabetically') {
    sortedGoods.sort();
  } else if (sortBy === 'length') {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [sortBy, setSortBy] = useState<SortType>(null);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const handleSortAlphabetically = () => {
    setSortBy('alphabetically');
  };

  const handleSortByLength = () => {
    setSortBy('length');
  };

  const handleReverseOrder = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortBy(null);
    setIsReversed(false);
  };
  const sortedGoods = sortGoods(goodsFromServer, sortBy, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortBy !== 'alphabetically',
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortBy !== 'length',
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverseOrder}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
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
