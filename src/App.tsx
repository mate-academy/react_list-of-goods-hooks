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
  name = 'name',
  length = 'length',
}

function getPreparedGoods(
  goods: string[],
  sort: string,
  reverse: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sort !== null) {
    preparedGoods.sort((good1, good2) => {
      switch (sort) {
        case SortType.name:
          return good1.localeCompare(good2);

        case SortType.length:
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
  const [isReversed, setisReversed] = useState(false);

  const visibleGood = getPreparedGoods(goodsFromServer, sortType, isReversed);

  const reset = () => {
    setSortType('');
    setisReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortType !== SortType.name },
          )}
          onClick={() => setSortType(SortType.name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortType !== SortType.length },
          )}
          onClick={() => setSortType(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={() => setisReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortType || isReversed)
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
        {visibleGood.map(value => (
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
