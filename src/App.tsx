import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';
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

enum TypeOfSort {
  name = 'name',
  length = 'length',
}

function getPreparedGoods(
  goods: string[],
  sort: string,
  reverse: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sort) {
    preparedGoods.sort((good1, good2) => {
      switch (sort) {
        case TypeOfSort.name:
          return good1.localeCompare(good2);

        case TypeOfSort.length:
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

export const App: React.FC = () => {
  const [sortType, setSortType] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortType, reverse);

  const reset = () => {
    setSortType('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortType !== TypeOfSort.name },
          )}
          onClick={() => setSortType(TypeOfSort.name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortType !== TypeOfSort.length },
          )}
          onClick={() => setSortType(TypeOfSort.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reverse })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortType || reverse)
        && (
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
        {visibleGoods.map(value => (
          <li
            data-cy="Good"
            key={value}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
