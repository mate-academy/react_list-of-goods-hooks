import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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

type SortField = 'alphabetical' | 'length' | '';

const SORT_ALPHABETICAL: SortField = 'alphabetical';
const SORT_BY_LENGTH: SortField = 'length';
const SORT_BY_DEFAULT: SortField = '';

const GoodList: React.FC<{ goods: string[] }> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li data-cy="Good" key={good}>
        {good}
      </li>
    ))}
  </ul>
);

function getSortedGoods(
  goods: string[],
  { sortField, isReversed }: { sortField: SortField; isReversed: boolean },
): string[] {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortField) {
      case SORT_ALPHABETICAL:
        return good1.localeCompare(good2);

      case SORT_BY_LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  return isReversed ? preparedGoods.reverse() : preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getSortedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const handleReverseClick = () => {
    setIsReversed(prev => !prev);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_ALPHABETICAL,
          })}
          onClick={() => setSortField(SORT_ALPHABETICAL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverseClick}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SORT_BY_DEFAULT);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
