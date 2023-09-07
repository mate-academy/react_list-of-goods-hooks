import cn from 'classnames';

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
  Alphabet = 'alphabet',
  Length = 'length',
  None = '',
}

function getPreparedGoods(
  goods: string[],
  sortType: SortType,
  reverseField = false,
) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((a, b): number => {
      switch (sortType) {
        case SortType.Alphabet:
          return a.localeCompare(b);

        case SortType.Length:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.None);
  const [isListReversed, setIsListReversed] = useState(false);

  const filteredGoods = getPreparedGoods(
    goodsFromServer,
    sortType,
    isListReversed,
  );

  const isResetButtonVisible = (sortType) || isListReversed;

  const handleResetButtonClick = () => {
    setIsListReversed(false);
    setSortType(SortType.None);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.Alphabet)}
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.Alphabet },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.Length)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsListReversed(isReversed => !isReversed)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isListReversed,
          })}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            onClick={handleResetButtonClick}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {filteredGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
