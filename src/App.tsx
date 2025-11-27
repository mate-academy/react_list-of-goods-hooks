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
  ALPHABETICAL = 'alphabetical',
  LENGTH = 'length',
  DEFAULT = '',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.DEFAULT);
  const [isReversed, setReversed] = useState(false);

  let visibleGoods = goodsFromServer;

  visibleGoods = visibleGoods.toSorted((good1, good2) => {
    switch (sortType) {
      case SortType.ALPHABETICAL:
        return good1.localeCompare(good2);
      case SortType.LENGTH:
        return good1.length - good2.length;
      case SortType.DEFAULT:
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods = [...visibleGoods].reverse();
  }

  function resetGoods() {
    setSortType(SortType.DEFAULT);
    setReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABETICAL ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.ALPHABETICAL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => {
            setReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              resetGoods();
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
