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
  Alphabetically = 'Alphabetically',
  ByLength = 'ByLength',
  Reset = 'Reset',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = React.useState<SortType>(SortType.Reset);
  const [isReversed, setIsReversed] = useState(false);
  const isResetVisible = sortType !== SortType.Reset || isReversed;

  const visibleGoods = React.useMemo(() => {
    let sortedGoods = [...goodsFromServer];

    switch (sortType) {
      case SortType.Alphabetically:
        sortedGoods.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.ByLength:
        sortedGoods.sort((a, b) => a.length - b.length);
        break;

      case SortType.Reset:
      default:
        break;
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  }, [sortType, isReversed]);

  return (
    <div className="section content">
      <div className="buttons">
        <button type="button" className={`button is-info ${sortType === SortType.Alphabetically ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.Alphabetically)} >
          Sort alphabetically
        </button>

        <button type="button" className={`button is-success ${sortType === SortType.ByLength ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.ByLength)} >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortType(SortType.Reset);
              setIsReversed(false);
            }}
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
