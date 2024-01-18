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

enum Sortfield {
  SORT_FILED_ALPHABET = 'Sort alphabetically',
  SORT_FILED_LENGTH = 'Sort by length',
}

interface FilterParams {
  sortField: Sortfield | string;
  isReversed: boolean;
}

type IsLightFunction = (a: Sortfield | string, b: Sortfield | string) => string;

function getPrepareGoods(
  goods: string[],
  { sortField, isReversed }: FilterParams,
) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case Sortfield.SORT_FILED_ALPHABET:
          return good1.localeCompare(good2);
        case Sortfield.SORT_FILED_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

const isLightStyle: IsLightFunction = (sortField, sortFieldType) => {
  return sortField === sortFieldType ? '' : 'is-light';
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<Sortfield | string>('');
  const [isReversed, setIsReversed] = useState(false);

  const toggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const resetSortAndReverse = () => {
    setSortField('');
    setIsReversed(false);
  };

  const visibleGoods = getPrepareGoods(
    goodsFromServer,
    { sortField, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(`
            button
            is-info
            ${isLightStyle(sortField, Sortfield.SORT_FILED_ALPHABET)}
          `)}
          onClick={() => setSortField(Sortfield.SORT_FILED_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(`
            button
            is-success
            ${isLightStyle(sortField, Sortfield.SORT_FILED_LENGTH)}
          `)}
          onClick={() => setSortField(Sortfield.SORT_FILED_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(`
            button
            is-warning
            ${isReversed ? '' : 'is-light'}
          `)}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSortAndReverse}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
