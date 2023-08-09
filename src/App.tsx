import React, { useState } from 'react';
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
  Alphabetically = 'alphabetically',
  Length = 'length',
  None = '',
}

const sortGoods = (
  goods: string[],
  sortBy: SortType,
  reverse: boolean,
) => {
  let sortedGoods = [...goods];

  switch (sortBy) {
    case SortType.Alphabetically:
      sortedGoods = sortedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.Length:
      sortedGoods = sortedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (reverse) {
    sortedGoods = sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  let visibleGoods = [...goodsFromServer];
  const [sortParameter, setSortParameter] = useState<SortType>(SortType.None);
  const [reverseParemeter, setReverseParemeter] = useState(false);
  const makeResetVisible = sortParameter !== '' || reverseParemeter;

  const handleSort = (sortBy: SortType) => {
    setSortParameter(sortBy);
  };

  const handleReset = () => {
    setSortParameter(SortType.None);
    setReverseParemeter(false);
  };

  visibleGoods = sortGoods(visibleGoods, sortParameter, reverseParemeter);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortParameter !== SortType.Alphabetically ? 'is-light' : ''}`}
          onClick={() => {
            handleSort(SortType.Alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortParameter !== SortType.Length ? 'is-light' : ''}`}
          onClick={() => {
            handleSort(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverseParemeter ? '' : 'is-light'}`}
          onClick={() => {
            setReverseParemeter(prevReverseParemeter => !prevReverseParemeter);
          }}
        >
          Reverse
        </button>

        {makeResetVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              handleReset();
            }}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
