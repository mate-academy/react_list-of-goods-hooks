import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  Default = '',
  SORT_FIELD_ALPHABET = 'alphabet',
  SORT_FIELD_LENGTH = 'length',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  reversed: boolean,
): string[] {
  let preparedGoods = [...goods];

  switch (sortField) {
    case SortType.SORT_FIELD_ALPHABET:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SortType.SORT_FIELD_LENGTH:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (reversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, reversed);

  const handleSortAlphabet = () => {
    setSortField(SortType.SORT_FIELD_ALPHABET);
  };

  const handleSortLength = () => {
    setSortField(SortType.SORT_FIELD_LENGTH);
  };

  const handleToggleReverse = () => {
    setReversed(!reversed);
  };

  const handleReset = () => {
    setSortField(SortType.Default);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSortAlphabet}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.SORT_FIELD_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSortLength}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={handleToggleReverse}
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !reversed })}
        >
          Reverse
        </button>

        {visibleGoods.join() !== goodsFromServer.join() ? (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
