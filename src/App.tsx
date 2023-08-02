import { useState } from 'react';

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
  Name = 'Sort alphabetically',
  Length = 'Sort by length',
  Reverse = 'Reverse',
  Reset = 'Reset',
}

const LIGTH_COLOR_STYLE = 'is-light';

function getPreparedGoods(goods: string[],
  { sortBy, order = '' }: { sortBy: SortType, order?: string }) {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.Name:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        case SortType.Reset:
        default:
          return 0;
      }
    });
  }

  if (order === SortType.Reverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState('');

  const goodsForSort = getPreparedGoods(goodsFromServer,
    {
      sortBy: sortField as SortType,
      order: isReversed,
    });

  const reverseGoods = () => {
    if (isReversed === SortType.Reverse) {
      setIsReversed('');
    } else {
      setIsReversed(SortType.Reverse);
    }
  };

  const resetGoods = () => {
    setSortField('');
    setIsReversed('');
  };

  const reset = () => (
    <button
      type="button"
      onClick={resetGoods}
      className="button is-danger is-light"
    >
      Reset
    </button>
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.Name ? '' : LIGTH_COLOR_STYLE}`}
          onClick={() => setSortField(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortType.Length ? '' : LIGTH_COLOR_STYLE}`}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed === SortType.Reverse ? '' : LIGTH_COLOR_STYLE}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(sortField || isReversed) && reset()}
      </div>

      <ul>
        {goodsForSort.map(good => <li key={good} data-cy="Good">{good}</li>)}
      </ul>
    </div>
  );
};
