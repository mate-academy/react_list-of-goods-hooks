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

interface Filters {
  sortField: string | '';
  reverse: boolean;
}

enum SortBy {
  ByDefault = '',
  ByAlphabet = 'abc',
  ByLength = 'length',
}

function getPreparedGoods(goods: string[], { sortField, reverse }: Filters) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods = preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortBy.ByAlphabet:
          return good1.localeCompare(good2);

        case SortBy.ByLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortBy>(SortBy.ByDefault);
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  const reset = () => {
    setSortField(SortBy.ByDefault);
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
            { 'is-light': sortField !== SortBy.ByAlphabet },
          )}
          onClick={() => setSortField(SortBy.ByAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SortBy.ByLength },
          )}
          onClick={() => setSortField(SortBy.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !reverse },
          )}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
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
        {visibleGoods.map(
          visibleGood => (
            <li
              data-cy="Good"
              key={visibleGood}
            >
              {visibleGood}
            </li>
          ),
        )}
      </ul>
    </div>
  );
};
