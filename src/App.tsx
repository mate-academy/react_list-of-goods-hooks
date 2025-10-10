import 'bulma/css/bulma.css';
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

const SORT_BY_ABC = 'abc';
const SORT_BY_LEN = 'length';

interface FilterParams {
  sort: string;
  reversed: boolean;
}

function getPreparedGoods(goods: string[], { sort, reversed }: FilterParams) {
  const preparedGoods = [...goods];

  if (sort) {
    preparedGoods.sort((a, b) => {
      switch (sort) {
        case SORT_BY_ABC:
          return a.localeCompare(b);
        case SORT_BY_LEN:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

function arraysEqual(a: string[], b: string[]) {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sort: sortBy,
    reversed: isReversed,
  });

  const isOriginalOrder = arraysEqual(visibleGoods, goodsFromServer);

  const handleSortAlphabetically = () => {
    setSortBy(SORT_BY_ABC);
  };

  const handleSortByLength = () => {
    setSortBy(SORT_BY_LEN);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortBy('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            handleSortAlphabetically();
          }}
          type="button"
          className={`button is-info ${sortBy === SORT_BY_ABC ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            handleSortByLength();
          }}
          type="button"
          className={`button is-info ${sortBy === SORT_BY_LEN ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => handleReverse()}
          type="button"
          className={`button is-info ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            onClick={() => {
              handleReset();
            }}
            type="button"
            className="button is-danger is-light"
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
