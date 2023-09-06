import 'bulma/css/bulma.css';
import classnames from 'classnames';

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

enum SortType {
  Alphabetically = 'letters',
  Length = 'length',
  Default = '',
}

function getPreparedGoods(
  goods: string[],
  sortType: SortType,
  isReversed = false,
) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((a, b) => {
      switch (sortType) {
        case SortType.Alphabetically:
          return a.localeCompare(b);
        case SortType.Length:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, sortType, isReversed,
  );

  function resetAllFiltres() {
    setSortType(SortType.Default);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.Alphabetically)}
          type="button"
          className={classnames(
            'button',
            'is-info',
            {
              'is-light': sortType !== SortType.Alphabetically,
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.Length)}
          type="button"
          className={classnames(
            'button',
            'is-success',
            {
              'is-light': sortType !== SortType.Length,
            },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(prevIsReversed => !prevIsReversed)}
          type="button"
          className={classnames(
            'button',
            'is-warning',
            {
              'is-light': !isReversed,
            },
          )}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            onClick={resetAllFiltres}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
