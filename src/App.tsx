import React from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
import { useState } from 'react';

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

const SORT_FIELD_ALPHABET = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

interface SortParams {
  sortField: SortType;
  isReversed: boolean;
}

enum SortType {
  Alphabet = SORT_FIELD_ALPHABET,
  Length = SORT_FIELD_LENGTH,
  Default = '',
}
const BUTTONS = [
  {
    label: 'Sort alphabetically',
    class: 'is-info',
    sortKey: SortType.Alphabet,
  },
  {
    label: 'Sort by length',
    class: 'is-success',
    sortKey: SortType.Length,
  },
];

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: SortParams,
) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortField) {
      case SortType.Alphabet:
        return good1.localeCompare(good2);
      case SortType.Length:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const onReset = () => {
    setSortField(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        {BUTTONS.map(button => (
          <button
            key={button.label}
            type="button"
            onClick={() => setSortField(button.sortKey)}
            className={cn('button', button.class, {
              'is-light': sortField !== button.sortKey,
            })}
          >
            {button.label}
          </button>
        ))}

        <button
          type="button"
          onClick={() => setIsReversed(!isReversed)}
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            onClick={onReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
