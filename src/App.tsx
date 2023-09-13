import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import classnames from 'classnames';

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

interface PreparedGoodsParams {
  sortType: SortType;
  isReversed: boolean;
}

enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
  Default = '',
}

function getPreparedGoods(
  goods: string[],
  { sortType, isReversed }: PreparedGoodsParams,
): string[] {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return isReversed ? preparedGoods.reverse() : preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoods
    = getPreparedGoods(goodsFromServer, { sortType, isReversed });

  function handleReset(): void {
    setSortType(SortType.Default);
    setIsReversed(false);
  }

  const isResetButtonVisible = sortType || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => (setSortType(SortType.Alphabet))}
          type="button"
          className={classnames(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.Alphabet },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => (setSortType(SortType.Length))}
          type="button"
          className={classnames(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.Length },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(previousReversed => !previousReversed)}
          type="button"
          className={classnames(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
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
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
