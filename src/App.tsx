import { useState } from 'react';
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
  SORT_ALPH = 'sortAlphabetically',
  SORT_BY_LENGTH = 'sortByLength',
  UNSORTED = '',
}

function getSortedGoods(
  goods: string[],
  sortField: SortType,
  reversed: boolean,
): string[] {
  const prepareGoods = [...goods];

  switch (sortField) {
    case SortType.SORT_ALPH:
      prepareGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SortType.SORT_BY_LENGTH:
      prepareGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      break;
  }

  if (reversed) {
    prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.UNSORTED);
  const [reversed, setReversed] = useState(false);
  const sortedGoods = getSortedGoods(goodsFromServer, sortField, reversed);
  const isInitialOrder = sortField === SortType.UNSORTED && !reversed;

  const reset = () => {
    setSortField(SortType.UNSORTED);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.SORT_ALPH,
          })}
          onClick={() => setSortField(SortType.SORT_ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reversed !== true,
          })}
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
