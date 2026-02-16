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
  None = 'None',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState<boolean>(false);
  const [originalGoods] = useState(goodsFromServer);

  function applySort(
    goods: string[],
    sortField: SortType,
    isReversed: boolean,
  ): string[] {
    const displayedGoods = [...goods];

    if (sortField !== SortType.None) {
      displayedGoods.sort((good1, good2) => {
        switch (sortField) {
          case SortType.Alphabetically:
            return good1.localeCompare(good2);
          case SortType.ByLength:
            return good1.length - good2.length;
          default:
            return 0;
        }
      });
    }

    if (isReversed) {
      return displayedGoods.reverse();
    }

    return displayedGoods;
  }

  const reset = () => {
    setSortType(SortType.None);
    setReversed(false);
  };

  const visibleGoods = applySort(originalGoods, sortType, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabetically ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.ByLength ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>

        {sortType !== SortType.None || reversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        ) : null}
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
