import React from 'react';
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
  Default = '',
  Alphabetically = 'alphabetically',
  ByLength = 'length',
}

function getSortedGoods(
  goods: string[],
  sortField: SortType,
  isToReverse: boolean,
): string[] {
  const sortedGoods = [...goods];

  if (sortField) {
    sortedGoods.sort((good1, good2) => {
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

  return isToReverse ? sortedGoods.reverse() : sortedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = React.useState<SortType>(SortType.Default);
  const [reverseField, setReverseField] = React.useState(false);

  const readyGoods = getSortedGoods(goodsFromServer, sortField, reverseField);

  const handleSortAlphabetically = () => setSortField(SortType.Alphabetically);
  const handleSortByLength = () => setSortField(SortType.ByLength);
  const handleToggleReverse = () => setReverseField(prev => !prev);
  const handleReset = () => {
    setSortField(SortType.Default);
    setReverseField(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.Alphabetically ? 'is-active' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortType.ByLength ? 'is-active' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverseField ? 'is-active' : 'is-light'}`}
          onClick={handleToggleReverse}
        >
          Reverse
        </button>

        {sortField !== SortType.Default || reverseField ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {readyGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
