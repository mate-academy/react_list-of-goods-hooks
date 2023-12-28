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

enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
}

function getPreparedGoods(
  goods: string[],
  sortOrder: SortType | null,
  isReverse: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sortOrder) {
    preparedGoods.sort((a, b) => {
      switch (sortOrder) {
        case SortType.Alphabet:
          return a.localeCompare(b);

        case SortType.Length:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<SortType | null>(null);
  const [isReverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortOrder, isReverse);

  const showReset = sortOrder || isReverse;

  const setGoodsByDefault = () => {
    setSortOrder(null);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortOrder !== SortType.Alphabet },
          )}
          onClick={() => setSortOrder(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortOrder !== SortType.Length },
          )}
          onClick={() => setSortOrder(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReverse },
          )}
          onClick={() => setReverse(!isReverse)}
        >
          Reverse
        </button>

        {showReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={setGoodsByDefault}
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
