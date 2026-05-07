import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

export enum SortType {
  Default = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

interface FilterOptions {
  sortBy: SortType;
  isReversed: boolean;
}

function getFilteredGoods(
  goods: string[],
  { sortBy, isReversed }: FilterOptions,
) {
  const visibleGoods = [...goods];

  if (sortBy === SortType.Alphabet) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortBy === SortType.Length) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = getFilteredGoods(goodsFromServer, { sortBy, isReversed });

  const isModified = sortBy !== '' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', {
            'is-light': sortBy !== 'alphabet',
          })}
          onClick={() => setSortBy(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortBy !== 'length',
          })}
          onClick={() => setSortBy(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setSortBy(SortType.Default);
            }}
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
