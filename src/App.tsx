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

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const getReversedGoods = (goods: string[]) => {
    const sortedGoods = [...goods];

    sortedGoods.sort((a, b): number => {
      switch (sortType) {
        case SortType.ALPHABET:
          return a.localeCompare(b);

        case SortType.LENGTH:
          return a.length - b.length;

        case SortType.NONE:
        default:
          return 0;
      }
    });

    if (isReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const goods = getReversedGoods(goodsFromServer);

  const showResetButton = sortType !== SortType.NONE || isReversed;

  const sortedAlphabetically = sortType === SortType.ALPHABET
    ? ''
    : 'is-light';

  const sortedByLength = sortType === SortType.LENGTH
    ? ''
    : 'is-light';

  const reversed = isReversed
    ? ''
    : 'is-light';

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortedAlphabetically}`}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortedByLength}`}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.NONE);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li key={good} data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
