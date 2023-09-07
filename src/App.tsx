import React, { useState } from 'react';
import cn from 'classnames';
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

enum SortBy {
  Alphabetically = 'alphabetically',
  Length = 'length',
  Default = '',
}

function getPreparedGoods(
  goods: string[],
  sortType: SortBy,
  isReversed: boolean,
) {
  const preparedGoods: string[] = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortBy.Alphabetically:
          return good1.localeCompare(good2);

        case SortBy.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return isReversed
    ? preparedGoods.reverse()
    : preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortBy.Default);
  const [isReversed, setIsReversed] = useState(false);
  const isReverseButtonActive = (sortType || isReversed);

  const sortedGoods = getPreparedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  const handleButtonReset = () => {
    setSortType(SortBy.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortType !== SortBy.Alphabetically },
          )}
          onClick={() => setSortType(SortBy.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortType !== SortBy.Length },
          )}
          onClick={() => setSortType(SortBy.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isReverseButtonActive && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleButtonReset}
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
