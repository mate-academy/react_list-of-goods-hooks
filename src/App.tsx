import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Default = 'default',
  Length = 'length',
  Alphabetically = 'alphabetically',
}

export const goodsFromServer: string[] = [
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

export const GoodList = ({ goods }: { goods: string[] }) => (
  <ul className="GoodList">
    {goods.map((good: string) => (
      <li key={good} data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [reversed, setReversed] = useState<boolean>(false);

  const handleSortAlphabetically = () => setSortField(SortType.Alphabetically);
  const handleSortByLength = () => setSortField(SortType.Length);
  const handleReverse = () => setReversed(prev => !prev);
  const handleReset = () => {
    setSortField(SortType.Default);
    setReversed(false);
  };

  let displayedGoods: string[] = [...goodsFromServer].sort(
    (good1: string, good2: string) => {
      switch (sortField) {
        case SortType.Length:
          return good1.length - good2.length;
        case SortType.Alphabetically:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    },
  );

  if (reversed) {
    displayedGoods = displayedGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={handleSortAlphabetically}
          className={`button is-info ${sortField !== SortType.Alphabetically ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={handleSortByLength}
          className={`button is-success ${sortField !== SortType.Length ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={`button is-warning ${!reversed ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        {reversed || sortField !== SortType.Default ? (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <GoodList goods={displayedGoods} />
    </div>
  );
};
