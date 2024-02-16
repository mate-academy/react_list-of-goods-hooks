import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

enum SortType {
  ALPH = 'alphabetically',
  LENGTH = 'length',
  NONE = '',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  reverse: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sortField !== SortType.NONE) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.LENGTH:
          return good1.length - good2.length;

        case SortType.ALPH:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.NONE);
  const [isReverse, setIsReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReverse);

  const handlerReset = () => {
    setSortField(SortType.NONE);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.ALPH,
          })}
          onClick={() => setSortField(SortType.ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReverse })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortField !== SortType.NONE || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handlerReset}
          >
            Reset
          </button>
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
