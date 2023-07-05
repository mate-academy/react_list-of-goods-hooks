import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';
import { SortType } from './types/SortType';
import { Goods } from './types/Goods';
import { SortParams } from './types/SortParams';

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
  goods: Goods,
  { sortField, isReversed }: SortParams,
) {
  const preperedGoods = [...goods];

  if (sortField) {
    preperedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.byName:
          return good1.localeCompare(good2);
        case SortType.byLength:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, isReversed },
  );

  const toggleReverse = () => setIsReversed(prevReverse => !prevReverse);

  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const setSortByName = () => setSortField(SortType.byName);

  const setSortByLength = () => setSortField(SortType.byLength);

  const resetButton = (sortField || isReversed) && (
    <button
      type="button"
      className="button is-danger is-light"
      onClick={reset}
    >
      Reset
    </button>
  );

  const handleClasses = (property: SortType) => ({
    'is-light': !sortField.includes(property),
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', handleClasses(SortType.byName))}
          onClick={setSortByName}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', handleClasses(SortType.byLength))}
          onClick={setSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={toggleReverse}
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {resetButton}

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
