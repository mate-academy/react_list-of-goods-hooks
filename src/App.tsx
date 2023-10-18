import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';

enum SortType {
  // SORT_FILED_ALPHABET = 'alphabet',
  // SORT_FILED_LENGTH = 'length',
  Alphabet = 'alphabet',
  Length = 'length',
  Empty = '',
}

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

function getPreparedGoods(
  goods: string[],
  sortFiled: SortType,
  isReversed: boolean,
) {
  const preparedGoods = [...goods];

  if (sortFiled) {
    preparedGoods.sort((goodA, goodB) => {
      switch (sortFiled) {
        case SortType.Alphabet:
          return goodA.localeCompare(goodB);

        case SortType.Length:
          return goodA.length - goodB.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortFiled, setSortFiled] = useState<SortType>(SortType.Empty);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortFiled,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortFiled !== SortType.Alphabet },
          )}
          onClick={() => setSortFiled(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortFiled !== SortType.Length },
          )}
          onClick={() => setSortFiled(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': isReversed === false },
          )}
          onClick={
            isReversed === false
              ? () => setIsReversed(true)
              : () => setIsReversed(false)
          }
        >
          Reverse
        </button>
        {(sortFiled || isReversed)
            && (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={() => {
                  setSortFiled(SortType.Empty);
                  setIsReversed(false);
                }}
              >
                Reset
              </button>
            )}

      </div>

      <ul>
        {
          visibleGoods.map(good => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
