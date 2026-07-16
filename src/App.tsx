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
  Reverse = 'Reverse',
  Reset = 'Reset',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Reset);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  // const [goods, setGoods] = useState<string[]>(goodsFromServer);

  const visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortType) {
      case SortType.Alphabetically:
        return good1.localeCompare(good2);
      case SortType.ByLength:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  function reset() {
    setSortType(SortType.Reset);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-light"
          onClick={() => setSortType(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={() => setSortType(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortType !== SortType.Reset || isReversed) && (
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
        <ul>
          {visibleGoods.map(item => (
            <li key={item} data-cy="Good">
              {item}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
