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

enum SortField {
  Alphabet = 'alphabet',
  Length = 'length',
  Default = '',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortField,
  reverse: boolean,
):string[] {
  const copy = [...goods];

  if (sortField) {
    copy.sort((curGood, nextGood) => {
      switch (sortField) {
        case SortField.Alphabet:
          return curGood.localeCompare(nextGood);
        case SortField.Length:
          return curGood.length - nextGood.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    copy.reverse();
  }

  return copy;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortField.Default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortType, isReversed);

  const reset = () => {
    setSortType(SortField.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortField.Alphabet)}
          type="button"
          className={cn(
            'button is-info',
            {
              'is-light': sortType !== SortField.Alphabet,
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortField.Length)}
          type="button"
          className={cn(
            'button is-success',
            {
              'is-light': sortType !== SortField.Length,
            },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn(
            'button is-danger',
            {
              'is-light': !isReversed,
            },
          )}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
